import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import styles from '../styles/Styles';

const enterButton = (props) => {
  return(
    <TouchableOpacity style={styles.button} title="{props.title}" onPress={props.func}>
      <Text style={styles.btnText}>{props.title}</Text>
    </TouchableOpacity>
  )
}

export default enterButton;