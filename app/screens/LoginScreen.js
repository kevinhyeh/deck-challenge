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

    fetch('http://192.168.1.72:3001/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: TextInputUsername,
        password: TextInputPassword
      })
    }).then(res => res.json())
    .then(resultingJSON => {
      if (resultingJSON == 'Invalid fields') {
        Alert.alert(resultingJSON);
      } else {
        this.props.screenProps.user_id = resultingJSON;
        this.props.navigation.navigate('Main');
      }
    });
  }

  login = () => {
    this.loginIntoMysql();
  }

  render() {

  const { navigate } = this.props.navigation; 

    return (
      <View style={styles.container}>

        <View style={styles.form}>

        <Icon size={40} name="home" color="#fff" underlayColor="rgba(255,255,255,0)" onPress={() => navigate('Home')} />

        <Text style={styles.header}>Welcome</Text>

        <TextInput style={[styles.input, {marginBottom: 0}]} placeholder="Username" placeholderTextColor="#fff" onChangeText={TextInputUsername => this.setState({TextInputUsername})} />

        <PasswordInputText style={styles.input} placeholder="Password" placeholderTextColor="#fff" onChangeText={TextInputPassword => this.setState({TextInputPassword})} />

        <TouchableOpacity style={styles.button} onPress={() => this.login()}>
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