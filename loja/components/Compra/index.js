import React from 'react';
import {TouchableOpacity, View, Text, TextInput} from 'react-native';
import styles from './styles';
import {Ionicons} from '@expo/vector-icons';

export default function Compra({index, produto, atualizaQuantidade}) {

    return (
        <View style={styles.produto} key={index.toString()}>
        <Text style={styles.listaProdutos}> {produto.descricao}</Text>
            <View style={styles.dadosListaProduto}>
                <Ionicons name="wallet-outline" style={styles.iconTelefone} size={25}></Ionicons>
                <Text style={styles.listaProdutos}>R$ {produto.preco} </Text>
            </View>

            <View style={styles.dadosBotoesAcao}>
                <TextInput style={styles.quantidade} 
                            value={produto.quantidade.toString()}
                            onChangeText={(texto) => atualizaQuantidade(produto.id, texto)}                            
                            keyboardType='phone-pad' />

                <TouchableOpacity onPress={() => atualizaQuantidade(produto.id, produto.quantidade + 1)}>
                    <Ionicons name="add-circle-outline" size={32} color="green" />
                </TouchableOpacity>
            </View>
        </View>
    );
}