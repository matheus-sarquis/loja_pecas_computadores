import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { updateProdutos } from '../database/protudosDb';
import Produto from '../modelos/produto';

const TelaEditarProduto = ({ route, navigation }) => {
    const { produto } = route.params;

    const [novoidCategoria, setInovodCategoria] = useState(produto.categoriaId.toString());
    const [novonome, setnovoNome] = useState(produto.nome);
    const [novovalor, setnovoValor] = useState(produto.valor.toString());

    const handleSalvarEdicao = async () => {
        if (!novoidCategoria || !novonome || !novovalor) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const novoProduto = new Produto(produto.id, novoidCategoria, novonome, novovalor)

        await updateProdutos(novoProduto);

        navigation.navigate('Inicial');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Editar Produto</Text>
            <Text>Nome do Produto</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome do Produto"
                value={novonome}
                editable={true}
                onChangeText={setnovoNome}
            />
            <Text>Id da Categoria</Text>
            <TextInput
                style={styles.input}
                placeholder="Id da Categoria"
                value={novoidCategoria}
                editable={true}
                onChangeText={setInovodCategoria}
            />
            <Text>Valor do Produto</Text>
            <TextInput
                style={styles.input}
                placeholder="Valor do Produto"
                value={novovalor}
                editable={true}
                onChangeText={setnovoValor}
            />
            <Button title="Salvar Edição" onPress={handleSalvarEdicao} />
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

export default TelaEditarProduto;
