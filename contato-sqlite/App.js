import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useState, useEffect } from 'react';
import {
  createTable,
  adicionaContato,
  obtemContato,
  alteraContato
} from './services/dbservice';

export default function App() {
  const [id, setId] = useState(0);
  const [codigo, setCodigo] = useState();
  const [nome, setNome] = useState();
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [confirmarSenha, setConfirmarSenha] = useState();
  let tabelasCriadas = false;

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
          id: id,
          codigo: codigo,
          nome: nome,
          email: email,
          senha: senha
        };        

        let novoRegistro = id == undefined;

        if (novoRegistro) {
          setId(1);
          objetoContato.id = id;

          let resposta = await adicionaContato(objetoContato);
          console.log('estou passando apos resposta')
          if (resposta)
            Alert.alert('Adicionado com sucesso!');
          else
            Alert.alert('Falhou miseravelmente!');
        }
        else {      
          let resposta = await alteraContato(objetoContato);

          if (resposta)
            Alert.alert('Alterado com sucesso!');
          else {
            console.log(resposta);
            Alert.alert('Falhou miseravelmente!');
          }
        }
      }
    }
    catch (error) {
      console.log(error);
      alert('Erro ao salvar');
    }
  }

  async function obtemDados() {
    try {
      let contato = await obtemContato();
      console.log(contato);

      if (contato !== null) {
        setId(contato.id);
        setCodigo(contato.codigo.toString());
        setNome(contato.nome);
        setEmail(contato.email);
        setSenha(contato.senha);
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

  async function processamentoUseEffect() {
    if (!tabelasCriadas) {
      console.log("Verificando necessidade de criar tabelas...");
      tabelasCriadas = true;
      let resultado = await createTable();

      if (resultado)
        console.log("Criou tabelas...");
    }

    console.log("UseEffect...");
    //await carregaDados();
  }

  useEffect(
    () => {
      //dropTable();

      console.log('executando useffect');
      processamentoUseEffect(); //necessário método pois aqui não pode utilizar await...
    }, []);

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
        <TextInput secureTextEntry={true} style={[styles.input, styles.inputHorizontal]} onChangeText={setConfirmarSenha} value={confirmarSenha}/>
      </View>

      <View style={styles.horizontal}>
        <Button title="Salvar" style={styles.botoesHorizontais}  onPress={() => {salvar().then(console.log('Salvou!'))}} />
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
