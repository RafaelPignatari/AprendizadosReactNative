import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },

    caixaTexto: {
        borderColor: "#000",
        borderWidth: 2,
        height: 50,
        width: '100%',
        paddingHorizontal: 10,
        borderRadius: 10,
    },

    botao: {
        width: '30%',
        height: 50,
        borderColor: "#000",
        borderWidth: 2,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#040d59',
    },

    botaoApagarTudo: {
        backgroundColor: 'red',
    },

    areaDados: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },

    areaBotoes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 30,
    },

    textoBotao: {
        color: '#FFF',
    },

    areaMaior: {
        width: '55%',
    },

    areaMenor: {
        width: '30%',
    },

    listaContatos: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFF',
        marginTop: 20,
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