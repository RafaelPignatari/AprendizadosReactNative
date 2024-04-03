import { Alert, ScrollView, Text, View, TouchableOpacity, Keyboard } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './styles';
import { useState, useEffect } from 'react';
import { obtemTodosProdutos, obtemProdutosPorCategoria } from '../../services/dbProdutoService';
import { obtemTodasCategorias } from '../../services/dbCategoriaService';
import Compra from '../../components/Compra';
import { adicionaCarrinho } from '../../services/dbCarrinhoService';

export default function CadCompra({navigation}){
    const [categoria, setCategoria] = useState();
    const [produtos, setProdutos] = useState([]);
    const [produtosVenda, setProdutosVenda] = useState([]);  
    const [produtosVisualizacao, setProdutosVisualizacao] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [primeiraVez, setPrimeiraVez] = useState(true);

    useEffect(() => {            
        carregaDados();
    }, []);    
    
    async function carregaDados() {
        try {
            let produtosBanco = await obtemTodosProdutos();
        
            if (produtosBanco != null) {
                setProdutos([...produtosBanco]);
                atualizaProdutosVenda(produtosBanco);
            }
            else {
                setProdutos([]);
                setProdutosVenda([]);
            }    

            await carregaCategorias();
        } catch (e) {
            Alert.alert(e.toString());
        }
    }

    async function adicionaAoCarrinho() {
        try {
            let produtosAux = produtosVenda.filter(p => p.quantidade > 0);

            if (produtosAux.length != 0) {
                await adicionaCarrinho(produtosAux);
                Alert.alert('Produtos adicionados ao carrinho!');
            }
            else {
                Alert.alert('Nenhum produto selecionado!');
            }
        }
        catch (e) {
            console.log(e.toString());
            Alert.alert(e.toString());
        }
    }

    function atualizaProdutosVenda(produtosAux) {
        // Filtra os produtos que possuem quantidade maior que zero
        let produtosAux1 = produtosAux.filter(p => p.quantidade > 0);
        let copiaProdutosAux = JSON.parse(JSON.stringify(produtosAux1)); // Cria uma cópia dos itens e dos subitens, sem manter a referência dos objetos.
        
        copiaProdutosAux.forEach(p => {
            p.quantidade = 0;
        });

        if (!primeiraVez) {
            copiaProdutosAux.forEach(p => {
                let produtoEspecifico = produtosVenda.find(pv => pv.id == p.id);

                if (produtoEspecifico) {
                    p.quantidade = parseInt(produtoEspecifico.quantidade);
                }
            });
        }
        else {
            setProdutosVenda(copiaProdutosAux);
        }

        setPrimeiraVez(false);
        setProdutosVisualizacao(copiaProdutosAux);
    }
    
    function atualizaQuantidade(id, quantidade) {
        console.log(produtosVenda)
        try {
            var produtoVendaAux = [...produtosVenda]; // cria uma cópia do array
            var produtoVisAux = [...produtosVisualizacao]; // cria uma cópia do array

            if (produtos.find(p => p.id == id.toString()).quantidade < quantidade) {
                Alert.alert('Quantidade indisponível!');
                return;
            }

            produtoVendaAux.find(p => p.id == id).quantidade = quantidade;
            produtoVisAux.find(p => p.id == id).quantidade = quantidade;
        
            setProdutosVenda(produtoVendaAux); // atualiza o estado com a cópia modificada
            setProdutosVisualizacao(produtoVisAux); // atualiza o estado com a cópia modificada
        }
        catch (e) {
            console.log(e.toString());
            Alert.alert(e.toString());
        }
    }

    async function filtrarProdutos(valor) {
        setCategoria(valor);
        if (valor == '') {
            let produtosBanco = await obtemTodosProdutos();

            if (produtosBanco != null) {
                setProdutos(produtosBanco);
                atualizaProdutosVenda(produtosBanco);
            }
        }
        else {
            let produtosBanco = await obtemProdutosPorCategoria(valor);
        
            if (produtosBanco != null) {
                setProdutos([...produtosBanco]);
                atualizaProdutosVenda(produtosBanco);
            }        
        }
    }

    async function carregaCategorias() {
        try {
            let categoriasBanco = await obtemTodasCategorias();
        
            if (categoriasBanco != null) {
                setCategorias(categoriasBanco);
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
          <TouchableOpacity style={styles.botao} onPress={() => adicionaAoCarrinho()}>
            <Text style={styles.textoBotao}>Adicionar Carrinho</Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Carrinho')}>
            <Text style={styles.textoBotao}>Acessar carrinho</Text>
          </TouchableOpacity>
        </View>
  
        <ScrollView style={styles.listaCompras}>
          {
            produtosVisualizacao.map((produtoV, index) => (
              <Compra index={index} produto={produtoV} atualizaQuantidade={atualizaQuantidade} key={index.toString()} />
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