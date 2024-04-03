import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import styles from './styles';
import {Ionicons} from '@expo/vector-icons';

export default function Venda({index, venda, mostraDetalhes}) {

    function enviaSinalDetalhes() {
        let msg = '';

        for (let i = 0; i < venda.preco.length; i++) {
            msg += venda.produtos[i] + ' -\nR$ ' + venda.preco[i] + ' -\n' + venda.quantidade[i] + ' unidade(s) -\n';
            msg += 'Preço total: R$' + (parseFloat(venda.preco[i].replace(',', '.')) * parseInt(venda.quantidade[i])).toFixed(2) +'\n\n';
        }
        
        mostraDetalhes(msg);
    }

    function calculaValorTotal() {
        let valorTotal = 0;

        for (let i = 0; i < venda.preco.length; i++) {
            valorTotal += parseFloat(venda.preco[i].replace(',', '.')) * parseInt(venda.quantidade[i]);
        }

        return valorTotal.toFixed(2).toString().replace('.', ',');
    }

    return (
        <TouchableOpacity onPress={() => enviaSinalDetalhes()}>
            <View style={styles.produto} key={index.toString()} ontouch>
                <Text style={styles.listaProdutos}> {venda.dataHora}</Text>
                <View style={styles.dadosListaProduto}>
                    <Ionicons name="wallet-outline" size={25}></Ionicons>
                    <Text style={styles.preco}>R$ {calculaValorTotal()} </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}