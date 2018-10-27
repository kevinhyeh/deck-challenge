import { StyleSheet } from 'react-native';

const workoutStyles = StyleSheet.create({
  workoutContainer: {
    flex: 1,
    backgroundColor: '#36485f'
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
  }
});

export default workoutStyles;