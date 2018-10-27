import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, TextInput, Button, Alert } from 'react-native';
import { Icon } from 'react-native-elements';

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
        user: TextInputName, 
        email: TextInputEmail,
        username: TextInputUsername,
        password: TextInputPassword
      })
    }).then(res => res.json())
  }

  navLoginScreen = () => {
    {/*
    const { TextInputName } = this.state;
    const { TextInputEmail } = this.state;
    const { TextInputUsername } = this.state;
    const { TextInputPassword } = this.state;

    if(TextInputName == '' || TextInputEmail == '' || TextInputUsername == '' || TextInputPassword == '') {
      Alert.alert('Please fill all fields');
    } else {
      this.insertIntoMysql();
      this.props.navigation.navigate('Main');
    }
    */}
    this.props.navigation.navigate('Main');
  };

  render() {

    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>

        <View style={styles.form}>

        <Icon size={40} name="home" color="#fff" underlayColor="rgba(255,255,255,0)" onPress={() => navigate('Home')} />

        <Text style={styles.header}>Register</Text>

        <TextInput style={styles.input} placeholder="Your Name" placeholderTextColor="#fff" onChangeText={TextInputName => this.setState({TextInputName})} />

        <TextInput style={styles.input} placeholder="Your Email" placeholderTextColor="#fff" onChangeText={TextInputEmail => this.setState({TextInputEmail})} />

        <TextInput style={styles.input} placeholder="Username" placeholderTextColor="#fff" onChangeText={TextInputUsername => this.setState({TextInputUsername})} />

        <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#fff" onChangeText={TextInputPassword => this.setState({TextInputPassword})} />

        <TouchableOpacity style={styles.button} onPress={this.navLoginScreen}>
        <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.help}>Already have an account? <Text style={styles.helpBtn} onPress={() => navigate('Login')}>Login</Text>
        </Text> 

        </View>
      </View>
    );
  }
}

export default SignUpScreen;