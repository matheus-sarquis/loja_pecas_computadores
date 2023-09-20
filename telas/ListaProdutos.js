import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { getProdutos, deleteProdutos } from '../database/protudosDb';
import { useNavigation } from '@react-navigation/native';

const TelaListaProdutos = () => {
    const [produtos, setProdutos] = useState([]);
    const [carrinho, setCarrinho] = useState([]);

    const navigation = useNavigation();

    useEffect(() => {
        const fetchProdutos = async () => {
            const produtosData = await getProdutos();
            setProdutos(produtosData);
        };

        fetchProdutos();
    }, []);

    const handleEditarProduto = (produto) => {
        navigation.navigate('EditarProdutos', { produto: produto });
    };

    const handleExcluirProduto = async (id) => {
        await deleteProdutos(id);
        const updatedProdutos = produtos.filter((produto) => produto.id !== id);
        setProdutos(updatedProdutos);
    };

    const handleAdicionarAoCarrinho = (produto) => {
        const produtoNoCarrinho = carrinho.find((item) => item.id === produto.id);

        if (produtoNoCarrinho) {
            setCarrinho((prevState) =>
                prevState.map((item) =>
                    item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
                )
            );
        } else {
            setCarrinho((prevState) => [...prevState, { ...produto, quantidade: 1 }]);
        }
    };

    const handleIrParaCarrinho = () => {
        navigation.navigate('Carrinho', { cart: carrinho, removeItem: removeItem });
    };

    const removeItem = (itemToRemove, cartRemove) => {
        const novoCarrinho = [...cartRemove];

        for (let i = 0; i < novoCarrinho.length; i++) {
            if (novoCarrinho[i].id === itemToRemove.id) {
                if (novoCarrinho[i].quantity > 1) {
                    novoCarrinho[i].quantity -= 1;
                } else {
                    novoCarrinho.splice(i, 1);
                }
                break;
            }
        }

        setCarrinho(novoCarrinho);
        navigation.navigate('Carrinho', { cart: novoCarrinho, removeItem: removeItem });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Produtos</Text>
            <FlatList
                data={produtos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.produtoItem}>
                        <Text>ID: {item.id}</Text>
                        <Text>ID da Categoria: {item.categoriaId}</Text>
                        <Text>Nome: {item.nome}</Text>
                        <Text>Preço: R${item.valor}</Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleEditarProduto(item)}
                        >
                            <Text>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleExcluirProduto(item.id)}
                        >
                            <Text>Excluir</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleAdicionarAoCarrinho(item)}
                        >
                            <Text>Adicionar ao Carrinho</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity
                style={styles.botaoCarrinho}
                onPress={handleIrParaCarrinho}
            >
                <Text style={styles.botaoCarrinhoText}>Ir para o Carrinho</Text>
            </TouchableOpacity>
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
    produtoItem: {
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

export default TelaListaProdutos;
