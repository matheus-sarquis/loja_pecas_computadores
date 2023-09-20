import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { updateCategorias } from '../database/categoriaDb';
import Categoria from '../modelos/categoria';

const TelaeditarCategoria = ({ route, navigation }) => {
    const { categoria } = route.params;

    const [novonome, setnovoNome] = useState(categoria.nome);

    const handleSalvarEdicao = async () => {
        if (!novonome) {
            alert('Por favor, preencha o nome.');
            return;
        }

        const novaCategoria = new Categoria(categoria.id, novonome)

        await updateCategorias(novaCategoria);

        navigation.navigate('Inicial');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Editar Categoria</Text>
            <TextInput
                style={styles.input}
                placeholder="Nome da Categoria"
                value={novonome}
                editable={true}
                onChangeText={setnovoNome}
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

export default TelaeditarCategoria;
