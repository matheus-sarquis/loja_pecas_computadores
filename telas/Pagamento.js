import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Venda from '../modelos/venda';
import VendaItem from '../modelos/vendaItem';
import { insertVendasItem } from '../database/vendasItemDb';
import { insertVendas } from '../database/vendasDb';

function CustomButton({ title, onPress, backgroundColor }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, { backgroundColor }]}
        >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const calculaValorTotal = (cart) => {
    let valorFinal = 0;

    cart.forEach(element => {
        valorFinal += element.valor * element.quantidade;
    });

    return valorFinal;
};

const TelaPagamento = ({ route, navigation }) => {
    const { cart, saleDate } = route.params;

    const efetuarvenda = () => {
        const novaVenda = new Venda(null, saleDate)

        insertVendas(novaVenda).then(insertedId => {
            let iddaVenda = insertedId;
            cart.forEach(element => {
                const novaVendaItem = new VendaItem(null, iddaVenda, element.id, element.valor * element.quantidade, element.quantidade);
                insertVendasItem(novaVendaItem);
            });
        }).catch(error => {
            console.error('Erro ao inserir o registro:', error);
        });

        navigation.navigate('Inicial');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Detalhes da Compra</Text>
            <Text>Data da Venda: {saleDate}</Text>
            <Text>Valor Total: R${calculaValorTotal(cart)}</Text>
            <Text></Text>
            <Text style={styles.subtitulo}>Produtos Vendidos:</Text>
            <FlatList
                data={cart}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.cart}>
                        <Text>Nome: {item.nome}</Text>
                        <Text>Id da Categoria: {item.categoriaId}</Text>
                        <Text>Quantidade: {item.quantidade}</Text>
                        <Text>Preço Unitário: ${item.valor}</Text>
                    </View>
                )}
            />
            <CustomButton
                title="Finalizar Compra"
                onPress={efetuarvenda}
                backgroundColor="green"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    subtitulo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
    },
    container: {
        flex: 1,
        padding: 20,
    },
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    cart: {
        marginBottom: 10,
    },
    button: {
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: 200,
        borderRadius: 5,
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default TelaPagamento;
