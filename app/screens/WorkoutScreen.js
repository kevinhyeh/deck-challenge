import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, ImageBackground, TextInput, Button, SafeAreaView, Alert, Modal, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';

import { _stats } from '../services/FetchCalls';
import InstructionsModal from '../components/InstructionsModal';
import Character from '../components/Character';

import styles from '../styles/WorkoutStyles';
import cards from '../cards.json';
import quotes from '../quotes.json';

class WorkoutScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      decksCreated: 0,
      decksCompleted: 0,
      modalVisibility: false
    }
  };

  componentDidMount() {
    this.loadStats();
    this.props.navigation.addListener('willFocus', this.loadStats);
  };

  loadStats = () => {
    let user_id = this.props.screenProps.user_id

    return _stats(user_id)
    .then(resultingJSON => this.setState({
      decksCreated: resultingJSON.created,
      decksCompleted: resultingJSON.completed
    }))
  };

  setModalVisibility = (visible) => {
    this.setState({ modalVisibility: visible })
  };

  render() {
    return (
      <SafeAreaView style={[styles.workoutContainer, { alignItems: 'center' }]}>
          <InstructionsModal closeModal={() => this.setModalVisibility(false)} visible={this.state.modalVisibility} />
          <Text style={{ color: '#59cbbd', marginBottom: 20, fontSize: 46, fontFamily: 'Copperplate-Bold', textAlign: 'center' }}>WELCOME{"\n"}{this.props.screenProps.username.toUpperCase()}!</Text>
          <View style={{marginBottom: 40, flexDirection: 'row', justifyContent: 'space-between', width: 300}}>
            <View style={styles.stats}>
              <Text style={{ color: '#fff', fontSize: 16 }}>Decks Created:</Text>
              <Text style={{ color: '#fff', fontSize: 16 }}>{this.state.decksCreated}</Text>
            </View>
            <View style={styles.stats}>
              <Text style={{ color: '#fff', fontSize: 16 }}>Decks Completed:</Text>
              <Text style={{ color: '#fff', fontSize: 16 }}>{this.state.decksCompleted}</Text>
            </View>
          </View>
          <TouchableOpacity style={{ borderWidth: 2, borderColor: '#fff', marginBottom: 180, padding: 5 }} onPress={() => this.setModalVisibility(true)}>
            <Text style={{ fontSize: 18, color: '#fff' }}>Deck Instructions</Text>
          </TouchableOpacity>
          <Character />
          <TouchableOpacity style={[styles.shuffleBut, {marginTop: 180}]} onPress={() => this.props.navigation.navigate('Build')}>
            <Text style={{ color: '#fff', fontSize: 24 }}>Build Deck</Text>
          </TouchableOpacity>
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

export default WorkoutScreen;
