import React, { Component } from 'react';
import { Text, View } from 'react-native';

class HistoryCard extends Component {
  render() {
    return(
      <View style={{ 
        width: 300, 
        height: 450, 
        backgroundColor: this.props.deck_completed ? '#F2FFF1' : '#FFF6ED', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 20, 
        borderRadius: 20, 
        borderWidth: 6, 
        paddingLeft: 7,
        paddingRight: 7,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0},
        shadowOpacity: 0.6,
        shadowRadius: 20,
        borderColor: this.props.deck_completed ? '#40E55D' : 'red' }}>
        { this.props.deck_completed == 1 ? 
          <Text style={{ fontSize: 40, color: '#40E55D', marginBottom: 30 }}>Completed</Text>
        : <Text style={{ fontSize: 40, color: 'red', marginBottom: 30 }}>Incompleted</Text>
        }
        <Text style={{ fontSize: 18, marginBottom: 5 }}>Date: {this.props.date_completed.split('T')[0]}</Text>
        <Text style={{ fontSize: 18, marginBottom: 5 }}>--------------------</Text>
        <Text style={{ fontSize: 18, marginBottom: 5 }}>Time: {this.props.timer}</Text>
        <Text style={{ fontSize: 18, marginBottom: 5 }}>--------------------</Text>
        <Text style={{ fontSize: 18, marginBottom: 5 }}>Difficulty: {this.props.difficulty} {this.props.difficulty == 26 ? '(Easy)': '(Hard)'}</Text>
        <Text style={{ fontSize: 18, marginBottom: 5 }}>--------------------</Text>
        <Text style={{ fontSize: 18, marginBottom: 5 }}>Chosen Workouts:</Text>
        <Text style={{ fontSize: 18, marginBottom: 5 }}>{this.props.chosen_workouts}</Text>
        <Text onPress={this.props.toggleFavFunc} style={{ fontSize: 60, color: this.props.deck_completed ? '#40E55D' : 'red' }}>&#9829;</Text>
      </View>
    )
  }
}

export default HistoryCard;