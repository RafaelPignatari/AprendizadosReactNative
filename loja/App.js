import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Home from './telas/Home/index';
import CadCompra from './telas/CadCompra/index';
import CadProduto from './telas/CadProduto/index';
import CadCategoria from './telas/CadCategoria/index';

const Routes = createAppContainer(
  createSwitchNavigator({
    Home,
    CadCompra,
    CadProduto,
    CadCategoria
  })
);

export default function App() {

  return (
      <Routes/>
  );
}