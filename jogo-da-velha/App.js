import { TouchableOpacity, ImageBackground, Text, View} from 'react-native';
import { useState, useEffect } from 'react';
import BotaoImagem from './components/BotaoImagem';
import fundo from './assets/fundo.png';
import styles from './styles';

export default function App() {
  const [tabuleiro, setTabuleiro] = useState(new Array(9));
  const [jogada, setJogada] = useState(0);
  const [escondeBotao, setEscondeBotao] = useState(true);

  const [campo0, setCampo0] = useState(100);
  const [campo1, setCampo1] = useState(100);
  const [campo2, setCampo2] = useState(100);
  const [campo3, setCampo3] = useState(100);
  const [campo4, setCampo4] = useState(100);
  const [campo5, setCampo5] = useState(100);
  const [campo6, setCampo6] = useState(100);
  const [campo7, setCampo7] = useState(100);
  const [campo8, setCampo8] = useState(100);  

  function atualizaCampo(index, valor) {
    switch(index){
      case 0:
        setCampo0(valor);
        break;
      case 1:
        setCampo1(valor);
        break;
      case 2:
        setCampo2(valor);
        break;
      case 3:
        setCampo3(valor);
        break;
      case 4:
        setCampo4(valor);
        break;
      case 5:
        setCampo5(valor);
        break;
      case 6:
        setCampo6(valor);
        break;
      case 7:
        setCampo7(valor);
        break;
      case 8:
        setCampo8(valor);
        break;
      default:
        break;
    }
  }

  function salvaTabuleiro(index, valor) {
    console.log(index + ' - ' + valor);
    let novoTabuleiro = [...tabuleiro]; //Cria uma cópia do tabuleiro
    novoTabuleiro[index] = valor;

    setTabuleiro(novoTabuleiro);
  }

  //Checa se os valores do tabuleiro formam uma linha, coluna ou diagonal
  function checaResultado() {
    const linhas = [
      [0, 1, 2], //primeira linha
      [3, 4, 5], //segunda linha
      [6, 7, 8], //terceira linha
      [0, 3, 6], //primeira coluna
      [1, 4, 7], //segunda coluna
      [2, 5, 8], //terceira coluna
      [0, 4, 8], //diagonal principal
      [2, 4, 6] //diagonal secundária
    ];
  
    for (let i = 0; i < linhas.length; i++) {
      const [a, b, c] = linhas[i];

      if (tabuleiro[a] !== undefined && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
        return tabuleiro[a];
      }
    }
  
    return null;
  }

  function trataJogada(index) {
    console.log('Botão pressionado: ' + index);

    if (tabuleiro[index] != undefined) {
      alert('Jogada inválida');
      return;
    }
    let valor = jogada % 2;

    salvaTabuleiro(index, valor);
    atualizaCampo(index, valor);

    setJogada(jogada + 1);
  }

  function jogarNovamente() {
    setEscondeBotao(false);
  }

  function resetaJogo() {
    setTabuleiro(new Array(9));
    setJogada(0);
    setEscondeBotao(true);

    setCampo0(100);
    setCampo1(100);
    setCampo2(100);
    setCampo3(100);
    setCampo4(100);
    setCampo5(100);
    setCampo6(100);
    setCampo7(100);
    setCampo8(100);
  }

  useEffect(() => {
    let resultado = checaResultado();

    if (resultado != null) {
      alert('Fim de jogo' + (resultado === 0 ? ' - Vermelho venceu' : ' - Azul venceu'));
      jogarNovamente();

      return;
    }

    if (jogada === 9) {
      alert('Fim de jogo - Empate');
      jogarNovamente();
      return;
    }
  }, [campo0, campo1, campo2, campo3, campo4, campo5, campo6, campo7, campo8]);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Jogo da Velha</Text>

      <ImageBackground source={fundo} style={styles.imagemFundo}>
        <View style={styles.horizontalView}>
          <BotaoImagem index={0} action={trataJogada} pathImagem={campo0}/>
          <BotaoImagem index={1} action={trataJogada} pathImagem={campo1}/>
          <BotaoImagem index={2} action={trataJogada} pathImagem={campo2}/>
        </View>
        <View style={styles.horizontalView}>
          <BotaoImagem index={3} action={trataJogada} pathImagem={campo3}/>
          <BotaoImagem index={4} action={trataJogada} pathImagem={campo4}/>
          <BotaoImagem index={5} action={trataJogada} pathImagem={campo5}/>
        </View>
        <View style={styles.horizontalView}>
          <BotaoImagem index={6} action={trataJogada} pathImagem={campo6}/>
          <BotaoImagem index={7} action={trataJogada} pathImagem={campo7}/>
          <BotaoImagem index={8} action={trataJogada} pathImagem={campo8}/>
        </View>
      </ImageBackground>

      {
        /* Botão para jogar novamente */
        !escondeBotao && (
          <TouchableOpacity onPress={resetaJogo} style={styles.botaoNovamente}>
            <Text style={styles.titulo}>Jogar Novamente</Text>
          </TouchableOpacity>
        )
      }
      
    </View>
  );
}