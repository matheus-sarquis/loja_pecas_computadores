import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getCategorias } from '../database/categoriaDb';

const TelaListaCategorias = () => {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const fetchCategorias = async () => {
            const categoriasData = await getCategorias();
            setCategorias(categoriasData);
        };

        fetchCategorias();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Lista de Categorias</Text>
            <FlatList
                data={categorias}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.categoriaItem}>
                        <Text>ID: {item.id}</Text>
                        <Text>Nome: {item.nome}</Text>
                    </View>
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
    categoriaItem: {
        marginBottom: 8,
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 8,
        borderRadius: 5,
    },
});

export default TelaListaCategorias;
