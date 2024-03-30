import { Alert, ScrollView, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import styles from './styles';
import { useState, useEffect } from 'react';
import Contato from './components/Contato';
import * as dbservice from './services/dbservice';

export default function App() {

  const [id, setId] = useState();
  const [nome, setNome] = useState();
  const [codigo, setCodigo] = useState();
  const [email, setTEmail] = useState();
  const [senha, setSenha] = useState();
  const [contatos, setContatos] = useState([]);  

  useEffect(
    () => {
      processamentoUseEffect(); //necessário método pois aqui não pode utilizar await...
      console.log("Use Effect!")
      carregaDados();
    }, []);


  function createUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(0, 2);
  }

  async function processamentoUseEffect() {
    let resultado = await dbservice.createTable();

    if (resultado)
      console.log("Criou tabelas...");
  }

  async function salvaDados() {
    let novoRegistro = !id;

    let obj = {
      id: novoRegistro ? createUniqueId() : id,
      nome: nome,
      codigo: codigo,
      email: email,
      senha: senha
    };

    try {

      if (novoRegistro)
        await dbservice.adicionaContato(obj); // inclusão
      else {
        await dbservice.alteraContato(obj); // alteração
      }

      Keyboard.dismiss();
      Alert.alert('Dados salvos com sucesso!!!');
      limparCampos();
      carregaDados();
    } catch (e) {
      Alert.alert(e.toString());
    }
  }

  async function carregaDados() {
    try {
      let contatos = await dbservice.obtemTodosContatos();
      console.log(contatos)

      if (contatos != null) {
        setContatos(contatos);
      }
      else {
        setContatos([]);
      }

    } catch (e) {
      Alert.alert(e.toString());
    }
  }


  function editar(identificador) {
    const contato = contatos.find(contato => contato.id == identificador);

    if (contato) {
      setId(contato.id);
      setNome(contato.nome);
      setCodigo(contato.codigo);
      setTEmail(contato.email);
      setSenha(contato.senha);
    }

    console.log(contato);
  }


  async function limparCampos() {
    setNome("");
    setCodigo("");
    setTEmail("");
    setSenha("");
    setId(undefined);
    Keyboard.dismiss();
  }

  function apagarTudo() {
    if (Alert.alert('Muita atenção!!!', 'Confirma a exclusão de todos os contatos?',
      [
        {
          text: 'Sim, confirmo!',
          onPress: async() => {
            await dbservice.excluiContatos();
            await carregaDados();
          }
        },
        {
          text: 'Não!!!',
          style: 'cancel'
        }
      ]));
  }


  function removerElemento(identificador) {
    console.log(identificador)
    Alert.alert('Atenção', 'Confirma a remoção do contato?',
      [
        {
          text: 'Sim',
          onPress: () => efetivaRemoverContato(identificador),
        },
        {
          text: 'Não',
          style: 'cancel',
        }
      ]);
  }

  async function efetivaRemoverContato(identificador) {
    try {
      await dbservice.excluiContato(identificador);
      Keyboard.dismiss();
      Alert.alert('Contato apagado com sucesso!!!');
      limparCampos();
      await carregaDados();
    } catch (e) {
      Alert.alert(e.toString());
    }
  }


  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 25, color: '#FFF', backgroundColor: 'red', width: '100%', textAlign: 'center' }}>Exercício de contatos</Text>
      <Text /><Text />

      <View style={styles.areaDados}>

        <View style={styles.areaMaior}>
          <Text>Código</Text>
          <TextInput style={styles.caixaTexto}
            onChangeText={(texto) => setCodigo(texto)}
            value={codigo}
            keyboardType='phone-pad' />
        </View>

        <View style={styles.areaMenor}>
          <Text>Nome</Text>
          <TextInput style={styles.caixaTexto}
            onChangeText={(texto) => setNome(texto)}
            value={nome} />
        </View>
      </View>      

      <View style={styles.areaDados}>
        <View style={styles.areaMaior}>
          <Text>Email</Text>
          <TextInput style={styles.caixaTexto}
            onChangeText={(texto) => setTEmail(texto)}
            value={email}
            keyboardType='phone-pad' />
        </View>

        <View style={styles.areaMenor}>
          <Text>Senha</Text>
          <TextInput style={styles.caixaTexto}
            onChangeText={(texto) => setSenha(texto)}
            value={senha}
            secureTextEntry={true} />
        </View>
      </View>

      <View style={styles.areaBotoes}>
        <TouchableOpacity style={styles.botao} onPress={() => salvaDados()}>
          <Text style={styles.textoBotao}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botao} onPress={() => limparCampos()}>
          <Text style={styles.textoBotao}>Cancelar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botao, styles.botaoApagarTudo]} onPress={() => apagarTudo()}>
          <Text style={styles.textoBotao}>Apagar tudo</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.listaContatos}>
        {
          contatos.map((contato, index) => (
            <Contato index={index} contato={contato} editar={editar} removerElemento={removerElemento} />
          ))
        }
      </ScrollView>
      
    </View>    
  );
}