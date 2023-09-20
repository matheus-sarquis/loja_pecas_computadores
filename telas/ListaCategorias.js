import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { getCategorias, deleteCategorias } from '../database/categoriaDb';
import { useNavigation } from '@react-navigation/native';

const TelaListaCategorias = () => {
    const [categorias, setCategorias] = useState([]);

    const navigation = useNavigation();

    useEffect(() => {
        const fetchCategorias = async () => {
            const categoriasData = await getCategorias();
            setCategorias(categoriasData);
        };

        fetchCategorias();
    }, []);

    const handleEditarCategoria = (categoria) => {
        navigation.navigate('EditarCategorias', { categoria: categoria });
    };

    const handleExcluirCategoria = async (id) => {
        await deleteCategorias(id);
        const updatedCategorias = categorias.filter((categoria) => categoria.id !== id);
        setCategorias(updatedCategorias);
    };

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
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleEditarCategoria(item)}
                        >
                            <Text>Editar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleExcluirCategoria(item.id)}
                        >
                            <Text>Excluir</Text>
                        </TouchableOpacity>
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
    button: {
        marginTop: 8,
        padding: 8,
        backgroundColor: 'lightblue',
        borderRadius: 5,
        alignItems: 'center',
    },
});

export default TelaListaCategorias;
