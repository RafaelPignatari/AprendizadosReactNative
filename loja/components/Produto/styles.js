import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    produto: {
        backgroundColor: '#327fa8',
        flexDirection: 'row',
        height: 80,
        alignItems: 'center',
        margin: 10,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },

    dadosListaProduto: {
        width: '40%',
        flexDirection: 'row',
    },

    listaProdutos: {
        width: '40%',
        fontSize: 18,
        paddingRight: 10,
    },

    dadosBotoesAcao: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        width: '10%',
    },

    botaoVoltar: {
      width: 120,
      height: 60,
      marginTop: 20,
      marginBottom: 20,
      backgroundColor: '#00000f',
      justifyContent: 'center',
      alignItems: 'center'
    },

    labelBotao: {
      fontSize: 30,    
      color: '#FFF',
    },
});


export default styles;