import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");

  function limpar() {
    setNome("");
    setTelefone("");
  }

  async function salvar() {
    let objContato = {
      nome: nome,
      telefone: telefone,
    };
    const stringJson = JSON.stringify(objContato);

    await AsyncStorage.setItem("@contato", stringJson);
    Alert.alert("Salvo com sucesso!!!");
  }

  async function carregar() {
    const conteudoJson = await AsyncStorage.getItem("@contato");
    console.log(conteudoJson);
    if (conteudoJson != null) {
      const objContato = JSON.parse(conteudoJson);
      setNome(objContato.nome);
      setTelefone(objContato.telefone);
    } else {
      Alert("Não há dados cadastrados!");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.tituloPrincipal}>Agenda de contatos</Text>

      <View style={styles.areaCadastro}>
        <View style={styles.areaNome}>
          <Text style={styles.legendaNome}>Nome</Text>
          <TextInput
            style={styles.campoNome}
            onChangeText={(text) => setNome(text)}
            value={nome}
          />
        </View>

        <View style={styles.areaTelefone}>
          <Text style={styles.legendaTelefone}>Telefone</Text>
          <TextInput
            keyboardType="phone-pad"
            style={styles.campoTelefone}
            onChangeText={(text) => setTelefone(text)}
            value={telefone}
          />
        </View>
      </View>

      <View style={styles.areaBotoes}>
        <TouchableOpacity style={styles.botaoSalvar} onPress={() => salvar()}>
          <Text style={styles.legendaBotao}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoLimpar} onPress={() => limpar()}>
          <Text style={styles.iconeLimpar}>🧹</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoCarregar}
          onPress={() => carregar()}
        >
          <Text style={styles.legendaBotao}>Carregar</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}
