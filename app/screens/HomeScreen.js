import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';

import EnterButton from '../components/EnterButton';
import styles from '../styles/Styles';

class HomeScreen extends Component {
  render() {
    const { navigate } = this.props.navigation; 

    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={[ inlineStyles.iconsRow, {marginBottom: 30} ]}>
            <Text style={ inlineStyles.iconSize }>&#9824;</Text>
            <Text style={[ inlineStyles.iconSize, {color: 'red'} ]}>&#9829;</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Image source={require('../assets/logo.png')} style={{ width: 100, height: 100 }} />
            <Text style={styles.header}>Deck{'\n'}Challenge</Text>
          </View>
          <EnterButton title={'Login'} func={() => navigate('Login')} />
          <EnterButton title={'SignUp'} func={() => navigate('SignUp')} />
          <View style={[ inlineStyles.iconsRow, {marginTop: 30} ]}>
            <Text style={[ inlineStyles.iconSize, {color: 'red'} ]}>&#9830;</Text>
            <Text style={ inlineStyles.iconSize }>&#9827;</Text>
          </View>
        </View>
      </View>
    );
  }
}

const inlineStyles = {
  iconsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 320
  },
  iconSize: {
    fontSize: 100
  }
}

export default HomeScreen;
