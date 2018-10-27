import { StyleSheet } from 'react-native';

const characterStyles = StyleSheet.create({
  workoutContainer: {
    flex: 1,
    backgroundColor: '#36485f'
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  rowContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
    paddingLeft: '25%',
    paddingRight: '25%'
  },
  active: {
    fontSize: 24,
    color: '#59cbbd'
  },
  inactive: {
    fontSize: 24,
    color: '#777'
  },
  topContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  headband: {
    width: 120,
    height: 20,
    backgroundColor: '#47B0E4',
    position: 'absolute',
    top: -130,
    left: -61,
    zIndex: 1
  },
  head: {
    width: 115,
    height: 95,
    backgroundColor: '#FFD5A1',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
    top: -145,
    left: -58
  },
  eyes: {
    width: 15,
    height: 15,
    borderRadius: 50,
    backgroundColor: '#000',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 40
  },
  arm: {
    width: 130,
    height: 110,
    marginTop: 10,
    backgroundColor: '#FFD5A1',
    position: 'absolute',
    top: -50,
    left: -65,
    zIndex: 0
  },
  shirt: {
    width: 80,
    height: 100,
    backgroundColor: 'red',
    position: 'absolute',
    top: -50,
    left: -40,
    zIndex: 1
  },
  break: {
    width: 20,
    height: 70,
    backgroundColor: '#36485f',
    position: 'absolute',
    top: 80,
    left: -10,
    zIndex: 1
  },
  pants: {
    width: 80,
    height: 100,
    backgroundColor: '#47B0E4',
    position: 'absolute',
    top: 50,
    left: -40,
    zIndex: 0
  },
  shuffle: {
    height: 50,
    marginLeft: '30%',
    marginRight: '30%',
    backgroundColor: '#59cbbd',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100
  }
})

export default characterStyles;