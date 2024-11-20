import React from 'react';
import { ImageBackground, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';

const { height, width } = Dimensions.get('screen');

import materialTheme from '../constants/Theme';
import Images from '../constants/Images';

export default class Onboarding extends React.Component {
  render() {
    const { navigation } = this.props;

    return (
      <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Block flex center>
          <ImageBackground
            source={require('../assets/images/splash.png')}
            style={{ height: height, width: width, marginTop: '-12%', zIndex: 1 }}
          />
        </Block>
        <Block flex space="between" style={styles.padded}>
  <Block flex space="around" style={{ zIndex: 2 }}>
    <Block>
      <Block>
        <Text color="black" bold size={60}>Funorte</Text>
      </Block>

      {/* Espaço entre as linhas */}
      <Block style={{ height: 10 }} />

      <Block row>
        <Text color="black" bold size={60}>IntraNet</Text>
      </Block>
      
      <Text size={16} color='rgba(255,255,255,0.6)'>
        {/* Você pode adicionar conteúdo aqui, se necessário */}
      </Text>
    </Block>

            <Block center>
              <Button
                shadowless
                style={styles.button}
                color={materialTheme.COLORS.BUTTON_COLOR}
                onPress={() => navigation.navigate('App')}>
                Entre
              </Button>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: 'relative',
    bottom: theme.SIZES.BASE,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
});
