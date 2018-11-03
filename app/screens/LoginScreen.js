import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, TextInput, Button, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import PasswordInputText from 'react-native-hide-show-password-input';

import styles from '../styles/Styles';

class LoginScreen extends Component {
    constructor(props) {
    super(props);
    this.state = {
      TextInputUsername: '',
      TextInputPassword: '',
      user_id: 0
    }
  } 

  loginIntoMysql = () => {
    const { TextInputUsername } = this.state;
    const { TextInputPassword } = this.state;

    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: TextInputUsername.toLowerCase(),
        password: TextInputPassword.toLowerCase()
      })
    }).then(res => res.json())
    .then(resultingJSON => {
      if (resultingJSON == 'No account found') {
        Alert.alert(resultingJSON);
      } else if (resultingJSON == 'Invalid password') {
        Alert.alert(resultingJSON);
      } else {
        this.props.screenProps.user_id = resultingJSON.user_id;
        this.props.screenProps.user = resultingJSON.user;
        this.props.screenProps.email = resultingJSON.email
        this.props.screenProps.username = resultingJSON.username;
        this.props.navigation.navigate('Main');
      }
    });
  }

  login = () => {
    this.loginIntoMysql();
    {/*
    this.props.navigation.navigate('Main');
    */}
  }

  render() {

  const { navigate } = this.props.navigation; 

    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.form}>

          <Icon size={40} name="home" color="#4A6382" underlayColor="rgba(255,255,255,0)" onPress={() => navigate('Home')} />

          <Text style={styles.header}>Welcome</Text>

          <TextInput style={[styles.input, {marginBottom: 0}]} placeholder="Username" placeholderTextColor="#4A6382" onChangeText={TextInputUsername => this.setState({TextInputUsername})} />

          <PasswordInputText style={styles.input} placeholder="Password" placeholderTextColor="#4A6382" onChangeText={TextInputPassword => this.setState({TextInputPassword})} />
          <TouchableOpacity style={styles.button} onPress={() => this.login()}>
          <Text style={styles.btnText}>Enter</Text>
          </TouchableOpacity>
          <Text style={styles.help}>Don't have an account? <Text style={styles.helpBtn} onPress={() => navigate('SignUp')}>Sign Up</Text>
          </Text> 
          </View>
        </View>
      </View>
    );
  }
}

export default LoginScreen;