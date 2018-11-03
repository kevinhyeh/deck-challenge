import React from 'react';
import { Text, View, ScrollView, SafeAreaView, Alert, Modal, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from '../styles/WorkoutStyles';

const Instructions = (props) => {
  return(
    <Modal visible={props.visible} transparent animationType={'slide'}>
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
        <SafeAreaView style={{ alignItems: 'center' }}>
          <TouchableOpacity style={modalStyles.icon} onPress={props.closeModal}>
            <Icon name='close' color='#fff' size={30} />
          </TouchableOpacity>
          <View style={modalStyles.titleContainer}>
            <Text style={modalStyles.title}>Deck Challenge Instructions</Text> 
          </View>
          <View style={modalStyles.secContainer}>
            <View style={{ alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 20, fontFamily: 'AvenirNext-Heavy' }}>Introduction</Text>
            </View>
            <Text style={modalStyles.text}>The deck challenge app was created for people who are looking for a quick and solid workout that can be done in the comfort of your own home.
            </Text>
            <Text style={modalStyles.text}>
            The challenge is completely customizable to the difficulty level that you choose.
            </Text>
            <Text style={[modalStyles.text, {marginBottom: 0}]}>It does not matter how long it takes to finish, it matters that you do.</Text>
          </View>
          <View style={modalStyles.secContainer}>
            <View>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 20, fontFamily: 'AvenirNext-Heavy' }}>How To Build</Text>
                <Text style={modalStyles.text}>Step One: Select Difficulty</Text>
                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                  <View style={styles.inactiveBut}>
                    <Text>Easy</Text>
                  </View>
                  <View style={styles.inactiveBut}>
                    <Text>Hard</Text>
                  </View>
                </View>
              </View>
              <Text style={modalStyles.text}>Easy: Contains 26 individual workouts, which is half a deck. (Recommend)</Text>
              <Text style={modalStyles.text}>Hard: Contains 52 individual workouts, which is a full deck.</Text>
              <View style={{ alignItems: 'center' }}>
                <Text style={modalStyles.text}>-----------------------</Text>
              </View>
            </View>
            <View>
              <View style={{ alignItems: 'center' }}>
                <Text style={modalStyles.text}>Step Two: Select Number</Text>
                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                  <View style={styles.inactiveBut}>
                    <Text>2</Text>
                  </View>
                  <View style={styles.inactiveBut}>
                    <Text>4</Text>
                  </View>
                </View>
              </View>
              <Text style={modalStyles.text}>2 workouts: One paired with black cards and the other with red cards. (Recommend)</Text>
              <Text style={modalStyles.text}>4 workouts: Each are paired with a different card suit: Spades. Hearts. Clubs. Diamonds.</Text>
              <View style={{ alignItems: 'center' }}>
                <Text style={modalStyles.text}>-----------------------</Text>
              </View>
            </View>
            <View>
              <View style={{ alignItems: 'center' }}>
                <Text style={modalStyles.text}>Step Three: Select Workouts</Text>
                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                  <View style={styles.inactiveBut}>
                    <Text>Push Ups</Text>
                  </View>
                  <View style={styles.inactiveBut}>
                    <Text>Sit Ups</Text>
                  </View>
                </View>
              </View>
              <Text style={modalStyles.text}>Choose the workouts that you woud like to incorporate in your workout. You can add your own workout in Menu's Tab.</Text>
              <View style={{ alignItems: 'center' }}>
                <Text style={modalStyles.text}>-----------------------</Text>
              </View>
              <Text style={modalStyles.text}>Check out the History's Tab where you can view all your past decks and favorite the ones that you enjoyed! Which can be viewed in the Favorites Tab.</Text>
              <View style={{ alignItems: 'center' }}>
                <Text style={[modalStyles.text, {fontSize: 20, fontFamily: 'AvenirNext-Heavy'}]}>Enjoy The Challenge!</Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </Modal>
  )
};

const {height, width} = Dimensions.get('window');

const modalStyles = StyleSheet.create({
  title: {
    color: '#fff',
    fontSize: 26
  },
  titleContainer: {
    marginTop: 20, 
    padding: 10, 
    borderWidth: 3, 
    borderColor: '#fff'
  },
  icon: {
    width: width,
    marginLeft: '15%',
    alignItems: 'flex-start'
  },
  secContainer: {
    marginLeft: '12%',
    marginRight: '12%',
    marginTop: 30
  },
  text: { 
    color: '#fff', 
    fontSize: 18, 
    fontFamily: 'AvenirNext-Italic',
    marginBottom: 20
  }
});

export default Instructions;