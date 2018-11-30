import React from 'react';
import { Text, View } from 'react-native';

import styles from '../styles/WorkoutStyles';

const timer_exit = (props) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text onPress={props.exit} style={{ color: 'white' }}>Exit Workout</Text>
      <Text style={styles.timer}>{props.timer}</Text>
    </View>
  )
}

export default timer_exit;