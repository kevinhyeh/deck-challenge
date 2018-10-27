import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, TextInput, Button } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from '../styles/Styles';

class LoginScreen extends Component {
  render() {

  const { navigate } = this.props.navigation; 

    return (
      <View style={styles.container}>

        <View style={styles.form}>

        <Icon size={40} name="home" color="#fff" underlayColor="rgba(255,255,255,0)" onPress={() => navigate('Home')} />

        <Text style={styles.header}>Welcome</Text>

        <TextInput style={styles.input} placeholder="Username or Email" placeholderTextColor="#fff" />

        <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#fff" />

        <TouchableOpacity style={styles.button} onPress={() => navigate('Main')}>
        <Text style={styles.btnText}>Enter</Text>
        </TouchableOpacity>

        <Text style={styles.help}>Don't have an account? <Text style={styles.helpBtn} onPress={() => navigate('SignUp')}>Sign Up</Text>
        </Text> 

        </View>
      </View>
    );
  }
}

export default LoginScreen;