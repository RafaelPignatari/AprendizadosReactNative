import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import {Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import { criaTabelas, insereValoresDefault } from '../../services/dbservice';

export default function Home({ navigation }) {
  async function processamentoUseEffect() {
    try {
      await criaTabelas();
      console.log(`Executou criaTabelas1`)
    }
    catch (e) {
      console.log(e.toString());
    }
  }

  async function insereValoresNoBanco() {
    try {
      await insereValoresDefault();
    }
    catch (e) {
      console.log(e.toString());
    }
  }

  useEffect(
    () => {
      processamentoUseEffect();
    }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Escolha seu destino</Text>
      <TouchableOpacity onPress={() => insereValoresNoBanco()}>
        <Text style={styles.textoBotao}>Insere Valores Default</Text>
      </TouchableOpacity>

      <TouchableOpacity
          style={styles.botaoTela1}
          onPress={()=>{navigation.navigate('CadCompra')}}>
        <Text style={styles.labelBotao}>Comprar</Text>
      </TouchableOpacity>

      <TouchableOpacity
          style={styles.botaoTela1}
          onPress={()=>{navigation.navigate('CadProduto')}}>
        <Text style={styles.labelBotao}>Adicionar Produtos</Text>
      </TouchableOpacity>

      <TouchableOpacity
          style={styles.botaoTela1}
          onPress={()=>{navigation.navigate('CadCategoria')}}>
        <Text style={styles.labelBotao}>Adicionar Categorias</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}


