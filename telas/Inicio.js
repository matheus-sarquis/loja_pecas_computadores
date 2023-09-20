import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

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

function TelaInicial({ navigation }) {
    return (
        <View style={styles.container}>
            <CustomButton
                title="Cadastrar categoria"
                onPress={() => navigation.navigate('CadastroCategoria')}
                backgroundColor="gray"
            />
            <CustomButton
                title="Ver Lista das categoria"
                onPress={() => navigation.navigate('ListaCategorias')}
                backgroundColor="gray"
            />
            <CustomButton
                title="Cadastrar Produto"
                onPress={() => navigation.navigate('CadastroProduto')}
                backgroundColor="gray"
            />
            <CustomButton
                title="Ver Lista dos Produtos"
                onPress={() => navigation.navigate('ListaDeProdutos')}
                backgroundColor="gray"
            />
            <CustomButton
                title="Ver todas as Vendas"
                onPress={() => navigation.navigate('ListaDeVendas')}
                backgroundColor="gray"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: 200,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default TelaInicial;