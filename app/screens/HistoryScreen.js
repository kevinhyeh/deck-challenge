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
      favorite: true,
      refreshScreen: 0
    }
  }

  componentWillMount() {
    this.load();
    this.props.navigation.addListener('willFocus', this.load);
  };

  load = () => {
    fetch('http://localhost:3001/selectHistory', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: this.props.screenProps.user_id
      })
    }).then(res => res.json())
    .then(resultingJSON => this.setState({ workoutHistory : resultingJSON }))
  };

  favorite = (id, fav) => {
    fetch('http://localhost:3001/updateFavorite', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        favorite: fav
      })
    }).then(res => res.json())
    .then(resultingJSON => this.setState({ refreshScreen: 1 }));
    this.props.navigation.navigate('MyDeck');
  };  

  render() {

    const workoutHistory = this.state.workoutHistory.map(workout => {
      return <View key={workout.id} style={{ width: 300, height: 450, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginTop: 10, borderRadius: 20, borderWidth: 6, borderColor: workout.deck_completed ? 'green' : 'red' }}>
        { workout.favorite == 1 ?
          <Text onPress={() => this.favorite(workout.id, false)} style={{ fontSize: 30 }}>&#9829;</Text>
        : 
          <Text onPress={() => this.favorite(workout.id, true)} style={{ fontSize: 30 }}>&#x2661;</Text>
        }
        { workout.deck_completed == 1 ? 
          <Text style={{ fontSize: 40, color: 'green' }}>Completed</Text>
        : <Text style={{ fontSize: 40, color: 'red' }}>Incompleted</Text>
        }
        <Text>{workout.date_completed.split('T')[0]}</Text>
        <Text style={{ fontSize: 22 }}>Time: {workout.timer}</Text>
        <Text style={{ fontSize: 22 }}>Difficulty: {workout.difficulty}</Text>
        <Text style={{ fontSize: 22 }}>Chosen Workouts:</Text>
        <Text style={{ fontSize: 22 }}>{workout.chosen_workouts}</Text>
      </View>
    });
    
    return (
      <ScrollView style={{ backgroundColor: '#36485f' }} contentInsetAdjustmentBehavior="automatic">
        <SafeAreaView style={{ alignItems: 'center' }}>
          {workoutHistory}
        </SafeAreaView>
      </ScrollView>
    );
  }
}

export default HistoryScreen;
