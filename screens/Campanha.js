import React from 'react';
import { Text, TextInput, StyleSheet, TouchableOpacity,Dimensions } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { Block } from 'galio-framework';

import { Button, Icon } from '../components';
import { Images, materialTheme } from '../constants';
import { HeaderHeight } from "../constants/utils";

const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

export default class Campanha extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: '',
      email: '',
      whatsapp: '',
      cargo: '', // opções: Acadêmico, Docente, Funcionário
      errorMessage: '', // Para armazenar mensagens de erro
    };
  }

  handleSubmit = () => {
    const { nome, email, whatsapp, cargo } = this.state;
    console.log('Formulário enviado:', { nome, email, whatsapp, cargo });
    // Adicione lógica para enviar os dados
const eleitor = {
  name: nome,
  email: email,
  whatsapp: whatsapp,
  cargo: cargo
}

if (!nome || !email || !whatsapp || !cargo) {

  console.log('Formulário nao enviado:', { nome, email, whatsapp, cargo });
   this.setState({ errorMessage: 'Todos os campos são obrigatórios.' });
  return; // Não envia os dados se algum campo obrigatório estiver vazio
}else{
// Se os campos estão preenchidos, limpa a mensagem de erro
this.setState({ errorMessage: '' });

// Envia os dados ou navega para outra tela
console.log('Formulário enviado:', { nome, email, whatsapp, cargo });

 // Resetar os campos
 this.setState({
  nome: '',
  email: '',
  whatsapp: '',
  cargo: '',
});

    this.props.navigation.navigate('Votar', { eleitor: eleitor })

}


  };

  render() {
    const { nome, email, whatsapp, cargo,errorMessage  } = this.state;

    return (
      <Block flex style={styles.container}>
        <Text style={styles.title}>Formulário de Cadastro</Text>
 {/* Mensagem de erro */}
 {errorMessage ? (
          <Text style={styles.error}>{errorMessage}</Text>
        ) : null}
        {/* Campo Nome */}
        <Block>
          <Text style={styles.label}>Nome:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            value={nome}
            onChangeText={(text) => this.setState({ nome: text })}
          />
        </Block>

        {/* Campo Email */}
        <Block>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => this.setState({ email: text })}
          />
        </Block>

        {/* Campo WhatsApp */}
        <Block>
          <Text style={styles.label}>WhatsApp:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu número de WhatsApp"
            keyboardType="phone-pad"
            value={whatsapp}
            onChangeText={(text) => this.setState({ whatsapp: text })}
          />
        </Block>

        {/* Campo Cargo */}
        <Block>
          <Text style={styles.label}>Cargo:</Text>
          <Picker
            selectedValue={cargo}
            style={styles.input}
            onValueChange={(itemValue) => this.setState({ cargo: itemValue })}
          >
            <Picker.Item label="Selecione o cargo" value="" />
            <Picker.Item label="Acadêmico" value="Acadêmico" />
            <Picker.Item label="Docente" value="Docente" />
            <Picker.Item label="Funcionário" value="Funcionário" />
          </Picker>
        </Block>

        {/* Botão de Enviar */}
        <Block>
          <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
            <Text style={styles.buttonText}>Continuar</Text>
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
  error: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
