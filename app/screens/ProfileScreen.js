import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, TextInput, Button } from 'react-native';
import { Icon } from 'react-native-elements';

import { _bestDeck } from '../services/FetchCalls';
import styles from '../styles/Styles';

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bestDeck: ''
    }
  }

  componentDidMount() {
    this.loadBest();
    this.props.navigation.addListener('willFocus', this.loadBest);
  };

  loadBest = () => {
    const user_id = this.props.screenProps.user_id;

    return _bestDeck(user_id)
    .then(resultingJSON => this.setState({ bestDeck: resultingJSON }))
  };

  render() {
    const date = this.state.bestDeck.date_completed + "";

    return (
      <ScrollView style={{ backgroundColor: '#4A6382' }}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.header}>User Profile</Text>
        <Text style={{ color: '#fff', marginBottom: 10, fontSize: 18 }}>Name: {this.props.screenProps.user}</Text>
        <Text style={{ color: '#fff', marginBottom: 10, fontSize: 18 }}>Email: {this.props.screenProps.email}</Text>
        <Text style={{ color: '#fff', marginBottom: 10, fontSize: 18 }}>Username: {this.props.screenProps.username}</Text>
        <View style={{ 
          width: 300, 
          height: 450, 
          backgroundColor: '#F2FFF1', 
          justifyContent: 'center', 
          alignItems: 'center', 
          marginTop: 40, 
          borderRadius: 20, 
          borderWidth: 6,
          paddingLeft: 7,
          paddingRight: 7,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 0},
          shadowOpacity: 0.6,
          shadowRadius: 20,
          borderColor: '#40E55D'}}>
          <Text style={{ fontSize: 40, color: '#40E55D', fontFamily: 'AvenirNext-Heavy' }}>Best Deck</Text>
          <Text style={{ fontSize: 40, color: '#40E55D', marginBottom: 30 }}>Completed</Text>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>Date: {date.split('T')[0]}</Text>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>--------------------</Text>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>Time: {this.state.bestDeck.timer}</Text>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>--------------------</Text>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>Difficulty: {this.state.bestDeck.difficulty} {this.state.bestDeck.difficulty == 26 ? '(Easy)': '(Hard)'}</Text>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>--------------------</Text>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>Chosen Workouts:</Text>
          <Text style={{ fontSize: 18, marginBottom: 5 }}>{this.state.bestDeck.chosen_workouts}</Text>
        </View>
      </View>
      </ScrollView>
    );
  }
}

export default ProfileScreen;
