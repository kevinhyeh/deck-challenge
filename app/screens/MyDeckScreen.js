import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, TextInput, Button, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import cards from '../cards.json';

import styles from '../styles/Styles';

class MyDeckScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shuffledDeck: []
    }
  }

  shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    this.setState({shuffledDeck: a});
  }

  render() {
    const deckList = this.state.shuffledDeck.map(card => {
      if (card.color == 'red') {
        return <Text key={card._id} style={styles.header}>{card.face} Pushups</Text>
      } else {
        return <Text key={card._id} style={styles.header}>{card.face} Situps</Text>
      }
    });
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <SafeAreaView>
          <Text onPress={() => this.shuffle(cards)}>Shuffle</Text>
          {deckList}
        </SafeAreaView>
      </ScrollView>
    );
  }
}

export default MyDeckScreen;
