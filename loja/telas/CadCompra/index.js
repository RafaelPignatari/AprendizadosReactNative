import { Alert, ScrollView, Text, View, TouchableOpacity, Keyboard } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './styles';
import { useState, useEffect } from 'react';
import * as dbservice from '../../services/dbVendaService';
import { obtemTodosProdutos, obtemProdutosPorCategoria } from '../../services/dbProdutoService';
import { obtemTodasCategorias } from '../../services/dbCategoriaService';
import Compra from '../../components/Compra';

export default function CadCompra({navigation}){
    const [categoria, setCategoria] = useState();
    const [produtos, setProdutos] = useState([]);
    const [produtosVenda, setProdutosVenda] = useState([]);  
    const [categorias, setCategorias] = useState([]);

    useEffect(
        () => {
            carregaCategorias();
            carregaDados();
    }, []);
    
    async function efetuaCompra() {    
        try {    
            let produtosAux = produtosVenda.filter(p => p.quantidade > 0);
            console.log(produtosAux);
            await dbservice.adicionaVenda(produtosAux);
        
            Keyboard.dismiss();
            Alert.alert('Venda efetuada com sucesso!!!');
            limparCampos();
            carregaDados();
        } catch (e) {
            console.log(e.toString());
            Alert.alert(e.toString());
        }
    }
    
    async function carregaDados() {
        try {
            let produtos = await obtemTodosProdutos();
        
            if (produtos != null) {
                setProdutos(produtos);
                atualizaProdutosVenda(produtos, true);
            }
            else {
                setProdutos([]);
                setProdutosVenda([]);
            }    
        } catch (e) {
            Alert.alert(e.toString());
        }
    }

    function atualizaProdutosVenda(produtos, zeraQuantidade) {
        // Filtra os produtos que possuem quantidade maior que zero
        let produtosAux = produtos.filter(p => p.quantidade > 0);
        
        //Zera a quantidade (o cliente escolherá a quantidade na tela de venda)
        if (zeraQuantidade == true) {
            produtosAux.forEach(p => {
                p.quantidade = 0;
            });            
        }
        else {
            // Atualiza a quantidade de produtos
            produtosAux.forEach(p => {
                let produto = produtosVenda.find(pv => pv.id == p.id);

                if (produto) {
                    p.quantidade = produto.quantidade;
                }
            });        
        }

        setProdutosVenda(produtosAux);
    }
    
    function atualizaQuantidade(id, quantidade) {
        var produtoAux = [...produtosVenda]; // cria uma cópia do array

        produtoAux.find(p => p.id == id).quantidade = quantidade;
    
        setProdutosVenda(produtoAux); // atualiza o estado com a cópia modificada
    }

    async function filtrarProdutos(valor) {
        setCategoria(valor);
        if (valor == '') {
            let produtos = await obtemTodosProdutos();
        
            if (produtos != null) {
                setProdutos(produtos);
                atualizaProdutosVenda(produtos, false);
            }
        }
        else {
            let produtos = await obtemProdutosPorCategoria(valor);
        
            if (produtos != null) {
                setProdutos(produtos);
                atualizaProdutosVenda(produtos, false);
            }        
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
        <Text style={{ fontSize: 25, color: '#FFF', backgroundColor: '#327fa8', width: '100%', textAlign: 'center' }}>Comprar produtos</Text>
  
        <View style={styles.areaDados}>  

          <View style={styles.areaMaior}>
            <Text>Categoria</Text>
            <Picker selectedValue={categoria}
                onValueChange={(itemValue, itemIndex) => filtrarProdutos(itemValue)}
                style={styles.picker}>
                <Picker.Item label="Selecione..." value=""/>
                {categorias.map((item, index) => (
                    <Picker.Item key={index} label={item.descricao} value={item.id}/>
                ))}
            </Picker>

          </View>
        </View>

        <View style={styles.areaBotoes}>
          <TouchableOpacity style={styles.botao} onPress={() => efetuaCompra()}>
            <Text style={styles.textoBotao}>Comprar</Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.botao} onPress={() => limparCampos()}>
            <Text style={styles.textoBotao}>Cancelar</Text>
          </TouchableOpacity>
        </View>
  
        <ScrollView style={styles.listaCompras}>
          {
            produtosVenda.map((produto, index) => (
              <Compra index={index} produto={produto} atualizaQuantidade={atualizaQuantidade} key={index.toString()} />
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