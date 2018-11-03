import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, TextInput, Button, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from '../styles/menuStyles';

class MenuScreen extends Component {

  render() {
  const { navigate } = this.props.navigation; 

    return (
      <SafeAreaView style={styles.menuContainer}>
        <View style={styles.center}>
          <Image style={styles.image} source={require('../assets/logo2.png')} />
          <View style={styles.rowContainer}>
            <Icon name='person' color='#59cbbd' size={34} />
            <Text style={styles.text} onPress={() => navigate('Profile')}>Profile</Text>
          </View>
          <View style={styles.rowContainer}>
            <Icon name='settings' color='#59cbbd' size={34} />
            <Text style={styles.text} onPress={() => navigate('Settings')}>Add Workouts</Text>
          </View>
          <View style={styles.rowContainer}>
            <Icon name='exit-to-app' color='#59cbbd' size={34} />
            <Text style={styles.text} onPress={() => navigate('Home')}>Log Out</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default MenuScreen;
