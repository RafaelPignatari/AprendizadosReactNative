import { StatusBar } from 'expo-status-bar';
import {Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';

export default function Home({ navigation }) {
  

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Choose your destiny</Text>

      <TouchableOpacity
             style={styles.botaoTela1}
             onPress={()=>{navigation.navigate('CadCompra')}}>
        <Text style={styles.labelBotao}>Comprar</Text>
      </TouchableOpacity>

      <TouchableOpacity
             style={styles.botaoTela1}
             onPress={()=>{navigation.navigate('CadProduto')}}>
        <Text style={styles.labelBotao}>Adicionar Produto</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}


