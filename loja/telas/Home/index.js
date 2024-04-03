import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import {Text, View, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import { criaTabelas, insereValoresDefault } from '../../services/dbservice';
import { obtemTodasCategorias } from '../../services/dbCategoriaService';

export default function Home({ navigation }) {
  async function processamentoUseEffect() {
    try {
      await criaTabelas();
    }
    catch (e) {
      console.log(e.toString());
    }
  }

  async function insereValoresNoBanco() {
    try {
      // Verifica se já existem registros no banco
      let categorias = await obtemTodasCategorias();

      if (categorias.length <= 0) {
        await insereValoresDefault();
        Alert.alert('Valores padrão inseridos com sucesso!');
      }
      else if (Alert.alert('Atenção', 'O seu banco parece já ter registros. Tem certeza que deseja adicionar valores padrão?',
      [
        {
          text: 'Sim, confirmo!',
          onPress: async() => {
              await insereValoresDefault();
              Alert.alert('Valores padrão inseridos com sucesso!');
          }
        },
        {
          text: 'Não!'
        }
      ]));
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
          style={styles.botaoTelaPrincipal}
          onPress={()=>{navigation.navigate('CadCompra')}}>
        <Text style={styles.labelBotao}>Comprar Produtos</Text>
      </TouchableOpacity>

      <TouchableOpacity
          style={styles.botaoTelaPrincipal}
          onPress={()=>{navigation.navigate('CadProduto')}}>
        <Text style={styles.labelBotao}>Adicionar Produtos</Text>
      </TouchableOpacity>

      <TouchableOpacity
          style={styles.botaoTelaPrincipal}
          onPress={()=>{navigation.navigate('CadCategoria')}}>
        <Text style={styles.labelBotao}>Adicionar Categorias</Text>
      </TouchableOpacity>

      <TouchableOpacity
          style={styles.botaoTelaPrincipal}
          onPress={()=>{navigation.navigate('VisVendas')}}>
        <Text style={styles.labelBotao}>Visualizar Vendas</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}


