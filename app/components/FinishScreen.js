import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import styles from '../styles/WorkoutStyles';

const finishScreen = (props) => {
  return(
    <View style={styles.workoutCards}>
      <Text>Congrats!</Text>
      <Text>You finished with a time of</Text>
      <Text>{props.timer}</Text>
      <Text>Add this workout to your favorites?</Text>
      <View style={{ flexDirection: 'row' }}>
      { props.favoritesState == true ?
        <TouchableOpacity style={styles.activeBut}>
        <Text>Yes</Text>
        </TouchableOpacity>
      : <TouchableOpacity onPress={props.favoritesFunc(true)} style={styles.inactiveBut}>
        <Text>Yes</Text>
        </TouchableOpacity>
      }
      { props.favoritesState == false ?
        <TouchableOpacity style={styles.activeBut}>
        <Text>No</Text>
        </TouchableOpacity>
      : <TouchableOpacity onPress={props.favoritesFunc(false)} style={styles.inactiveBut}>
        <Text>No</Text>
        </TouchableOpacity>
      }
      </View>
      <TouchableOpacity>
      <Text onPress={props.finishWorkout}>Finish Workout</Text>
      </TouchableOpacity>
    </View>
  )
};

export default finishScreen;