import { StyleSheet } from 'react-native';

const workoutStyles = StyleSheet.create({
  workoutContainer: {
    flex: 1,
    backgroundColor: '#36485f',
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
    borderRadius: 50,
    marginTop: 20
  },
  shuffleText: {
    fontSize: 20,
    color: 'white'
  },
  test: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 50,
    marginBottom: 90,
    borderRadius: 30
  }
});

export default workoutStyles;