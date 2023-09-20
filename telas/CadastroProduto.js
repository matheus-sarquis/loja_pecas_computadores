import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Produto from '../modelos/produto'
import { insertProdutos } from '../database/protudosDb';

const CadastroProdutoScreen = ({ navigation }) => {
    const [idCategoria, setIdCategoria] = useState('');
    const [nome, setNome] = useState('');
    const [valor, setValor] = useState('');

    const handleSalvarProduto = () => {
        if (!idCategoria || !nome || !valor) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const novoProduto = new Produto(null, idCategoria, nome, valor)

        insertProdutos(novoProduto);

        navigation.navigate('Inicial');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro de Produto</Text>
            <TextInput
                style={styles.input}
                placeholder="ID da Categoria"
                value={idCategoria}
                onChangeText={(text) => setIdCategoria(text)}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Nome do Produto"
                value={nome}
                onChangeText={(text) => setNome(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Valor do Produto"
                value={valor}
                onChangeText={(text) => setValor(text)}
                keyboardType="numeric"
            />
            <Button
                title="Cadastrar Produto"
                onPress={handleSalvarProduto}
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
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
});

export default CadastroProdutoScreen;
