import { Alert, ScrollView, Text, View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import styles from './styles';
import { useState, useEffect } from 'react';
import * as dbservice from '../../services/dbCategoriaService';
import Categoria from '../../components/Categoria';

export default function CadCategoria({ navigation }) {

    const [id, setId] = useState();
    const [codigo, setCodigo] = useState();
    const [descricao, setDescricao] = useState();
    const [categorias, setCategorias] = useState([]);  

    useEffect(
        () => {
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
            descricao: descricao
        };
    
        try {
    
            if (novoRegistro)
                await dbservice.adicionaCategoria(obj); // inclusão
            else {
                await dbservice.alteraCategoria(obj); // alteração
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
            let categorias = await dbservice.obtemTodasCategorias();
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
    
    function editar(identificador) {
        const categoria = categorias.find(categoria => categoria.id == identificador);
    
        if (categoria) {
            setId(categoria.id);
            setCodigo(categoria.codigo);
            setDescricao(categoria.descricao);
        }
    
        console.log(categoria);
    }
    
    async function limparCampos() {
        setCodigo("");
        setDescricao("");
        setId(undefined);
        Keyboard.dismiss();
    }
    
    function apagarTudo() {
        if (Alert.alert('Muita atenção!!!', 'Confirma a exclusão de todas as categorias?',
        [
            {
                text: 'Sim, confirmo!',
                onPress: async() => {
                    await dbservice.excluiCategorias();
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
        Alert.alert('Atenção', 'Confirma a remoção da categoria?',
        [
            {
                text: 'Sim',
                onPress: () => efetivaRemoverCategoria(identificador),
            },
            {
                text: 'Não',
                style: 'cancel',
            }
        ]);
    }
    
    async function efetivaRemoverCategoria(identificador) {
        try {
            await dbservice.excluiCategoria(identificador);
            Keyboard.dismiss();
            Alert.alert('Categoria apagada com sucesso!!!');
            limparCampos();
            await carregaDados();
        } catch (e) {
            Alert.alert(e.toString());
        }
    }

    return (
        <View style={styles.container}>
        <Text style={{ fontSize: 25, color: '#FFF', backgroundColor: '#327fa8', width: '100%', textAlign: 'center' }}>Adição de categorias</Text>
  
        <View style={styles.areaDados}>
  
          <View style={styles.areaMaior}>
            <Text>Código</Text>
            <TextInput style={styles.caixaTexto}
              onChangeText={(texto) => setCodigo(texto)}
              value={codigo}
              keyboardType='phone-pad' />
          </View>
  
          <View style={styles.areaMenor}>
            <Text>Descrição</Text>
            <TextInput style={styles.caixaTexto}
              onChangeText={(texto) => setDescricao(texto)}
              value={descricao} />
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
  
        <ScrollView style={styles.listaCategorias}>
          {
            categorias.map((categoria, index) => (
              <Categoria index={index} categoria={categoria} editar={editar} removerElemento={removerElemento} key={index.toString()} />
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