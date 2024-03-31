import { react } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';

export default function CadCompra({ navigation }) {
    return (
        <View style={styles.container}>

            <Text style={styles.titulo}>Compre os produtos desejados!</Text>


            
            <TouchableOpacity style={styles.botaoVoltar}
                onPress={() => navigation.navigate('Home')}>
                <Text style={styles.labelBotao}>Voltar</Text>
            </TouchableOpacity>

        </View>
    );
}