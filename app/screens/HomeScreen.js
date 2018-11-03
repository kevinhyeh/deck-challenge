import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, TextInput, Button } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from '../styles/Styles';

class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={{ flexDirection: 'row', marginBottom: 30, justifyContent: 'space-between', width: 320}}>
            <Text style={{ fontSize: 100 }}>&#9824;</Text>
            <Text style={{ color: 'red', fontSize: 100 }}>&#9829;</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Image source={require('../assets/logo.png')} style={{ width: 100, height: 100 }} />
            <Text style={styles.header}>Deck{'\n'}Challenge</Text>
          </View>
          <TouchableOpacity style={styles.button} title="Login" onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} title="Sign Up" onPress={() => this.props.navigation.navigate('SignUp')}>
          <Text style={styles.btnText}>Sign Up</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'space-between', width: 320}}>
            <Text style={{ color: 'red', fontSize: 100 }}>&#9830;</Text>
            <Text style={{ fontSize: 100 }}>&#9827;</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default HomeScreen;
