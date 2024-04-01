import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Home from './telas/Home/index';
import CadCompra from './telas/CadCompra/index';
import CadProduto from './telas/CadProduto/index';
import CadCategoria from './telas/CadCategoria/index';
import VisVendas from './telas/VisVendas/index';
import Carrinho from './telas/Carrinho/index';

const Routes = createAppContainer(
  createSwitchNavigator({
    Home,
    CadCompra,
    CadProduto,
    CadCategoria,
    VisVendas,
    Carrinho
  })
);

export default function App() {

  return (
      <Routes/>
  );
}