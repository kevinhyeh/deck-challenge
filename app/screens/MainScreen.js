import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, TextInput, Button, Alert, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import WorkoutScreen from './WorkoutScreen';
import HistoryScreen from './HistoryScreen';
import OutfitScreen from './OutfitScreen';
import MyDeckScreen from './MyDeckScreen';
import MenuScreen from './MenuScreen';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';

import styles from '../styles/Styles';
import menuStyles from '../styles/menuStyles';

class Workout extends Component {
  render() {
    return (
      <WorkoutScreen />
    );
  }
}

class MyDeck extends Component {
  render() {
    return (
      <MyDeckScreen />
    );
  }
}

class History extends Component {
  render() {
    return (
      <HistoryScreen />
    );
  }
}

class Menu extends Component {
  render() {
    return (
       <MenuNav />
    );
  }
}

const MenuNav = createStackNavigator({
  Menu: { 
    screen: MenuScreen,
    navigationOptions: {
      header: null
    }
  },
  Profile: { 
    screen: ProfileScreen
  },
  Settings: { 
    screen: SettingsScreen
  }
})

export default createMaterialBottomTabNavigator({
  Workout: { 
    screen: WorkoutScreen,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => (
        <Icon name='fitness-center' color={tintColor} size={24} />
      )
    }
  },
  MyDeck: {
    screen: MyDeckScreen,
    navigationOptions: {
      tabBarLabel: 'Favorites',
      tabBarIcon: ({tintColor}) => (
        <Icon name='favorite' color={tintColor} size={24} />
      )
    }
  },
  History: { 
    screen: HistoryScreen,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => (
        <Icon name='history' color={tintColor} size={24} />
      )
    }
  },
  Menu: {
    screen: MenuNav,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => (
        <Icon name='menu' color={tintColor} size={24} />
      )
    }
  }
},
  { 
    activeTintColor: 'blue',
    inactiveColor: 'black',
    barStyle: {
      height: 70,
      backgroundColor: '#59cbbd'
    }
  });
