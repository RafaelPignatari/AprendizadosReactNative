import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  legendaNome: {
    fontSize: 21,
    fontWeight: "bold",
  },
  legendaTelefone: {
    fontSize: 21,
    fontWeight: "bold",
  },
  tituloPrincipal: {
    fontSize: 25,
    fontWeight: "bold",
    width: "90%",
    backgroundColor: "#196e50",
    padding: 5,
    height: 50,
    textAlign: "center",
    color: "#FFF",
    borderRadius: 5,
    marginBottom: 40,
  },
  campoNome: {
    fontSize: 18,
    width: '100%',
    height: 50,
    borderBottomWidth: 5,
    borderBottomColor: "#032b1d",
  },

  campoTelefone: {
    fontSize: 18,
    width: '100%',
    height: 50,
    borderBottomWidth: 5,
    borderBottomColor: "#032b1d",
  },
  botaoSalvar: {
    width: "40%",
    height: 50,
    borderRadius: 10,
    backgroundColor: "#164cb8",
    alignItems: "center",
    justifyContent: "center",
  },

  botaoCarregar: {
    width: "40%",
    height: 50,
    borderRadius: 10,
    backgroundColor: "#717785",
    alignItems: "center",
    justifyContent: "center",
  },
  legendaBotao: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#FFF",
  },

  areaBotoes: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },

  areaCadastro: {
    flexDirection: "row",
    width: "100%",    
    justifyContent: 'space-around',
  },
  areaNome:{
    width: '48%',    
    alignItems: 'center',
  },
  areaTelefone:{
    width: '48%',
    alignItems: 'center',
  },
  iconeLimpar:{
    fontSize: 40,
  }
});

export default styles;
