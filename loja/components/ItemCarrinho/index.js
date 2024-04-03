import React from 'react';
import {TouchableOpacity, View, Text, TextInput} from 'react-native';
import styles from './styles';
import {Ionicons} from '@expo/vector-icons';

export default function ItemCarrinho({index, produto, atualizaQuantidade}) {

    return (
        <View style={styles.produto} key={index.toString()}>
        <Text style={styles.listaProdutos}> {produto.descricao}</Text>
            <View style={styles.dadosListaProduto}>
                <Ionicons name="wallet-outline" style={styles.iconTelefone} size={25}></Ionicons>
                <Text style={styles.valor}>R$ {produto.preco} </Text>
            </View>

            <Text>{produto.quantidade}</Text>

            <View style={styles.dadosBotoesAcao}>
                <TouchableOpacity onPress={() => atualizaQuantidade(produto.id, produto.quantidade + 1)}>
                    <Ionicons name="add-circle-outline" size={32} color="green" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => atualizaQuantidade(produto.id, produto.quantidade - 1)}>
                    <Ionicons name="remove-circle-outline" size={32} color="red" />
                </TouchableOpacity>
            </View>
        </View>
    );
}