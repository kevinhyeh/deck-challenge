import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, TextInput, Button, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from '../styles/WorkoutStyles';
import cards from '../cards.json';

class WorkoutScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectDifficulty: '',
      selectNumber: '',
      selectWorkouts: '',
      initialWorkouts: []
    }
  }

  getWorkouts = () => {
    fetch('http://192.168.1.72:3001/workouts', {
      method: 'POST'
    }).then(res => res.json())
    .then(resultingJSON => this.setState({ initialWorkouts : resultingJSON }))
  };

  loadWorkouts = (num) => {
    this.getWorkouts();
    this.setState({ selectNumber: num })
  }

  render() {
    const { selectDifficulty, selectNumber, selectWorkouts } = this.state;

    const difficultyEasy = selectDifficulty == 'easy';
    const difficultyHard = selectDifficulty == 'hard';
    const difficultyClicked = selectDifficulty.length > 0;

    const twoWorkouts = selectNumber == '2';
    const fourWorkouts = selectNumber == '4';
    const numberClicked = selectNumber.length > 0;

    const inactiveWorkoutBut = this.state.initialWorkouts.map(workout => (
        <TouchableOpacity key={workout.id} style={styles.inactiveBut} onPress={() => this.test()}>
            <Text>{workout.workout}</Text>
        </TouchableOpacity>
      ));

    return (
      <SafeAreaView style={styles.workoutContainer}>
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
        { difficultyClicked ? (
          <View style={styles.rowContainer}>
            {twoWorkouts ? (
              <TouchableOpacity style={styles.activeBut}>
                <Text>2</Text>
               </TouchableOpacity>
              ) : (
              <TouchableOpacity style={styles.inactiveBut} onPress={() => this.loadWorkouts('2')}>
                <Text>2</Text>
              </TouchableOpacity>
            )};
            {fourWorkouts ? (
              <TouchableOpacity style={styles.activeBut}>
                <Text>4</Text>
               </TouchableOpacity>
              ) : (
              <TouchableOpacity style={styles.inactiveBut} onPress={() => this.loadWorkouts('4')}>
                <Text>4</Text>
              </TouchableOpacity>
            )};
          </View>
        ) : <View></View>
        };
        { numberClicked ? 
          <View style={styles.workouts}>
          {inactiveWorkoutBut}
          </View>
          : <View></View>
        }
      </SafeAreaView>

    );
  }
}

export default WorkoutScreen;
