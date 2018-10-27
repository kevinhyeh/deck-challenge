import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    backgroundColor: '#eee'
  },
  center: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#777',
    padding: 20
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  rowContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10
  },
  text: {
    fontSize: 24,
    paddingTop: 5,
    color: '#000'
  }
})

export default styles;