import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, TextInput, Button, SafeAreaView, Alert, Modal, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from '../styles/WorkoutStyles';
import cards from '../cards.json';

const formattedSeconds = (sec) =>
  Math.floor(sec / 60) +
    ':' +
  ('0' + sec % 60).slice(-2)

class WorkoutScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectDifficulty: -1,
      selectNumber: -1,
      selectWorkouts: '',
      initialWorkouts: [],
      chosenWorkouts: [],
      addWorkout: '',
      modalVisibility: false,
      shuffledDeck: [],
      secondsElapsed: 0,
      lastClearedIncrementer: null
    };
    this.incrementer = null;
  };

  fetchWorkouts = () => {
    fetch('http://192.168.1.72:3001/workouts', {
      method: 'POST'
    }).then(res => res.json())
    .then(resultingJSON => this.setState({ initialWorkouts : resultingJSON }))
  };

  fetchAddWorkout = () => {
    if (this.state.addWorkout != '') {
      fetch('http://192.168.1.72:3001/add', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          workout: this.state.addWorkout
        })
      }).then(res => res.json())
    } else {
      Alert.alert('Enter a workout');
    };
  };

  loadWorkouts = (num) => {
    this.fetchWorkouts();
    this.setState({ selectNumber: num })
  };

  unclickWorkout = (workout) => {
    let workoutIndex = this.state.chosenWorkouts.indexOf(workout);
    this.state.chosenWorkouts.splice(workoutIndex, 1);
    this.forceUpdate();
  };

  setModalVisibility = (visible) => {
    this.setState({ modalVisibility: visible })
  };

  shuffleHalf = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    this.setState({shuffledDeck: a.splice(26, 27)});
  };

  shuffleFull = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    this.setState({shuffledDeck: a});
  };

  nextCard = () => {
    this.state.shuffledDeck.pop();
    this.forceUpdate();
  };

  handleStartClick = () => {
    this.incrementer = setInterval( () =>
      this.setState({
        secondsElapsed: this.state.secondsElapsed + 1
      })
    , 1000);
  };

  handleStopClick = () => {
    clearInterval(this.incrementer);
    this.setState({
      lastClearedIncrementer: this.incrementer
    });
  }

  render() {
    const { selectDifficulty, selectNumber, selectWorkouts, chosenWorkouts } = this.state;

    const difficultyEasy = selectDifficulty == 26;
    const difficultyHard = selectDifficulty == 52;
    const difficultyClicked = selectDifficulty > 0;

    const twoWorkouts = selectNumber === 2;
    const fourWorkouts = selectNumber === 4;
    const numberClicked = selectNumber > 0;

    const workoutsSelected = chosenWorkouts.length == selectNumber;

    const currentCard = this.state.shuffledDeck[this.state.shuffledDeck.length-1];

    const workoutList = this.state.initialWorkouts.map(workout => {
      if (this.state.chosenWorkouts.indexOf(workout.workout) > -1) {
        return <TouchableOpacity key={workout.id} style={styles.activeWorkoutBut} onPress={() => this.unclickWorkout(workout.workout)}>
            <Text>{workout.workout}</Text>            
        </TouchableOpacity>
      } else {
        if (this.state.chosenWorkouts.length == this.state.selectNumber) {
          return <TouchableOpacity key={workout.id} style={styles.inactiveWorkoutBut}>
            <Text>{workout.workout}</Text>            
          </TouchableOpacity>
        } else {
          return <TouchableOpacity key={workout.id} style={styles.inactiveWorkoutBut} onPress={() => this.setState({ chosenWorkouts: [...this.state.chosenWorkouts, workout.workout]})}>
            <Text>{workout.workout}</Text>            
          </TouchableOpacity>
        } 
      }
    });

    return (
      <SafeAreaView style={styles.workoutContainer}>
          <Modal visible={this.state.modalVisibility} transparent animationType={'slide'}>
            <View style={styles.modal}>
              <Text style={styles.timer}>{formattedSeconds(this.state.secondsElapsed)}</Text>
              {(this.state.secondsElapsed === 0 ||
                this.incrementer === this.state.lastClearedIncrementer
                ? <Text onPress={() => this.handleStartClick()}>start</Text>
                : <Text onPress={() => this.handleStopClick()}>stop</Text>
              )}
              { this.state.shuffledDeck.length > 0 ? 
                <View style={{ alignItems: 'center' }}>
                  <View style={styles.workoutCards}>
                    <Text>{this.state.shuffledDeck.length}/{this.state.selectDifficulty} </Text>
                    <Text>{currentCard.face}({currentCard.value})
                    </Text>
                    { currentCard.color == 'red' ? 
                      <Text>{this.state.chosenWorkouts[0]}</Text>
                    : <Text>{this.state.chosenWorkouts[1]}</Text>
                    }
                    {console.log(this.state.shuffledDeck)}
                  </View>
                  <Text style={{color: '#fff', fontSize: 24 }} onPress={() => this.nextCard()}>Next Card</Text>
                </View>
              : <View>
                <Image style={{width: 100, height: 130}} source={{ uri: 'https://t4.ftcdn.net/jpg/00/24/03/91/500_F_24039119_lKsO6t7q4Wgvd7kFtZ6wlBXGRMS6EQTq.jpg' }} />
                { this.state.selectDifficulty == 26 ?
                  <Text style={{color: '#fff', fontSize: 24 }} onPress={() => this.shuffleHalf(cards)}>Start Workout</Text>
                : <Text style={{color: '#fff', fontSize: 24 }} onPress={() => this.shuffleFull(cards)}>Start Workout</Text>
                }
                </View>
              }
            </View>
          </Modal>
          <View style={styles.section}>
            <Text style={styles.header}>1. Select Difficulty</Text>
            <View style={styles.rowContainer}>
            { difficultyEasy ? (
              <TouchableOpacity style={styles.activeBut}>
                <Text>Easy</Text>
              </TouchableOpacity>  
              ) : (
              <TouchableOpacity style={styles.inactiveBut} onPress={ selectDifficulty => this.setState({ selectDifficulty: 26 }) }>
                <Text>Easy</Text>
              </TouchableOpacity>
              )
            }        
            { difficultyHard ? (
              <TouchableOpacity style={styles.activeBut}>
                <Text>Hard</Text>
              </TouchableOpacity>  
              ) : (
              <TouchableOpacity style={styles.inactiveBut} onPress={ selectDifficulty => this.setState({ selectDifficulty: 52 }) }>
                <Text>Hard</Text>
              </TouchableOpacity>
              )
            }
            </View>
          </View>
          { difficultyClicked ? (
            <View style={styles.section}>
              <Text style={styles.header}>2. Select number of workouts</Text>
              <View style={styles.rowContainer}>
                {twoWorkouts ? (
                  <TouchableOpacity style={styles.activeBut}>
                    <Text>2</Text>
                   </TouchableOpacity>
                  ) : (
                  <TouchableOpacity style={styles.inactiveBut} onPress={() => this.loadWorkouts(2)}>
                    <Text>2</Text>
                  </TouchableOpacity>
                )};
                {fourWorkouts ? (
                  <TouchableOpacity style={styles.activeBut}>
                    <Text>4</Text>
                   </TouchableOpacity>
                  ) : (
                  <TouchableOpacity style={styles.inactiveBut} onPress={() => this.loadWorkouts(4)}>
                    <Text>4</Text>
                  </TouchableOpacity>
                )};
              </View>
            </View>
          ) : <View></View>
          };
          { numberClicked ? (
            <View style={styles.section}>
              <Text style={styles.header}>3. Select {this.state.selectNumber} Workouts</Text>
              <View style={styles.workouts}>
              {workoutList}
              </View>
            </View>
          ) : <View></View>
          }
          { workoutsSelected ? (
            <View style={styles.section}>
              <TouchableOpacity style={styles.shuffleBut} onPress={() => this.setModalVisibility(true)}>
                <Text style={styles.shuffleText}>Shuffle Deck</Text>
              </TouchableOpacity>
            </View>
            ) : <View></View>
          }
      </SafeAreaView>
    );
  }
}

const {height, width} = Dimensions.get('window');

const options = {
  container: {
    padding: 5,
    borderRadius: 5,
    width: 280
  },
  text: {
    fontSize: 40,
    color: '#FFF',
    marginLeft: 7,
  }
}

export default WorkoutScreen;
