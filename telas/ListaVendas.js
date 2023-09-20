import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { getVendas } from '../database/vendasDb';
import { getVendasItem } from '../database/vendasItemDb';

const TelaListaVendas = () => {
    const [vendas, setVendas] = useState([]);
    const [vendasItem, setVendasItem] = useState([]);

    useEffect(() => {
        const fetchVendas = async () => {
            const vendasData = await getVendas();
            setVendas(vendasData);
        };

        const fetchVendasItem = async () => {
            const vendasItemsData = await getVendasItem();
            setVendasItem(vendasItemsData);
        };

        fetchVendas();
        fetchVendasItem();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de vendas</Text>
            <FlatList
                data={vendas}
                keyExtractor={(venda) => venda.id.toString()}
                renderItem={({ item: venda }) => (
                    <TouchableOpacity style={styles.VendaItem}>
                        <Text>ID da Venda: {venda.id}</Text>
                        <Text>Data da Venda: {venda.data}</Text>
                        <FlatList
                            data={vendasItem}
                            keyExtractor={(vendaItem) => vendaItem.id.toString()}
                            renderItem={({ item: vendaItem }) => {
                                if (vendaItem.vendaId === venda.id) {
                                    return (
                                        <TouchableOpacity style={styles.VendaItem}>
                                            <Text>ID: {vendaItem.id}</Text>
                                            <Text>ID do Produto: {vendaItem.produtoId}</Text>
                                            <Text>Preço: R${vendaItem.valorVenda}</Text>
                                            <Text>Quantidade: {vendaItem.quantidade}</Text>
                                        </TouchableOpacity>
                                    );
                                } else {
                                    return null;
                                }
                            }}
                        />
                    </TouchableOpacity>
                )}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    Venda: {
        marginBottom: 8,
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 8,
        borderRadius: 5,
    },
    VendaItem: {
        fontSize: 15,
        marginBottom: 8,
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 8,
        borderRadius: 5,
    },
    button: {
        marginTop: 8,
        padding: 8,
        backgroundColor: 'lightblue',
        borderRadius: 5,
        alignItems: 'center',
    },
    carrinhoButton: {
        marginRight: 10,
    },
    carrinhoButtonText: {
        color: 'blue',
        fontSize: 16,
    },
    botaoCarrinho: {
        marginTop: 16,
        backgroundColor: 'blue',
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    botaoCarrinhoText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default TelaListaVendas;
