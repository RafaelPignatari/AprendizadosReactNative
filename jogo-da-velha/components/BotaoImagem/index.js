import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import styles from '../../styles';
import azul from '../../assets/xAzul.png';
import vermelho from '../../assets/circuloVermelho.png';
import transparent from '../../assets/transparent.png';
import Cores from '../../enums/enumCores';

export default function BotaoImagem({index, action, pathImagem}) {
    function escolheImagem(){
        switch(pathImagem){
            case Cores.Vermelho:
                return vermelho;
            case Cores.Azul:
                return azul;
            default:
                return transparent;
        }
    }

    return (
        <TouchableOpacity onPress={() => action(index)}>
            <Image title='' style={styles.botoesJogo} source={escolheImagem()}/>
        </TouchableOpacity>
    );
}