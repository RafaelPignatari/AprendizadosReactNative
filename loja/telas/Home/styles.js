import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    titulo: {
        fontSize: 30,
        marginBottom: 50,
    },

    botaoTelaPrincipal: {
        width: '50%',
        margin: 10,
        backgroundColor: '#327fa8',
        bordercolor: '#000',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },

    labelBotao: {
        fontSize: 30,
        color: '#FFF',
        textAlign: 'center',
    },
});

export default styles;