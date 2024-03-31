import { StyleSheet, StatusBar } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  titulo: {
    fontSize: 30,
    marginTop: 20,
    marginBottom: 50,
  },
  labelBotao: {
    fontSize: 30,    
    color: '#FFF',
  },
  botaoVoltar: {
    width: 120,
    height: 60,
    backgroundColor: '#00000f',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default styles;