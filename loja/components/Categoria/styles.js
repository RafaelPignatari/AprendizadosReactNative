import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    categoria: {
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

    listaCategoria: {
        width: '50%',
        fontSize: 18,
        paddingRight: 10,
    },

    dadosBotoesAcao: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        width: '40%',
    },
});


export default styles;