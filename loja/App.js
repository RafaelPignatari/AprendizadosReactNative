import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { useState, useEffect } from 'react';
import Home from './telas/Home/index';
import CadCompra from './telas/CadCompra/index';
import CadProduto from './telas/CadProduto/index';
import { criaTabelas } from './telas/services/dbservice';

const Routes = createAppContainer(
  createSwitchNavigator({
    Home,
    CadCompra,
    CadProduto,
  })
);

export default function App() {
  async function processamentoUseEffect() {
    await criaTabelas();
    console.log(`Executou criaTabelas`)
  }

  useEffect(
    () => {
      processamentoUseEffect();
    }, []);

  return (
      <Routes/>
  );
}