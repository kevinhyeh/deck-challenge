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
          <Image style={styles.image} source={{uri: 'https://www.allworship.com/wp-content/uploads/2013/08/bigstock-playing-cards-27305468-640x428.jpg'}} />
        </View>
        <View style={styles.rowContainer}>
          <Icon name='person' color='#000' size={40} />
          <Text style={styles.text} onPress={() => navigate('Profile')}>Profile</Text>
        </View>
        <View style={styles.rowContainer}>
          <Icon name='settings' color='#000' size={40} />
          <Text style={styles.text} onPress={() => navigate('Settings')}>Settings</Text>
        </View>
        <View style={styles.rowContainer}>
          <Icon name='exit-to-app' color='#000' size={40} />
          <Text style={styles.text} onPress={() => navigate('Home')}>Log Out</Text>
        </View>
      </SafeAreaView>
    );
  }
}

export default MenuScreen;
