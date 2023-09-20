import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TelaInicial from './telas/Inicio';
import TelaListaProdutos from './telas/ListaProdutos';
import TelaCarrinho from './telas/Carrinho';
import TelaPagamento from './telas/Pagamento';
import TelaCadastroCategoria from './telas/CadastroCategoria';
import TelaListaCategorias from './telas/ListaCategorias';
import TelaCadastroProduto from './telas/CadastroProduto';
import TelaEditarProduto from './telas/EditarProduto';
import TelaEditarCategoria from './telas/EditarCategoria';
import TelaListaVendas from './telas/ListaVendas';

const Stack = createStackNavigator();

function Navigator() {
    const [cart, setCart] = useState([]);
    const [produto, setProduto] = useState([]);
    const [categoria, setCategoria] = useState([]);
    const [saleDate, setSaleDate] = useState([]);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Inicial">
                <Stack.Screen name="Inicial" component={TelaInicial} cart={cart} />
                <Stack.Screen name="ListaDeProdutos" component={TelaListaProdutos} cart={cart} produto={produto} />
                <Stack.Screen name="Carrinho" component={TelaCarrinho} cart={cart} />
                <Stack.Screen name="Pagamento" component={TelaPagamento} cart={cart} saleDate={saleDate} />
                <Stack.Screen name="CadastroCategoria" component={TelaCadastroCategoria} />
                <Stack.Screen name="CadastroProduto" component={TelaCadastroProduto} />
                <Stack.Screen name="ListaCategorias" component={TelaListaCategorias} />
                <Stack.Screen name="EditarProdutos" component={TelaEditarProduto} produto={produto} />
                <Stack.Screen name="EditarCategorias" component={TelaEditarCategoria} categoria={categoria} />
                <Stack.Screen name="ListaDeVendas" component={TelaListaVendas} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default Navigator;