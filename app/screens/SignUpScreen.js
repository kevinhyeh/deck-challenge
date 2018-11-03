import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, TextInput, Button, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import PasswordInputText from 'react-native-hide-show-password-input';

import styles from '../styles/Styles';

class SignUpScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      TextInputName: '',
      TextInputEmail: '',
      TextInputUsername: '',
      TextInputPassword: ''
    }
  } 

  insertIntoMysql = () => {
    const { TextInputName } = this.state;
    const { TextInputEmail } = this.state;
    const { TextInputUsername } = this.state;
    const { TextInputPassword } = this.state;

    fetch('http://192.168.1.72:3001/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: TextInputName.toLowerCase(), 
        email: TextInputEmail.toLowerCase(),
        username: TextInputUsername.toLowerCase(),
        password: TextInputPassword.toLowerCase()
      })
    }).then(res => res.json())
    .then(resultingJSON => {
      if (resultingJSON == 'Email already used') {
        Alert.alert(resultingJSON);
      } else if (resultingJSON == 'Username taken') {
        Alert.alert(resultingJSON);
      } else {
        this.props.navigation.navigate('Login');
        console.log(resultingJSON)
      }
    });
  }

  navLoginScreen = () => {

    const { TextInputName } = this.state;
    const { TextInputEmail } = this.state;
    const { TextInputUsername } = this.state;
    const { TextInputPassword } = this.state;

    if (TextInputName == '' || TextInputEmail == '' || TextInputUsername == '' || TextInputPassword == '') {
      Alert.alert('Please fill all fields');
    } else if (TextInputEmail.indexOf('@') == -1) {
      Alert.alert('Please add a valid email');
    } else {
      this.insertIntoMysql();
    }
  };

  render() {

    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.form}>

          <Icon size={40} name="home" color="#4A6382" underlayColor="rgba(255,255,255,0)" onPress={() => navigate('Home')} />

          <Text style={styles.header}>Register</Text>

          <TextInput style={styles.input} returnKeyType={ 'next' } placeholder="Your Name" placeholderTextColor="#4A6382" onChangeText={TextInputName => this.setState({TextInputName})} />

          <TextInput style={styles.input} placeholder="Your Email" placeholderTextColor="#4A6382" onChangeText={TextInputEmail => this.setState({TextInputEmail})} />

          <TextInput style={[styles.input, {marginBottom: 0}]} placeholder="Username" placeholderTextColor="#4A6382" onChangeText={TextInputUsername => this.setState({TextInputUsername})} />

          <PasswordInputText style={styles.input} placeholder="Password" placeholderTextColor="#4A6382" onChangeText={TextInputPassword => this.setState({TextInputPassword})} />

          <TouchableOpacity style={styles.button} onPress={this.navLoginScreen}>
          <Text style={styles.btnText}>Sign Up</Text>
          </TouchableOpacity>

          <Text style={styles.help}>Already have an account?{this.props.navigation.state.params} <Text style={styles.helpBtn} onPress={() => navigate('Login')}>Login</Text>
          </Text> 

          </View>
        </View>
      </View>
    );
  }
}

export default SignUpScreen;