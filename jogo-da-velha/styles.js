import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    imagemFundo: {
        width: 300,
        height: 300,
    },

    horizontalView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    botoesJogo: {
        width: 80,
        height: 90,
        margin: 5,
        //backgroundColor: 'black', // Para visualizar a área do botão
    },

    botaoNovamente: {
        margin: 10,
        padding: 10,
        borderWidth: 2,
        borderRadius: 15,
        backgroundColor: 'lightgray',
        //backgroundColor: 'black', // Para visualizar a área do botão
    }
});
  

  export default styles;