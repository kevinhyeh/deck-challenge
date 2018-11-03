import { StyleSheet } from 'react-native';

const workoutStyles = StyleSheet.create({
  workoutContainer: {
    flex: 1,
    backgroundColor: '#4A6382',
    justifyContent: 'center'
  },
  rowContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
    paddingLeft: '25%',
    paddingRight: '25%'
  },
  workouts: {
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '70%'
  },
  inactiveBut: {
    width: 100,
    height: 40,
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.4)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  activeBut: {
    width: 100,
    height: 40,
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,1)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inactiveWorkoutBut: {
    padding: 12,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.4)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  activeWorkoutBut: {
    padding: 12,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,1)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    alignSelf: 'stretch',
    height: 40,
    borderBottomWidth: 1,
    borderColor: '#fff',
    marginBottom: 30,
    color: '#fff',
    width: '50%'
  },
  section: {
    alignItems: 'center',
    marginBottom: 20
  },
  header: {
    color: 'white',
    fontSize: 20
  },
  shuffleBut: {
    padding: 12,
    backgroundColor: '#59cbbd',
    borderRadius: 20,
    marginTop: 20
  },
  shuffleText: {
    fontSize: 20,
    color: 'white'
  },
  modal: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  timer: {
    color: '#fff',
    fontSize: 50,
    marginBottom: 40
  },
  workoutCards: {
    width: 300,
    height: 450,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#59cbbd',
    borderWidth: 6
  },
  stats: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  congrats: {
    fontSize: 40,
    color: '#fff'
  }
});

export default workoutStyles;