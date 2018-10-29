import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, TextInput, Button, SafeAreaView, Alert, Modal } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from '../styles/WorkoutStyles';
import cards from '../cards.json';

class WorkoutScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectDifficulty: '',
      selectNumber: -1,
      selectWorkouts: '',
      initialWorkouts: [],
      chosenWorkouts: [],
      addWorkout: '',
      modalVisibility: false
    }
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
  }

  render() {
    const { selectDifficulty, selectNumber, selectWorkouts, chosenWorkouts } = this.state;

    const difficultyEasy = selectDifficulty == 'easy';
    const difficultyHard = selectDifficulty == 'hard';
    const difficultyClicked = selectDifficulty.length > 0;

    const twoWorkouts = selectNumber === 2;
    const fourWorkouts = selectNumber === 4;
    const numberClicked = selectNumber > 0;

    const workoutsSelected = chosenWorkouts.length == selectNumber;

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
          <Modal visible={this.state.modalVisibility} transparent animationType={'fade'}>
            <View style={styles.test}>
              <TouchableOpacity onPress={() => this.setModalVisibility(false)}>
                <Text>Close</Text>
              </TouchableOpacity>
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
              <TouchableOpacity style={styles.inactiveBut} onPress={ selectDifficulty => this.setState({ selectDifficulty: 'easy' }) }>
                <Text>Easy</Text>
              </TouchableOpacity>
              )
            }        
            { difficultyHard ? (
              <TouchableOpacity style={styles.activeBut}>
                <Text>Hard</Text>
              </TouchableOpacity>  
              ) : (
              <TouchableOpacity style={styles.inactiveBut} onPress={ selectDifficulty => this.setState({ selectDifficulty: 'hard' }) }>
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

export default WorkoutScreen;
