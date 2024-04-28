import {
    Text, TouchableOpacity, View
} from 'react-native';

import styles from './styles';
import { Ionicons, Entypo } from '@expo/vector-icons';
import {format} from 'date-fns';


export default function CardLanche({ lanche: lanche, remover, editar }) {
    
    return (
        <View style={[  styles.areaCard, styles.masculino ]} >

            <Text style={styles.areaNome} >{lanche.id} - Aluno: {lanche.codigoAluno}  </Text>
            <Text style={styles.areaData}> {format(new Date(lanche.data), 'dd/MM/yyyy')  }</Text>            

            <View style={styles.areaBotoesAcao}>
                <TouchableOpacity onPress={() => remover(lanche.id)}>
                    <Ionicons name="md-remove-circle" size={32} color="red" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => editar(lanche)}>
                    <Entypo name="edit" size={32} color="black" />
                </TouchableOpacity>

            </View>
        </View>
    );

};