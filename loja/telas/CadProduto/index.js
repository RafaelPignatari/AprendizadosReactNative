import { Alert, ScrollView, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import styles from './styles';
import { useState, useEffect } from 'react';
import * as dbservice from '../../services/dbProdutoService';
import { obtemTodasCategorias } from '../../services/dbCategoriaService';
import Produto from '../../components/Produto';

export default function CadProduto({navigation}){
    const [id, setId] = useState();
    const [codigo, setCodigo] = useState();
    const [descricao, setDescricao] = useState();
    const [preco, setPreco] = useState();
    const [quantidade, setQuantidade] = useState();
    const [categoria, setCategoria] = useState();
    const [produtos, setProdutos] = useState([]);  
    const [categorias, setCategorias] = useState([]);

    useEffect(
        () => {
            console.log(categoria);
            carregaCategorias();
            carregaDados();
    }, []);

    function createUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).slice(0, 2);
    }
    
    async function salvaDados() {
        let novoRegistro = !id;
    
        let obj = {
            id: novoRegistro ? createUniqueId() : id,
            codigo: codigo,
            descricao: descricao,
            preco: preco,
            quantidade: quantidade,
            categoria: categoria
        };
    
        try {
    
            if (novoRegistro)
                await dbservice.adicionaProduto(obj); // inclusão
            else {
                await dbservice.alteraProduto(obj); // alteração
            }
        
            Keyboard.dismiss();
            Alert.alert('Dados salvos com sucesso!!!');
            limparCampos();
            carregaDados();
        } catch (e) {
            console.log(e.toString());
            Alert.alert(e.toString());
        }
    }
    
    async function carregaDados() {
        try {
            let produtos = await dbservice.obtemTodosProdutos();
            console.log(produtos)
        
            if (produtos != null) {
                setProdutos(produtos);
            }
            else {
                setProdutos([]);
            }    
        } catch (e) {
            Alert.alert(e.toString());
        }
    }
    
    function editar(identificador) {
        const produto = produtos.find(p => p.id == identificador);
    
        if (produto) {
            setId(produto.id);
            setCodigo(produto.codigo);
            setDescricao(produto.descricao);
            setPreco(produto.preco);
            setQuantidade(produto.quantidade);
            setCategoria(produto.categoria);
        }
    
        console.log(produto);
    }
    
    async function limparCampos() {
        setCodigo("");
        setDescricao("");
        setPreco("");
        setQuantidade("");
        setId(undefined);
        Keyboard.dismiss();
    }
    
    function apagarTudo() {
        if (Alert.alert('Muita atenção!!!', 'Confirma a exclusão de todos os produtos?',
        [
            {
                text: 'Sim, confirmo!',
                onPress: async() => {
                    await dbservice.excluiProdutos();
                    await carregaDados();
                }
            },
            {
                text: 'Não!!!',
                style: 'cancel'
            }
        ]));
    }
    
    function removerElemento(identificador) {
        console.log(identificador)
        Alert.alert('Atenção', 'Confirma a remoção do produto?',
        [
            {
                text: 'Sim',
                onPress: () => efetivaRemoverProduto(identificador),
            },
            {
                text: 'Não',
                style: 'cancel',
            }
        ]);
    }

    async function carregaCategorias() {
        try {
            let categorias = await obtemTodasCategorias();
            console.log(categorias)
        
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
    
    async function efetivaRemoverProduto(identificador) {
        try {
            await dbservice.excluiProduto(identificador);
            Keyboard.dismiss();
            Alert.alert('Produto apagado com sucesso!!!');
            limparCampos();
            await carregaDados();
        } catch (e) {
            Alert.alert(e.toString());
        }
    }

    return (
        <View style={styles.container}>
        <Text style={{ fontSize: 25, color: '#FFF', backgroundColor: '#327fa8', width: '100%', textAlign: 'center' }}>Adição de produtos</Text>
  
        <View style={styles.areaDados}>  
          <View style={styles.areaMenor}>
            <Text>Código</Text>
            <TextInput style={styles.caixaTexto}
              onChangeText={(texto) => setCodigo(texto)}
              value={codigo}
              keyboardType='phone-pad' />
          </View>
  
          <View style={styles.areaMaior}>
            <Text>Descrição</Text>
            <TextInput style={styles.caixaTexto}
              onChangeText={(texto) => setDescricao(texto)}
              value={descricao} />
          </View>
        </View>
        <View style={styles.areaDados}>  
          <View style={styles.areaPorTres}>
            <Text>Preço</Text>
            <TextInput style={styles.caixaTexto}
              onChangeText={(texto) => setPreco(texto)}
              value={preco}
              keyboardType='phone-pad' />
          </View>
  
          <View style={styles.areaPorTres}>
            <Text>Quantidade</Text>
            <TextInput style={styles.caixaTexto}
              onChangeText={(texto) => setQuantidade(texto)}
              value={quantidade}
              keyboardType='phone-pad' />
          </View>

          <View style={styles.areaPorTres}>
            <Text>Categoria</Text>
            <Picker selectedValue={categoria}
                onValueChange={(itemValue, itemIndex) => setCategoria(itemValue)}
                style={styles.picker}>
                <Picker.Item label="Selecione..." value=""/>
                {categorias.map((item, index) => (
                    <Picker.Item key={index} label={item.descricao} value={item.id}/>
                ))}
            </Picker>
          </View>
        </View>      

        <View style={styles.areaBotoes}>
          <TouchableOpacity style={styles.botao} onPress={() => salvaDados()}>
            <Text style={styles.textoBotao}>Salvar</Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.botao} onPress={() => limparCampos()}>
            <Text style={styles.textoBotao}>Cancelar</Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={[styles.botao, styles.botaoApagarTudo]} onPress={() => apagarTudo()}>
            <Text style={styles.textoBotao}>Apagar tudo</Text>
          </TouchableOpacity>
        </View>
  
        <ScrollView style={styles.listaContatos}>
          {
            produtos.map((produto, index) => (
              <Produto index={index} produto={produto} editar={editar} removerElemento={removerElemento} key={index.toString()} />
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