import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import Categoria from '../modelos/categoria'
import { insertCategorias } from '../database/categoriaDb';


const CadastroCategoriaScreen = ({ navigation }) => {
    const [categoriaNome, setCategoriaNome] = useState('');

    const handleSalvarCategoria = () => {
        if (categoriaNome.trim() === '') {
            alert('Por favor, insira um nome de categoria válido.');
            return;
        }

        const novaCategoria = new Categoria(null, categoriaNome)

        insertCategorias(novaCategoria);

        navigation.navigate('Inicial');
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nome da Categoria"
                value={categoriaNome}
                onChangeText={(text) => setCategoriaNome(text)}
            />
            <Button
                title="Cadastrar Categoria"
                onPress={handleSalvarCategoria}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
});

export default CadastroCategoriaScreen;
