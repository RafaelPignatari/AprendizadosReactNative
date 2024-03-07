import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import iconeCalculadora from './assets/calc.png';

export default function App() {
  
  const [campo1, setCampo1] = useState(0);
  const [campo2, setCampo2] = useState(0);

  function somar() {
    let v1 = Number.parseFloat(campo1.replace(',', '.'));
    let v2 = Number.parseFloat(campo2.replace(',', '.'));

    Alert.alert("Resultado", (v1 + v2).toString());
  }

  return (
    <View style={styles.container}>
        <Text style={styles.titulo}>
          Somador
        </Text>

        <Image source={iconeCalculadora} style={styles.iconeCalculadora}/>

        <Text style={styles.labelCampo}>Digite um valor:</Text>
        <TextInput keyboardType='decimal-pad' style={styles.campo} onChangeText={(text) => setCampo1(text)}/>

        <Text style={styles.labelCampo}>Digite um valor:</Text>
        <TextInput keyboardType='decimal-pad' style={styles.campo} onChangeText={(text) => setCampo2(text)}/>

        <TouchableOpacity style={styles.botaoSomar} onPress={() => somar()}>
          <Text style={styles.textoBotao}>Somar</Text>
        </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  iconeCalculadora:{
    width: 100,
    height: 100,
    marginVertical: 20,
  },

  botaoSomar:{
    width:'70%',
    borderColor: 'green',
    backgroundColor: '#1dc2a1',
    borderWidth: 2,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },

    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation:14, 
  },

  textoBotao: {
    color: '#fff',
    fontSize: 30,
  },

  campo:{
    width: '50%',
    height: 40,
    fontSize: 20,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    textAlign: 'right',
    marginTop: 10
  },

  labelCampo: {
    fontSize: 25,
    marginTop: 20,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titulo:{
    fontSize: 30,
    color: '#10a5b0',
    textAlign: 'center',
    fontWeight: 'bold',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
  }
});
