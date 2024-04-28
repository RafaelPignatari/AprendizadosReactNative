import {
    Text, TouchableOpacity, View
} from 'react-native';

import styles from './styles';
import { Ionicons, Entypo } from '@expo/vector-icons';
import {format} from 'date-fns';


export default function CardPessoa({ pessoa, remover, editar }) {
    
    return (
        <View style={[  styles.areaCard, 
                        pessoa.sexo == 'F' && styles.feminino,
                        pessoa.sexo == 'M' && styles.masculino ]} >

            <Text style={styles.areaNome} >{pessoa.id} - {pessoa.nome}  </Text>
            <Text style={styles.areaData}> {format(new Date(pessoa.DataNascimento), 'dd/MM/yyyy')  }</Text>            

            <View style={styles.areaBotoesAcao}>
                <TouchableOpacity onPress={() => remover(pessoa.id)}>
                    <Ionicons name="md-remove-circle" size={32} color="red" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => editar(pessoa)}>
                    <Entypo name="edit" size={32} color="black" />
                </TouchableOpacity>

            </View>
        </View>
    );

};