import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [codigo, setCodigo] = useState(0);
  const [nome, setNome] = useState(0);
  const [email, setEmail] = useState(0);
  const [senha, setSenha] = useState(0);
  const [confirmarSenha, setConfirmarSenha] = useState(0);

  function validaEntrada(){
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/;

    if (codigo <= 0) {
      alert('Código inválido');
      return false;
    }

    if (nome == '') {
      alert('Nome inválido');
      return false;
    }

    if (!emailRegex.test(email)) {
      alert('Email inválido');
      return false;
    }

    if (senha == '' || senha.length < 6) {
      alert('Tamanho de senha inválido');
      return false;
    }

    if (!senhaRegex.test(senha)) {
      alert('Senha fraca');
      return false;
    }

    if(senha != confirmarSenha) {
      alert('Senhas diferentes');
      return false;
    }

    return true;
  }

  async function salvar(){
    try {
      if (validaEntrada()) {
        let objetoContato = {
          codigo: codigo,
          nome: nome,
          email: email,
          senha: senha
        };
        
        const objetoSerializado = JSON.stringify(objetoContato);
        await AsyncStorage.setItem('@contato', objetoSerializado);

        alert('Salvo com sucesso');
      }
    }
    catch (error) {
      console.log(error);
      alert('Erro ao salvar');
    }
  }

  async function obtemDados() {
    try {
      const objetoSerializado = await AsyncStorage.getItem('@contato');

      if (objetoSerializado !== null) {
        const objetoDeserializado = JSON.parse(objetoSerializado);
        setCodigo(objetoDeserializado.codigo);
        setNome(objetoDeserializado.nome);
        setEmail(objetoDeserializado.email);
        setSenha(objetoDeserializado.senha);
      }
    }
    catch (error) {
      console.log(error);
      alert('Erro ao carregar');
    }
  }

  function limparCampos() {
    setCodigo('');
    setNome('');
    setEmail('');
    setSenha('');
    setConfirmarSenha('');
  }

  return (
    <View style={styles.container}>
      <Text>Código</Text>
      <TextInput keyboardType='numeric' style={styles.input} onChangeText={setCodigo} value={codigo}/>
      <Text>Nome</Text>
      <TextInput style={styles.input} onChangeText={setNome} value={nome}/>
      <Text>Email</Text>
      <TextInput style={styles.input} onChangeText={setEmail} value={email}/>

      <View style={styles.horizontal}>
        <Text style={styles.textoHorizontal} >Senha</Text>        
        <Text style={styles.textoHorizontal}>Confirmar Senha</Text>        
      </View>
      
      <View style={styles.horizontal}>
        <TextInput secureTextEntry={true} style={[styles.input, styles.inputHorizontal]} onChangeText={setSenha} value={senha}/>
        <TextInput secureTextEntry={true} style={[styles.input, styles.inputHorizontal]} onChangeText={setConfirmarSenha} value={senha}/>
      </View>

      <View style={styles.horizontal}>
        <Button title="Salvar" style={styles.botoesHorizontais}  onPress={() => {salvar()}} />
        <Button title="Carregar" style={styles.botoesHorizontais} onPress={() => {obtemDados()}}  />
      </View>
      <Button title="Limpar" onPress={() => {limparCampos()}} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'left',
    justifyContent: 'center',
  },

  textoHorizontal: {
    paddingHorizontal: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },

  input: {
    backgroundColor: '#fce803',
    borderWidth: 2,
    paddingRight: 50,
    paddingLeft: 10,
  },

  inputHorizontal: {
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderWidth: 2,
    borderRadius: 15,
  },

  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },

  botoesHorizontais: {
    marginHorizontal: 70,
    paddingHorizontal: 50
  }
});
