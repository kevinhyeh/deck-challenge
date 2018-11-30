import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, TextInput, Button, SafeAreaView, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import cards from '../cards.json';

import { _selectFavorites, _toggleFavorites } from '../services/FetchCalls';
import HistoryCard from '../components/HistoryCard';
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
    let user_id = this.props.screenProps.user_id;

    return _selectFavorites(user_id)
    .then(resultingJSON => this.setState({ favorites : resultingJSON }))
  };

  toggleFavorite = (id, fav) => {
    return _toggleFavorites(id, fav)
    .then(this.props.navigation.navigate('History'));
  };  


  render() {

    const favorites = this.state.favorites.map(workout => {
      return <HistoryCard key={workout.id} id={workout.id} deck_completed={workout.deck_completed} difficulty={workout.difficulty} chosen_workouts={workout.chosen_workouts} date_completed={workout.date_completed} toggleFavFunc={() => this.toggleFavorite(workout.id, false)} timer={workout.timer} />
    });
    
    return (
      <ScrollView style={{ backgroundColor: '#4A6382' }} contentInsetAdjustmentBehavior="automatic">
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
