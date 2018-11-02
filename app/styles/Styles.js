import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#36485f',
    justifyContent: 'center',
    paddingLeft: 60,
    paddingRight: 60
  },
  form: {
    alignSelf: 'stretch'
  },
  header: {
    fontSize: 26,
    color: '#59cbbd',
    paddingBottom: 10,
    marginTop: 20,
    marginBottom: 20,
    borderBottomColor: '#fff',
    borderBottomWidth: 1
  },
  input: {
    alignSelf: 'stretch',
    height: 40,
    borderBottomWidth: 1,
    borderColor: '#fff',
    marginBottom: 35,
    color: '#fff',
    fontSize: 16
  },
  button: {
    backgroundColor: '#59cbbd',
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    marginTop: 20
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  help: {
    alignSelf: 'stretch',
    color: '#fff',
    fontSize: 16,
    marginTop: 20
  },
  helpBtn: {
    fontSize: 16,
    color: '#5595FF'
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: '#59cbbd',
    justifyContent: 'center',
    marginBottom: 20
  },
  menu: {
    flex: 1,
    backgroundColor: '#36485f',
    paddingLeft: 60,
    paddingRight: 60
  }
})

export default styles