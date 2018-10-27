import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, TextInput, Button } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from '../styles/Styles';

class OutfitScreen extends Component {

  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Outfits</Text>
      </View>
    );
  }
}

export default OutfitScreen;
