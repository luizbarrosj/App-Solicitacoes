import React from 'react';
import { Text, TextInput, StyleSheet, TouchableOpacity, View, Alert } from 'react-native';
import { Block } from 'galio-framework';

export default class Campanha extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      muitoBom: false,  // Estado do checkbox 'Muito Bom'
      ruim: false, 
      bom: false,     // Estado do checkbox 'Ruim'
      comentario: '',   // Texto do comentário
      errorMessage: '', // Mensagem de erro
    };
  }

  handleSubmit = () => {
    const { muitoBom,bom, ruim, comentario } = this.state;

    // Validação: ao menos um checkbox deve ser selecionado
    if (!muitoBom && !ruim && !bom) {
      this.setState({ errorMessage: 'Escolha uma avaliação.' });
      return;
    }

    // Se os campos estão preenchidos, limpa a mensagem de erro
    this.setState({ errorMessage: '' });

    // Envia os dados ou navega para outra tela
    console.log('Formulário enviado:', { muitoBom, ruim,bom, comentario });
    // Redirecionamento ou lógica de envio
    Alert.alert("Formulário enviado com sucesso!");
    this.setState ({
      muitoBom: false,  // Estado do checkbox 'Muito Bom'
      ruim: false, 
      bom: false,     // Estado do checkbox 'Ruim'
      comentario: '',   // Texto do comentário
      errorMessage: '',// Mensagem de erro
    })

    this.props.navigation.navigate('Home');
  };

  render() {
    const { muitoBom, ruim,bom, comentario, errorMessage } = this.state;

    return (
      <Block flex style={styles.container}>
        <Text style={styles.title}>Formulário de Avaliação</Text>

        {/* Mensagem de erro */}
        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

        {/* Avaliação - Checkboxes */}
        <Block>
          <Text style={styles.label}>Selecione uma das opções:</Text>
          <Block>
            {/* Checkbox para "Muito Bom" */}
            <TouchableOpacity
              style={[styles.checkbox, muitoBom && styles.checkboxSelected]}
              onPress={() => this.setState({ muitoBom: !muitoBom, ruim: false, bom: false })}
            >
              <Text style={styles.checkboxText}>Muito Bom</Text>
            </TouchableOpacity>

             {/* Checkbox para "Ruim" */}
             <TouchableOpacity
              style={[styles.checkbox, bom && styles.checkboxSelected]}
              onPress={() => this.setState({ bom: !bom, muitoBom: false, ruim: false })}
            >
              <Text style={styles.checkboxText}>Bom</Text>
            </TouchableOpacity>

            {/* Checkbox para "Ruim" */}
            <TouchableOpacity
              style={[styles.checkbox, ruim && styles.checkboxSelected]}
              onPress={() => this.setState({ ruim: !ruim, bom: false })}
            >
              <Text style={styles.checkboxText}>Ruim</Text>
            </TouchableOpacity>
          </Block>
        </Block>

        {/* Campo Comentário */}
        <Block>
          <Text style={styles.label}>Comentário (opcional):</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Escreva seu comentário aqui (máximo 5 linhas)"
            multiline={true}
            numberOfLines={5}
            value={comentario}
            onChangeText={(text) => this.setState({ comentario: text })}
          />
        </Block>

        {/* Botão de Enviar */}
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
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,  // Espaço entre as opções
  },
  checkboxText: {
    fontSize: 16,
    color: '#333',
  },
  checkboxSelected: {
    backgroundColor: '#4CAF50', // Cor de fundo quando selecionado
    borderRadius: 5,
    padding: 5,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    height: 100,  // Controle da altura do campo de texto
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
  error: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  }, 
});
