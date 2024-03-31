import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import styles from './styles';
import {Ionicons, Entypo} from '@expo/vector-icons';

export default function Categoria({index, categoria: categoria, editar, removerElemento}) {
    return (
        <View style={styles.categoria} key={index.toString()}>
        <Text style={styles.listaCategoria}> {categoria.descricao}</Text>

            <View style={styles.dadosBotoesAcao}>
                <TouchableOpacity onPress={() => removerElemento(categoria.id)}>
                    <Ionicons name="close-circle-outline" size={32} color="red" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => editar(categoria.id)}>
                    <Entypo name="edit" size={32} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}