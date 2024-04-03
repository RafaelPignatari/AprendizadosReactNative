import { Alert, ScrollView, Text, View, TouchableOpacity, Keyboard } from 'react-native';
import styles from './styles';
import { useState, useEffect } from 'react';
import * as dbservice from '../../services/dbVendaService';
import { apagaProdutoCarrinho, limpaCarrinho, obtemCarrinho } from '../../services/dbCarrinhoService';
import ItemCarrinho from '../../components/ItemCarrinho';
import { obtemTodosProdutos } from '../../services/dbProdutoService';

export default function CadCompra({navigation}){
    const [produtosVenda, setProdutosVenda] = useState([]); 
    const [produtosEstoque, setProdutosEstoque] = useState([]);
    const [valorTotal, setValorTotal] = useState('');

    useEffect(() => {
        carregaDados();            
    }, []);
    
    async function efetuaCompra() {    
        try {    
            let produtosAux = produtosVenda.filter(p => p.quantidade > 0);
            console.log(produtosAux);
            await dbservice.adicionaVenda(produtosAux);
        
            Keyboard.dismiss();
            Alert.alert('Venda efetuada com sucesso!!!');
            limparCarrinho();
        } catch (e) {
            console.log(e.toString());
            Alert.alert(e.toString());
        }
    }

    function atualizaQuantidade(id, quantidade) {
        if (quantidade <= 0) {
            if (Alert.alert('Atenção', 'Deseja remover o produto do carrinho?',
            [
                {
                    text: 'Sim, confirmo!',
                    onPress: async() => {
                        let produtoAux = [...produtosVenda]; // cria uma cópia do array
                        let novoArray = produtoAux.filter(p => p.id != id);
                        await apagaProdutoCarrinho(id);
                        setProdutosVenda(novoArray); // atualiza o estado com a cópia modificada
                    }
                },
                {
                    text: 'Não!'
                }
            ]));
        }
        else {
            try {
                var produtoVendaAux = [...produtosVenda]; // cria uma cópia do array

                if (produtosEstoque.find(p => p.id == id.toString()).quantidade < quantidade) {
                    Alert.alert('Quantidade indisponível!');
                    return;
                }

                produtoVendaAux.find(p => p.id == id).quantidade = quantidade;
            
                setProdutosVenda(produtoVendaAux); // atualiza o estado com a cópia modificada
            }
            catch (e) {
                console.log(e.toString());
                Alert.alert(e.toString());
            }
        }

        calculaValorTotal();
    }
    
    async function carregaDados() {
        try {
            let produtos = await obtemCarrinho();
            let produtosEstoque = await obtemTodosProdutos();
            
            if (produtos != null) {
                atualizaProdutosVenda(produtos);
                setProdutosEstoque(produtosEstoque);
            }
            else {
                setProdutosVenda([]);
            }    
        } catch (e) {
            Alert.alert(e.toString());
        }

        calculaValorTotal();
    }

    function atualizaProdutosVenda(produtos) {
        // Filtra os produtos que possuem quantidade maior que zero
        let produtosAux = produtos.filter(p => p.quantidade > 0);

        // Atualiza a quantidade de produtos
        produtosAux.forEach(p => {
            let produto = produtosVenda.find(pv => pv.id == p.id);

            if (produto) {
                p.quantidade = produto.quantidade;
            }
        });

        setProdutosVenda(produtosAux);
    }

    function calculaValorTotal() {
        // Filtra os produtos que possuem quantidade maior que zero
        let produtosAux = produtosVenda.filter(p => p.quantidade > 0);      
        let valorTotalAux = 0;

        // Atualiza a quantidade de produtos
        produtosAux.forEach(p => {
            valorTotalAux += parseFloat(p.preco.replace(',', '.')) * p.quantidade;
        });

        setValorTotal('R$ ' + valorTotalAux.toFixed(2).toString().replace('.', ','));
    }
    
    async function limparCarrinho() {
        limpaCarrinho();
        setProdutosVenda([]);
        Keyboard.dismiss();
    }

    return (
        <View style={styles.container}>
        <Text style={{ fontSize: 25, color: '#FFF', backgroundColor: '#327fa8', width: '100%', textAlign: 'center' }}>Carrinho de compras</Text>

        <View style={styles.areaBotoes}>
          <TouchableOpacity style={styles.botao} onPress={() => efetuaCompra()}>
            <Text style={styles.textoBotao}>Comprar</Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.botao} onPress={() => limparCarrinho()}>
            <Text style={styles.textoBotao}>Limpar Carrinho</Text>
          </TouchableOpacity>
        </View>
  
        <ScrollView style={styles.listaCompras}>
          {
            produtosVenda.map((produto, index) => (
              <ItemCarrinho index={index} produto={produto} atualizaQuantidade={atualizaQuantidade} key={index.toString()} />
            ))
          }
        </ScrollView>

        <Text style={{ fontSize: 25, color: '#FFF', backgroundColor: '#327fa8', width: '100%', textAlign: 'center' }}>Valor Total: {valorTotal}</Text>

        <TouchableOpacity style={styles.botaoVoltar}
            onPress={() => navigation.navigate('CadCompra')}>
            <Text style={styles.labelBotao}>Voltar</Text>
        </TouchableOpacity>
        
      </View>    
    );

}