import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, TextInput, Button } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from '../styles/Styles';

class SettingsScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Settings</Text>
      </View>
    );
  }
}

export default SettingsScreen;
