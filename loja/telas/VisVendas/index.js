import { Alert, ScrollView, Text, View, TouchableOpacity, Keyboard } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './styles';
import { useState, useEffect } from 'react';
import * as dbservice from '../../services/dbVendaService';
import { obtemTodasCategorias } from '../../services/dbCategoriaService';
import Venda from '../../components/Venda';
import Popup from '../../components/Popup';

export default function VisVendas({navigation}){
    const [vendas, setVendas] = useState([]);
    const [categoria, setCategoria] = useState();
    const [categorias, setCategorias] = useState([]);
    const [visible, setVisible] = useState(false);
    const [mensagem, setMensagem] = useState('oi!');

    useEffect(
        () => {
            carregaCategorias();
            carregaDados();
    }, []);

    const openPopup = () => {
      setVisible(true);
    }
    
    const closePopup = () => {
      setVisible(false);
    }

    function mostraDetalhes(mensagem) {
      openPopup();
      setMensagem(mensagem);
    }

    function trataDadosVenda(vendas) {
      let vendasTratadas = [];

      vendas.forEach(venda => {
        let vendaExistente = vendasTratadas.find(v => v.id === venda.id);

        if (vendaExistente) {
          vendaExistente.produtos.push(venda.produto);
          vendaExistente.preco.push(venda.preco);
          vendaExistente.quantidade.push(venda.quantidade);
        }
        else {
          vendasTratadas.push({
            id: venda.id,
            dataHora: venda.dataHora,
            produtos: [venda.produto],
            preco: [venda.preco],
            quantidade: [venda.quantidade]
          });
        }
      });

      console.log(vendasTratadas);
      setVendas(vendasTratadas);
    }
    
    async function carregaDados() {
        try {
            let vendas = await dbservice.obtemTodasVendas();
            
            trataDadosVenda(vendas);
        } catch (e) {
            console.log(e.toString());
            Alert.alert(e.toString());
        }
    }

    async function filtrarVendas(valor) {
        setCategoria(valor);

        if (valor == '') {
            let vendas = await dbservice.obtemTodasVendas();
        
            trataDadosVenda(vendas);
        }
        else {
            let vendas = await dbservice.obtemVendasPorCategoria(valor);
        
            trataDadosVenda(vendas); 
        }
    }
    
    async function limparCampos() {
        setCategoria('');

        Keyboard.dismiss();
    }

    async function carregaCategorias() {
        try {
            let categorias = await obtemTodasCategorias();
        
            if (categorias != null) {
                setCategorias(categorias);
            }
            else {
                setCategorias([]);
            }    
        } catch (e) {
            Alert.alert(e.toString());
        }
    }

    return (
        <View style={styles.container}>
        <Text style={{ fontSize: 25, color: '#FFF', backgroundColor: '#327fa8', width: '100%', textAlign: 'center' }}>Visualizar Vendas</Text>
  
        <View style={styles.areaDados}>  

          <View style={styles.areaMaior}>
            <Text>Categoria</Text>
            <Picker selectedValue={categoria}
                onValueChange={(itemValue, itemIndex) => filtrarVendas(itemValue)}
                style={styles.picker}>
                <Picker.Item label="Selecione..." value=""/>
                {categorias.map((item, index) => (
                    <Picker.Item key={index} label={item.descricao} value={item.id}/>
                ))}
            </Picker>
          </View>
        </View>

        <Popup
          visible={visible}
          transparent={true}
          dismiss={closePopup}
          margin={"25%"}
          mensagem={mensagem}>
            <View style={styles.popupContent}>
              <Text style={{fontSize: 18}}>{mensagem}</Text>
            </View>
          </Popup>

        <View style={styles.areaBotoes}>
          <TouchableOpacity style={styles.botao}>
            <Text style={styles.textoBotao}>Filtrar</Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.botao} onPress={() => limparCampos()}>
            <Text style={styles.textoBotao}>Cancelar</Text>
          </TouchableOpacity>
        </View>
  
        <ScrollView style={styles.listaCompras}>
          {
            vendas.map((venda, index) => (
              <Venda index={index} venda={venda} mostraDetalhes={mostraDetalhes} key={index.toString()} />
            ))
          }
        </ScrollView>

        <TouchableOpacity style={styles.botaoVoltar}
            onPress={() => navigation.navigate('Home')}>
            <Text style={styles.labelBotao}>Voltar</Text>
        </TouchableOpacity>
        
      </View>    
    );

}