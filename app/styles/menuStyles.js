import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    backgroundColor: '#4A6382',
    alignItems: 'center',
    justifyContent: 'center'
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 450,
    borderWidth: 5,
    borderColor: '#fff',
    borderRadius: 20
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20
  },
  rowContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10
  },
  text: {
    fontSize: 24,
    paddingTop: 5,
    color: '#59cbbd',
    fontFamily: 'Copperplate-Bold'
  }
})

export default styles;