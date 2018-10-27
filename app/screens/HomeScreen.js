import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, TextInput, Button } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from '../styles/Styles';

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Deck Challenge</Text>
        <TouchableOpacity style={styles.button} title="Login" onPress={() => this.props.navigation.navigate('Login')}>
        <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} title="Sign Up" onPress={() => this.props.navigation.navigate('SignUp')}>
        <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default HomeScreen;
