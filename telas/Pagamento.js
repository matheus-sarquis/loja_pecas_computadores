import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { openDatabase } from 'expo-sqlite';

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

const TelaPagamento = ({ route, navigation }) => {
    const {productsSold, saleDate } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalhes da Compra</Text>
            <Text>Data da Venda: {saleDate}</Text>
            <Text>Produtos Vendidos:</Text>
            <FlatList
                data={productsSold}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.productItem}>
                        <Text>Nome: {item.name}</Text>
                        <Text>Quantidade: {item.quantity}</Text>
                        <Text>Preço Unitário: ${item.price}</Text>
                    </View>
                )}
            />
            <CustomButton
                title="Finalizar Compra"
                onPress={() => navigation.navigate('Checkout', {
                    saleCode: saleCode,
                    productsSold: productsSold,
                    saleDate: saleDate,
                })}
                backgroundColor="green" // Cor de fundo personalizada
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    productItem: {
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
