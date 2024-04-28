import {createAppContainer, createSwitchNavigator } from 'react-navigation';
import ListaLanches from './telas/lanche/index';
import CadastroLanche from './telas/lanche/form';


const  Rotas = createAppContainer(
  createSwitchNavigator(
    {
      ListaLanches: ListaLanches,
      CadastroLanche: CadastroLanche
    }
  )
)

export default function App() {
  return (    
    <Rotas/>    
  );
}

