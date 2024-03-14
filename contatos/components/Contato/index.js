import React from 'react';
import {TouchableOpacity, Image, View, Text} from 'react-native';
import styles from '../../styles';
import {Ionicons, Entypo} from '@expo/vector-icons';

export default function Contato({index, contato, editar, removerElemento}) {
    return (
        <View style={styles.contato} key={index.toString()}>
        <Text style={styles.listaNome}> {contato.nome}</Text>
            <View style={styles.dadosListaTelefone}>
                <Ionicons name="mail-outline" style={styles.iconTelefone} size={25}></Ionicons>
                <Text style={styles.listaTelefone} >{contato.email} </Text>
            </View>

            <View style={styles.dadosBotoesAcao}>
                <TouchableOpacity onPress={() => removerElemento(contato.id)}>
                    <Ionicons name="close-circle-outline" size={32} color="red" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => editar(contato.id)}>
                    <Entypo name="edit" size={32} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
}