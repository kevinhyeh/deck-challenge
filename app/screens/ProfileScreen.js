import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, TextInput, Button } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from '../styles/Styles';

class ProfileScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>User Profile</Text>
      </View>
    );
  }
}

export default ProfileScreen;
