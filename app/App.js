import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import MainScreen from './screens/MainScreen';
import ProfileScreen from './screens/ProfileScreen';

class App extends Component {
  render() {
    return (
      <AppStackNavigator />
    );
  }
}

const AppStackNavigator = createStackNavigator({
  Home: { 
    screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  },
  Login: { 
    screen: LoginScreen,
    navigationOptions: {
      header: null
    }
  },
  SignUp: { 
    screen: SignUpScreen,
    navigationOptions: {
      header: null
    }
  },
  Main: { 
    screen: MainScreen,
    navigationOptions: {
      header: null
    }
  },
  Profile: {
    screen: ProfileScreen
  }
})

export default App;
