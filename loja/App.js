import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './telas/Home/index';
import CadCompra from './telas/CadCompra/index';
import CadProduto from './telas/CadProduto/index';
import CadCategoria from './telas/CadCategoria/index';
import VisVendas from './telas/VisVendas/index';
import Carrinho from './telas/Carrinho/index';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false, animation: 'fade' }} />
      <Stack.Screen name="CadCompra" component={CadCompra} options={{ headerShown: false, animation: 'fade' }} />
      <Stack.Screen name="CadProduto" component={CadProduto} options={{ headerShown: false, animation: 'fade'}} />
      <Stack.Screen name="CadCategoria" component={CadCategoria} options={{ headerShown: false, animation: 'fade' }} />
      <Stack.Screen name="VisVendas" component={VisVendas} options={{ headerShown: false, animation: 'fade'}} />
      <Stack.Screen name="Carrinho" component={Carrinho} options={{ headerShown: false, animation: 'fade' }} />

    </Stack.Navigator>
  </NavigationContainer>
  );
}