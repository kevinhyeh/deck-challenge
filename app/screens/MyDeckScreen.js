import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, TextInput, Button, SafeAreaView, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import cards from '../cards.json';

import styles from '../styles/Styles';

class MyDeckScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: []
    }
  }

  componentWillMount() {
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

  render() {

    const favorites = this.state.favorites.map(workout => {
      return <View key={workout.id} style={{ width: 300, height: 450, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
        <Text>{workout.id}</Text>
        <Text>{workout.timer}</Text>
        <Text>{workout.difficulty}</Text>
        <Text>{workout.chosenWorkouts}</Text>
      </View>
    });
    
    return (
      <ScrollView style={{ backgroundColor: '#36485f' }}contentInsetAdjustmentBehavior="automatic">
        <SafeAreaView>
          {favorites}
        </SafeAreaView>
      </ScrollView>
    );
  }
}

export default MyDeckScreen;
