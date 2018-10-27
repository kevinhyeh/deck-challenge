import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { createStackNavigator } from 'react-navigation';

import MenuScreen from './MenuScreen';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';

class MenuNavigation extends Component {
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
    screen: ProfileScreen,
    navigationOptions: {
      header: null
    }
  },
  Settings: { 
    screen: SettingsScreen,
    navigationOptions: {
      header: null
    }
  }
})

export default MenuNavigation;
