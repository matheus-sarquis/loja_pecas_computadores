import React, { useEffect, useState } from 'react';
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

const TelaCarrinho = ({ route, navigation }) => {
    const { cart, removeItem } = route.params;

    const handleRemoveItem = (item) => {
        removeItem(item, cart);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={cart}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.productItem}>
                        <Text>Nome: {item.nome}</Text>
                        <Text>Preço: R${item.valor}</Text>
                        <Text>Id da Categoria: {item.categoriaId}</Text>
                        <Text>Quantidade: {item.quantidade}</Text>
                        <CustomButton
                            title="Remover"
                            onPress={() => handleRemoveItem(item)}
                            backgroundColor="red" // Cor de fundo personalizada
                        />
                    </View>
                )}
            />
            <CustomButton
                title="Finalizar Compra"
                onPress={() => navigation.navigate('Checkout', { cart: cart, })}
                backgroundColor="green" // Cor de fundo personalizada
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    productItem: {
        marginBottom: 10,
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

export default TelaCarrinho;