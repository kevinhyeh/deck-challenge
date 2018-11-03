import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, TextInput, Button, Alert } from 'react-native';
import { Icon } from 'react-native-elements';

import workoutStyles from '../styles/WorkoutStyles';
import styles from '../styles/Styles';

class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workouts: [],
      addWorkout: ''
    }
  }

  componentDidMount() {
    this.fetchWorkouts();
    this.props.navigation.addListener('willFocus', this.fetchWorkouts);
  };

  fetchWorkouts = () => {
    fetch('http://localhost:3001/workouts', {
      method: 'POST'
    }).then(res => res.json())
    .then(resultingJSON => this.setState({ workouts : resultingJSON }))
  };

  fetchAddWorkout = () => {
    fetch('http://localhost:3001/addWorkout', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        addWorkout: this.state.addWorkout
      })
    }).then(res => res.json())
    .then(resultingJSON => {
      if (resultingJSON == 'Workout already exists') {
        Alert.alert(resultingJSON);
      } else {
        this.props.navigation.navigate('Menu')
      }
    });
  };


  render() {
    const workouts = this.state.workouts.map(workout => {
      return <View key={workout.id} style={workoutStyles.inactiveWorkoutBut}>
        <Text>{workout.workout}</Text>
      </View>
    });

    return (
      <View style={[workoutStyles.workoutContainer, {alignItems: 'center', justifyContent: 'center'}]}>
        <Text style={styles.header}>Add Workouts</Text>
        <View style={workoutStyles.workouts}>
        {workouts}
        </View>
        <View style={{flexDirection: 'row'}}>
          <TextInput style={{
          borderBottomWidth: 2, 
          borderBottomColor: '#fff', 
          fontSize: 18, 
          marginTop: 30, 
          width: 200,
          color: '#fff'}} 
          returnKeyType={ 'next' } placeholder="Workout" placeholderTextColor="#fff" onChangeText={addWorkout => this.setState({addWorkout})} />
          <TouchableOpacity style={workoutStyles.shuffleBut} onPress={() => this.fetchAddWorkout()}>
            <Text style={{ color: '#fff', fontSize: 18 }}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default SettingsScreen;
