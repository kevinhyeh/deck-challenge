import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, ImageBackground, TextInput, Button, SafeAreaView, Alert, Modal, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from '../styles/WorkoutStyles';
import cards from '../cards.json';
import quotes from '../quotes.json';

const formattedSeconds = (sec) =>
  Math.floor(sec / 60) +
    ':' +
  ('0' + sec % 60).slice(-2)

class BuildScreen extends Component {
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
      finishedCount: 0,
      deckCompleted: true,
    };
    this.incrementer = null;
    this.initialState = this.state;
  };

  fetchWorkouts = () => {
    fetch('http://localhost:3001/workouts', {
      method: 'POST'
    }).then(res => res.json())
    .then(resultingJSON => this.setState({ initialWorkouts : resultingJSON }))
  };

  fetchAddWorkout = () => {
    if (this.state.addWorkout != '') {
      fetch('http://localhost:3001/addWorkout', {
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

  fecthFinishWorkout = () => {
    fetch('http://localhost:3001/addHistory', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        timer: formattedSeconds(this.state.secondsElapsed), 
        difficulty: this.state.selectDifficulty,
        chosenWorkouts: this.state.chosenWorkouts.join(', '),
        deckCompleted: this.state.deckCompleted,
        favorite: this.state.favorite,
        user_id: this.props.screenProps.user_id
      })
    }).then(res => res.json())
  }

  loadWorkouts = (num) => {
    this.fetchWorkouts();
    this.setState({ selectNumber: num });
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
    let aCopy = a.slice(0);
    for (let i = aCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [aCopy[i], aCopy[j]] = [aCopy[j], aCopy[i]];
    }
    this.setState({shuffledDeck: aCopy.splice(26, 27)});
    this.handleStartClick();
  };

  shuffleFull = (a) => {
    let aCopy = a.slice(0);
    for (let i = aCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [aCopy[i], aCopy[j]] = [aCopy[j], aCopy[i]];
    }
    this.setState({shuffledDeck: aCopy});
    this.handleStartClick();
  };

  nextCard = () => {
    this.state.shuffledDeck.pop();
    this.setState(prevState => ({ finishedCount: prevState.finishedCount + 1 }))
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
  };

  exitWorkoutAlert = () => {
    Alert.alert(
          'Leaving Workout',
          'Are you sure?',
          [
            {text: 'No', onPress: () => console.log('Cancel Pressed!')},
            {text: 'Yes', onPress: () => this.exitWorkout()},
          ],
          { cancelable: false }
        )
  };

  exitWorkout = () => {
    this.setModalVisibility(false);
    this.handleStopClick();
    this.setState({ deckCompleted: false });
    this.fecthFinishWorkout();
    this.resetState();
  };

  resetState = () => {
    this.setState(this.initialState);
  };

  finishWorkout = () => {
    this.setState({ deckCompleted: true });
    console.log(this.state)
    this.fecthFinishWorkout();
    this.resetState();
  };

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

    const pickedQuote = quotes[Math.floor(Math.random() * quotes.length - 1)];

     if (this.state.finishedCount == this.state.selectDifficulty) {
      this.handleStopClick();
    }

    return (
      <SafeAreaView style={styles.workoutContainer}>
          <Modal visible={this.state.modalVisibility} transparent animationType={'slide'}>
            <View style={styles.modal}>
              { this.state.shuffledDeck.length > 0 ? 
                <View style={{ alignItems: 'center' }}>
                  <Text onPress={() => this.exitWorkoutAlert()} style={{ color: 'white' }}>Exit Workout</Text>
                  {console.log(this.props.screenProps.user_id)}
                  <Text style={styles.timer}>{formattedSeconds(this.state.secondsElapsed)}</Text>
                  <View style={styles.workoutCards}>
                    <Text style={{ fontSize: 20 }}>{this.state.shuffledDeck.length}/{this.state.selectDifficulty}</Text>
                    <View>
                    <Text style={{ marginLeft: 30, width: 300, fontSize: 40 }}>{currentCard.face}
                      <View>
                        { currentCard.suit == 'spades' ?
                          <Text style={{ fontSize: 38 }}>&#9830;</Text>
                        : currentCard.suit == 'hearts' ?
                          <Text style={{ color: 'red', fontSize: 38 }}>&#9829;</Text>
                        : currentCard.suit == 'clubs' ?
                          <Text style={{ fontSize: 38 }}>&#9827;</Text>
                        : <Text style={{ color: 'red', fontSize: 38 }}>&#9830;</Text>
                        }
                      </View>
                    </Text>
                    </View>
                    { this.state.selectNumber == 4 ?
                      <View style={{ height: 300, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 50 }}>{currentCard.value}</Text>
                      { currentCard.suit == 'spades' ?
                        <Text style={{ fontSize: 40 }}>{this.state.chosenWorkouts[0]}</Text>
                      : currentCard.suit == 'hearts' ?
                        <Text style={{ fontSize: 40 }}>{this.state.chosenWorkouts[1]}</Text>
                      : currentCard.suit == 'clubs' ?
                        <Text style={{ fontSize: 40 }}>{this.state.chosenWorkouts[2]}</Text>
                      : <Text style={{ fontSize: 40 }}>{this.state.chosenWorkouts[3]}</Text>
                      }
                      </View>
                    : <View style={{ height: 300, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 50 }}>{currentCard.value}</Text>
                      { currentCard.color == 'red' ? 
                        <Text style={{ fontSize: 40 }}>{this.state.chosenWorkouts[0]}</Text>
                      : <Text style={{ fontSize: 40 }}>{this.state.chosenWorkouts[1]}</Text>
                      }
                      </View>
                    }
                    <View>
                      <Text style={{ marginLeft: 210, fontSize: 40, transform: [{ rotate: '180deg' }] }}>{currentCard.face}
                        <View>
                          { currentCard.suit == 'spades' ?
                            <Text style={{ fontSize: 38 }}>&#9830;</Text>
                          : currentCard.suit == 'hearts' ?
                            <Text style={{ color: 'red', fontSize: 38 }}>&#9829;</Text>
                          : currentCard.suit == 'clubs' ?
                            <Text style={{ fontSize: 38 }}>&#9827;</Text>
                          : <Text style={{ color: 'red', fontSize: 38 }}>&#9830;</Text>
                          }
                        </View>
                      </Text>
                    </View>
                  </View> 
                  <TouchableOpacity style={[styles.shuffleBut, {marginTop: 50}]} onPress={() => this.nextCard()}>
                  <Text style={styles.shuffleText}>Next Card</Text>
                  </TouchableOpacity>
                </View>
              : this.state.finishedCount == this.state.selectDifficulty ?
                  <View style={styles.workoutCards}>
                    <Text>Congrats!</Text>
                    <Text>You finished with a time of</Text>
                    <Text>{formattedSeconds(this.state.secondsElapsed)}</Text>
                    <Text>Add this workout to your favorites?</Text>
                    <View style={{ flexDirection: 'row' }}>
                    { this.state.favorites == true ?
                      <TouchableOpacity style={styles.activeBut}>
                      <Text>Yes</Text>
                      </TouchableOpacity>
                    : <TouchableOpacity onPress={() => this.setState({ favorite: true })} style={styles.inactiveBut}>
                      <Text>Yes</Text>
                      </TouchableOpacity>
                    }
                    { this.state.favorites == false ?
                      <TouchableOpacity style={styles.activeBut}>
                      <Text>No</Text>
                      </TouchableOpacity>
                    : <TouchableOpacity onPress={() => this.setState({ favorite: false })} style={styles.inactiveBut}>
                      <Text>No</Text>
                      </TouchableOpacity>
                    }
                    </View>
                    <TouchableOpacity>
                    <Text onPress={() => this.finishWorkout()}>Finish Workout</Text>
                    </TouchableOpacity>
                  </View>
              : <View style={{ alignItems: 'center' }}>
                <Text onPress={() => this.exitWorkoutAlert()} style={{ color: 'white' }}>Exit Workout</Text>
                <Text style={styles.timer}>{formattedSeconds(this.state.secondsElapsed)}</Text>
                <ImageBackground style={{ width: 300, height: 450, justifyContent: 'center', alignItems: 'center' }}source={require('../assets/cardsBackface.png')}>
              {/*
                <Text style={{ color: '#fff', fontSize: 24, fontFamily: 'AvenirNext-HeavyItalic', width: 280 }}>{pickedQuote.quote.toString()}</Text>
                <Text style={{ color: '#fff', fontSize: 24, fontFamily: 'AvenirNext-Heavy' }}>- {pickedQuote.author}</Text>
              */}
                </ImageBackground>
                { this.state.selectDifficulty == 26 ?
                  <TouchableOpacity style={[styles.shuffleBut, {marginTop: 50}]} onPress={() => this.shuffleHalf(cards)}>
                  <Text style={{color: '#fff', fontSize: 24 }} onPress={() => this.shuffleHalf(cards)}>Start Workout</Text>
                  </TouchableOpacity>
                : <TouchableOpacity style={[styles.shuffleBut, {marginTop: 50}]} onPress={() => this.shuffleFull(cards)}>
                  <Text style={{color: '#fff', fontSize: 24 }} onPress={() => this.shuffleHalf(cards)}>Start Workout</Text>
                  </TouchableOpacity>
                }
                </View>
              }
            </View>
          </Modal>
          <View style={styles.section}>
            <Text style={styles.header}>1. Select Difficulty{this.props.screenProps.newState}</Text>
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
              }
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

export default BuildScreen;
