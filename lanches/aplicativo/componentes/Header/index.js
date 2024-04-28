import {
    Text, TouchableOpacity, View, Image
} from 'react-native';

import styles from './styles';
import addicon from '../../assets/plus.png';

export default function Header({ metodoAdd, exibeIconeNovoRegistro }) {
    return (
        <View style={styles.containerHeader}>
            <Text style={styles.tituloHeader}>Cadastro de Lanches</Text>
            {
                exibeIconeNovoRegistro &&
                <TouchableOpacity style={styles.botaoAdd} onPress={() => metodoAdd()}>
                    <View style={styles.cirtuloBotao}>
                        <Image source={addicon} />
                    </View>
                </TouchableOpacity>
            }
        </View>
    );
}