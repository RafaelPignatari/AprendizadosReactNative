import {
    Alert, View, ScrollView, ActivityIndicator
} from 'react-native';
import { useState, useEffect } from 'react';
import styles from './styles';
import api from '../../service/api';
import CardLanche from '../../componentes/CardLanche';
import Header from '../../componentes/Header';
import * as Utils from '../../utils/utils';

export default function ListaLanches({ navigation }) {

    const [lista, setLista] = useState([]);
    const [load, setLoad] = useState(false);
    
    async function carregaLista() {
        try {
            setLoad(true);
            let resposta = (await api.get('/lanche/filter/getAll'));
            Utils.sleep(1000); // para dar tempo de ver o efeito de loading...
            setLista(resposta.data);
            setLoad(false);

        } catch (e) {
            Alert.alert(e.toString());
        }
    }

    useEffect(
        () => {
            console.log('executando useffect da listagem');
            carregaLista(); //necessário método pois aqui não pode utilizar await...
        }, []);

    function novoRegistro() {
        navigation.navigate('CadastroLanche', {
            inclusao: true,
        });
    }

    function editaRegistro(pessoa) {
        navigation.navigate('CadastroLanche', {
            pessoa, inclusao: false
        });
    }

    function removerElemento(id) {
        Alert.alert('Atenção', 'Confirma a remoção do lanche?',
            [
                {
                    text: 'Sim',
                    onPress: () => efetivaRemocao(id),
                },
                {
                    text: 'Não',
                    style: 'cancel',
                }
            ]);
    }

    async function efetivaRemocao(id) {
        try {
            api.delete('/Lanche/' + id).
                then(() => { carregaLista() });

        } catch (e) {
            Alert.alert(e.toString());
        }
    }

    return (
        <View style={styles.container}>
            <Header metodoAdd={novoRegistro} exibeIconeNovoRegistro={true} />
            <ScrollView style={styles.areaScroolView}>
                {
                    load
                        ?
                        <ActivityIndicator size="large" color="#00ff00" style={styles.waiting} />
                        :
                        lista.map((pessoa, index) => (
                            <CardLanche key={index.toString()} lanche={pessoa} editar={editaRegistro} remover={removerElemento} />
                        )
                        )
                }
            </ScrollView >
        </View>
    );
}

