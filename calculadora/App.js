import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, View, TextInput } from 'react-native';
import iconeFinanceiro from './assets/financeiro.png';

export default function App() {
  const [campo1, setCampo1] = useState(0);
  const [campo2, setCampo2] = useState(0);
  const [resposta, setResposta] = useState(0);

  function somar() {
    let v1 = Number.parseFloat(campo1.replace(',', '.'));
    let v2 = Number.parseFloat(campo2.replace(',', '.'));

    setResposta(v1 + v2);
  }

  function subtrair() {
    let v1 = Number.parseFloat(campo1.replace(',', '.'));
    let v2 = Number.parseFloat(campo2.replace(',', '.'));

    setResposta(v1 - v2);
  }

  function multiplicar() {
    let v1 = Number.parseFloat(campo1.replace(',', '.'));
    let v2 = Number.parseFloat(campo2.replace(',', '.'));

    setResposta(v1 * v2);
  }

  function dividir() {
    let v1 = Number.parseFloat(campo1.replace(',', '.'));
    let v2 = Number.parseFloat(campo2.replace(',', '.'));

    setResposta(v1 / v2);
  }

  function exponencial() {
    let v1 = Number.parseFloat(campo1.replace(',', '.'));
    let v2 = Number.parseFloat(campo2.replace(',', '.'));

    setResposta(v1 ** v2);
  }

  function limparCampos() {
    setCampo1('');
    setCampo2('');
    setResposta('');
  }

  return (
    <View style={styles.container}>
      <Text>Calculadora</Text>
      <Image source={iconeFinanceiro} style={styles.imagem} />

      <Text>Campo 1</Text>
      <TextInput keyboardType='decimal-pad' style={styles.input} value={campo1} onChangeText={(t) => setCampo1(t)}></TextInput>

      <Text>Campo 2</Text>
      <TextInput keyboardType='decimal-pad' style={styles.input} value={campo2} onChangeText={(t) => setCampo2(t)} ></TextInput>

      <TouchableOpacity style={styles.botao} onPress={() => somar()}>
          <Text>+</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={() => subtrair()}>
          <Text>-</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={() => multiplicar()}>
          <Text>X</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={() => dividir()}>
          <Text>/</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={() => exponencial()}>
          <Text>EXP</Text>
      </TouchableOpacity>      

      <TouchableOpacity style={styles.botao} onPress={() => limparCampos()}>
          <Text>Limpar Valores</Text>
      </TouchableOpacity>

      <Text>Resultado: {resposta}</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  imagem: {
    width: 50,
    height:50,
    margin: 20
  },

  botao:{
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

  input: {
    width: '50%',
    textAlign: 'center',
    borderColor: 'black',
    margin: 10,
    borderRadius: 20,
    borderWidth: 2
  }
});
