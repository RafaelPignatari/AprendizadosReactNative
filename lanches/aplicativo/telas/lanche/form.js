import {
  Alert, Text, TextInput, TouchableOpacity, View, ScrollView,
  ActivityIndicator
} from 'react-native';
import { useState, useEffect } from 'react';
import styles from './styles';
import Header from '../../componentes/Header';
import DateTimeInput from '../../componentes/DateTimeInput';
import api from '../../service/api';
import { format } from 'date-fns';
import { Picker } from '@react-native-picker/picker'
import * as Utils from '../../utils/utils';

export default function CadastroLanche({ navigation }) {

  let props = navigation.state.params;
  let inclusao = props.inclusao;
  let lanche = props.pessoa;

  const [id, setId] = useState(lanche && lanche.id.toString());
  const [codigoAluno, setCodigoAluno] = useState(lanche && lanche.codigoAluno);
  const [quantidade, setQuantidade] = useState((lanche && lanche.quantidade) || '');
  const [dataLanche, setDataLanche] = useState((lanche && new Date(lanche.data)) || new Date());  // useState(new Date())
  const [alunos, setAlunos] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(
    () => {
      console.log('processando useEffect');
      console.log(alunos);
      carregamentosUseEffect();
    }, []
  );

  async function carregamentosUseEffect() {
    setLoad(true);

    if (inclusao)
      await carregaProximoId();
    await carregaAlunos();

    setLoad(false);
  }

  async function carregaAlunos() {
    try {
      if (alunos.length == 0) {
        console.log('Carregando alunos...');
        let resposta = await api.get('/aluno/filter/getAll');
        setAlunos(resposta.data);
        console.log(`Carregado ${resposta.data.length} aluno(s)...`);
      }
    }
    catch (e) {
      Alert.alert(e.toString());
    }
  }

  async function carregaProximoId() {
    try {
      let resposta = await api.get('/lanche/filter/getNextId');
      console.log(resposta.data);
      Utils.sleep(1000);  // só para ver o efeito do loading
      setId(resposta.data.toString());
    }
    catch (e) {
      Alert.alert(e.toString());
    }
  }

  async function salva() {
    let dataHora = format(dataLanche, 'yyyy-MM-dd') + 'T00:00';

    let objLanche = {
      id,
      codigoAluno,
      data: dataHora,
      quantidade,
    };

    console.log('Salvando objeto', objLanche);

    if (inclusao) {
      await api.post('/Lanche', objLanche)
        .then(() => navigation.navigate('ListaPessoas'))
        .catch(error => trataErroAPI(error));
    }
    else {
      await api.put('/Lanche/' + id, objLanche)
        .then(() => navigation.navigate('ListaPessoas'))
        .catch(error => trataErroAPI(error));
    }
  }

  function trataErroAPI(error) {
    if (error.response && error.response.data && error.response.data.erro) {
      Alert.alert(error.response.data.erro);
    }
    else {
      Alert.alert(error.toString());
    }
  }

  return (
    <View style={styles.container}>
      <Header exibeIconeNovoRegistro={false} />
      {
        load
          ?
          <ActivityIndicator size="large" color="#00ff00" style={styles.waiting} />
          :
          <ScrollView style={styles.areaScroolViewForm}>
            <Text style={styles.labelCampoEdicao}>Id</Text>
            <TextInput style={styles.caixaTexto}
              keyboardType={'number-pad'}
              onChangeText={(texto) => setId(texto)}
              value={id}
              editable={inclusao}
            />

            <Text style={styles.labelCampoEdicao}>Código do Aluno  </Text>
            <Picker
              selectedValue={codigoAluno}
              onValueChange={(itemValue, itemIndex) => setCodigoAluno(itemValue)}
              dropdownIconColor={'#038a27'}
              prompt='Selecione o aluno...'>
              {alunos.length > 0 &&
               alunos.map((item, index) => (
                  <Picker.Item key={index} label={item.codigoAluno.toString()} value={item.codigoAluno}/>
              ))}
            </Picker>

            <Text style={styles.labelCampoEdicao}>Quantidade de lanches</Text>
            <TextInput style={styles.caixaTexto} keyboardType={'number-pad'}
                       onChangeText={(texto) => setQuantidade(texto)}
                       value={quantidade.toString()} />

            <Text style={styles.labelCampoEdicao}>Data do Lanche</Text>
            <DateTimeInput type={'date'} onSave={setDataLanche} theDate={dataLanche} />

            <View style={styles.areaBotoes}>

              <TouchableOpacity style={styles.botaoCancela} onPress={() => navigation.navigate('ListaLanches')}>
                <Text style={styles.textoBotao}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.botao} onPress={() => salva()}>
                <Text style={styles.textoBotao}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
      }

    </View >
  );
}