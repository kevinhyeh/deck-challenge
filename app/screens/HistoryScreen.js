import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, TextInput, Button, SafeAreaView, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import cards from '../cards.json';

import styles from '../styles/Styles';

class HistoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      workoutHistory: [],
      favorite: true
    }
  }

  componentWillMount() {
    this.load();
    this.props.navigation.addListener('willFocus', this.load);
  };

  load = () => {
    fetch('http://192.168.1.72:3001/selectHistory', {
      method: 'POST'
    }).then(res => res.json())
    .then(resultingJSON => this.setState({ workoutHistory : resultingJSON }))
  };

  favorite = () => {
    fetch('http://192.168.1.72:3001/updateFavorite', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        favorite: this.state.favorite
      })
    }).then(res => res.json());
  };  

  render() {

    const workoutHistory = this.state.workoutHistory.map(workout => {
      return <View key={workout.id} style={{ width: 300, height: 450, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginTop: 10, borderRadius: 20, borderWidth: 6, borderColor: workout.deck_completed ? 'green' : 'red' }}>
        <Text>{workout.id}</Text>
        <Text>{workout.deck_completed}</Text>
        <Text>{workout.timer}</Text>
        <Text>{workout.difficulty}</Text>
        <Text>{workout.chosenWorkouts}</Text>
        <Text onPress={() => this.favorite()}>&#9829;</Text>
      </View>
    });
    
    return (
      <ScrollView style={{ backgroundColor: '#36485f' }}contentInsetAdjustmentBehavior="automatic">
        <SafeAreaView style={{ alignItems: 'center' }}>
          {workoutHistory}
        </SafeAreaView>
      </ScrollView>
    );
  }
}

export default HistoryScreen;
