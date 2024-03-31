import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import styles from './styles';
import {Ionicons, Entypo} from '@expo/vector-icons';

export default function Produto({index, produto, editar, removerElemento}) {
    return (
        <View style={styles.produto} key={index.toString()}>
        <Text style={styles.listaProdutos}> {produto.descricao}</Text>
            <View style={styles.dadosListaProduto}>
                <Ionicons name="wallet-outline" style={styles.iconTelefone} size={25}></Ionicons>
                <Text style={styles.listaProdutos}>R$ {produto.preco} </Text>
            </View>

            <View style={styles.dadosBotoesAcao}>
                <TouchableOpacity onPress={() => removerElemento(produto.id)}>
                    <Ionicons name="close-circle-outline" size={32} color="red" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => editar(produto.id)}>
                    <Entypo name="edit" size={32} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
}