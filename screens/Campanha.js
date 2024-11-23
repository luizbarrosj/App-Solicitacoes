import React from 'react';
import { Text, TextInput, StyleSheet, TouchableOpacity, View, Alert, Image, Button } from 'react-native';
import { Block } from 'galio-framework';
import { materialTheme } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api';

import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';

export default class Campanha extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comentario: '', // Texto do comentário
      errorMessage: '', // Mensagem de erro
      imageUri: null, // URI da imagem selecionada
      idenfidicado: 'Sim',
    };
  }

  // Função para selecionar a imagem
  pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Correção para MediaTypeOptions
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        this.setState({ imageUri: result.assets[0].uri }); // Obtendo a URI da imagem
      }
    } catch (error) {
      console.error("Erro ao selecionar imagem:", error);
    }
  };

  handleSubmit = async () => {
    const { comentario, idenfidicado, imageUri } = this.state;
    const { product } = this.props.route.params; // Acessa o product

    if (!comentario) {
      this.setState({ errorMessage: 'Digite um comentário.' });
      return;
    }

    try {
      this.setState({ errorMessage: '' });
      const userData = await AsyncStorage.getItem('user');
      const user = JSON.parse(userData).userData;


console.log(idenfidicado === 'Não' ? 0 : user.id);

      const voto = {
        campanha: product.title,
        descricao: comentario,
        idusuario: idenfidicado === 'Não' ? 0 : user.id,
        imagem: imageUri, // Enviando a imagem junto (se necessário)
      };

      const { data, status } = await api.post('/votos/', voto);

      if (status === 200 || status === 201) {
        Alert.alert('Formulário enviado com sucesso!');

        if (imageUri) {
          const formData = new FormData();

          // Criação do arquivo com os detalhes corretos
          const file = {
            uri: imageUri,
            name: imageUri.split('/').pop(), // Obtendo o nome do arquivo a partir da URI
            type: 'image/jpeg', // Altere para 'image/png' se necessário
          };

          formData.append("file", file);

          try {
            // Enviando o formulário com a imagem
            const uploadResponse = await api.post(`/votos/${data.id}/media-upload`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data', // Configuração correta para uploads
              },
            });

            // Verifica o status da resposta
            if (uploadResponse.status === 200) {
              Alert.alert('Imagem enviada com sucesso!');
            } else {
              Alert.alert('Erro ao enviar a imagem. Status:', uploadResponse.status.toString());
            }
          } catch (uploadError) {
            console.error('Erro no upload da imagem:', uploadError);
            Alert.alert('Erro no upload da imagem', uploadError.message);
          }
        }


      } else {
        Alert.alert('Formulário não enviado!');
      }

      this.setState({
        comentario: '',
        errorMessage: '',
        imageUri: null,
        idenfidicado: '',
      });

      this.props.navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Erro ao enviar formulário', error.message);
    }
  };

  render() {
    const { comentario, idenfidicado, errorMessage, imageUri } = this.state;
    const { product } = this.props.route.params;

    return (
      <Block flex style={styles.container}>
        <Text style={styles.title}>Formulário de {product.title}</Text>

        {/* Mensagem de erro */}
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

        <Block>
          <Text style={styles.label}>Registre seu comentário sobre {product.title}:</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Escreva seu comentário aqui"
            multiline
            numberOfLines={5}
            value={comentario}
            onChangeText={(text) => this.setState({ comentario: text })}
          />
        </Block>

        {product.title == "Denuncia" && (
          <Block>
            <Text style={styles.label}>Deseja se identificar?:</Text>
            <Picker
              selectedValue={idenfidicado}
              style={styles.input}
              onValueChange={(itemValue) => this.setState({ idenfidicado: itemValue })}
            >
              <Picker.Item label="Sim" value="Sim" />
              <Picker.Item label="Não" value="Não" />

            </Picker>
          </Block>

        )}


        <Block style={styles.blockSpacing}>
          <Button title="Selecionar Imagem" onPress={this.pickImage} />
          {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
        </Block>

        <Block>
          <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  blockSpacing: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    height: 100,
  },
  button: {
    backgroundColor: materialTheme.COLORS.BUTTON_COLOR,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
  },
});
