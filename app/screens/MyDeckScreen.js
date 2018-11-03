import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, TextInput, Button, SafeAreaView, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import cards from '../cards.json';

import styles from '../styles/WorkoutStyles';

class MyDeckScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: []
    }
  }

  componentDidMount() {
    this.load();
    this.props.navigation.addListener('willFocus', this.load);
  };

  load = () => {
    fetch('http://localhost:3001/selectFavorites', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: this.props.screenProps.user_id
      })
    }).then(res => res.json())
    .then(resultingJSON => this.setState({ favorites : resultingJSON }))
  };

  toggleFavorite = (id, fav) => {
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
    this.props.navigation.navigate('History');
  };  


  render() {

    const favorites = this.state.favorites.map(workout => {
      return <View key={workout.id} style={{ 
        width: 300, 
        height: 450, 
        backgroundColor: workout.deck_completed ? '#F2FFF1' : '#FFF6ED', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 20, 
        borderRadius: 20, 
        borderWidth: 6, 
        paddingLeft: 7,
        paddingRight: 7,
        borderColor: workout.deck_completed ? '#40E55D' : 'red' }}>
        { workout.deck_completed == 1 ? 
          <Text style={{ fontSize: 40, color: '#40E55D', marginBottom: 30 }}>Completed</Text>
        : <Text style={{ fontSize: 40, color: 'red', marginBottom: 30 }}>Incompleted</Text>
        }
        <Text style={{ fontSize: 18, marginBottom: 5 }}>Date: {workout.date_completed.split('T')[0]}</Text>
        <Text style={{ fontSize: 18, marginBottom: 5 }}>--------------------</Text>
        <Text style={{ fontSize: 18, marginBottom: 5 }}>Time: {workout.timer}</Text>
        <Text style={{ fontSize: 18, marginBottom: 5 }}>--------------------</Text>
        <Text style={{ fontSize: 18, marginBottom: 5 }}>Difficulty: {workout.difficulty} {workout.difficulty == 26 ? '(Easy)': '(Hard)'}</Text>
        <Text style={{ fontSize: 18, marginBottom: 5 }}>--------------------</Text>
        <Text style={{ fontSize: 18, marginBottom: 5 }}>Chosen Workouts:</Text>
        <Text style={{ fontSize: 18, marginBottom: 5 }}>{workout.chosen_workouts}</Text>
        <Text onPress={() => this.toggleFavorite(workout.id, false)} style={{ fontSize: 60, color: workout.deck_completed ? '#40E55D' : 'red' }}>&#9829;</Text>
      </View>
    });
    
    return (
      <ScrollView style={{ backgroundColor: '#4A6382' }}contentInsetAdjustmentBehavior="automatic">
        <SafeAreaView style={{ alignItems: 'center' }}>
        { this.state.favorites.length > 0 ?
          [favorites]
        : <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Text style={{ color: '#59cbbd', fontSize: 30 }}>You have no favorite decks</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Workout')} style={styles.shuffleBut}>
              <Text style={{ color: '#fff', fontSize: 20 }}>Create Deck</Text>
            </TouchableOpacity>
          </View>
        }
        </SafeAreaView>
      </ScrollView>
    );
  }
}

export default MyDeckScreen;
