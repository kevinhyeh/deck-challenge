import React, { Component } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, TextInput, Button, SafeAreaView } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from '../styles/characterStyles';

class Character extends Component {
  render() {
    return (
      <View style={styles.person}>
        <View style={styles.headband}>
        </View>
        <View style={styles.head}>
          <View style={styles.eyes}>
          </View>
          <View style={styles.eyes}>
          </View>
        </View>
        <View style={styles.shirt}>
        </View> 
        <View style={styles.arm}>
        </View>
        <View style={styles.break}>
        </View>
        <View style={styles.pants}>
        </View>
      </View>
    );
  }
}

export default Character;
