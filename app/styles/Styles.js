import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A6382',
    justifyContent: 'center',
    alignItems: 'center'
  },
  form: {
    alignSelf: 'stretch'
  },
  header: {
    fontSize: 40,
    color: '#59cbbd',
    paddingBottom: 10,
    marginTop: 20,
    marginBottom: 20,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    fontFamily: 'Copperplate-Bold'
  },
  input: {
    alignSelf: 'stretch',
    height: 40,
    borderBottomWidth: 1,
    borderColor: '#4A6382',
    marginBottom: 35,
    color: '#4A6382',
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
    color: '#4A6382',
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
    backgroundColor: '#4A6382',
    paddingLeft: 60,
    paddingRight: 60
  },
  card: {
    backgroundColor: '#FCFCF8',
    width: 380,
    height: 600,
    borderRadius: 20,
    paddingRight: 30,
    paddingLeft: 30,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0},
    shadowOpacity: 0.6,
    shadowRadius: 20
  }
})

export default styles