import React, { useState } from 'react';
import {
  StyleSheet,
  StatusBar,
  Dimensions,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { Block, Text } from 'galio-framework';
import { Images, materialTheme } from "../constants/";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {api} from "../services/api";
import * as Crypto from 'expo-crypto'; 



const { height, width } = Dimensions.get('screen');

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // Verificar se o username e o password foram preenchidos
    if (username && password) {
     
      try {
        const hash = await Crypto.digestStringAsync(
          Crypto.CryptoDigestAlgorithm.SHA256,
          password
        );
        // Fazer a requisição para a API para verificar credenciais
        const { data,status  } = await api.post('/login/',{
          email: username,
          password: hash
        }); // Substitua com o endpoint correto
    
        if (status == 200) {
            await AsyncStorage.setItem('user', JSON.stringify(data));
  
          // Navegar para a próxima tela após autenticação bem-sucedida
          navigation.navigate('App');
        } else {
          Alert.alert('Erro', data.message || 'Credenciais inválidas!');
        }
      } catch (error) {
        if (error.response) {
          // O servidor retornou um erro HTTP
          const { status, data } = error.response;
          
          if (status === 404) {
            Alert.alert('Usuário ou senha inválidos!');
          } else {
            console.error('Erro no servidor:', data);
          }
        } else if (error.request) {
          // Nenhuma resposta foi recebida
          console.error('Erro na requisição:', error.request);
        } else {
          // Erro desconhecido
          console.error('Erro inesperado:', error.message);
        }
      }
    } else {
      Alert.alert('Atenção', 'Preencha os campos de usuário e senha!');
    }
  };

  const handleRegister = () => {
    // Adicione a lógica de autenticação aqui
    navigation.navigate('Cadastro');
  };

  return (
    <Block flex style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.form}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Usuário"
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
  },
  form: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    width: width * 0.85,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: materialTheme.COLORS.ACTIVE,
    width: '100%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
