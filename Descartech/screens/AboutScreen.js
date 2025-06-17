import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

export default function AboutScreen() {
  return (
    <ImageBackground source={require('../assets/background.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Sobre Nós</Text>
        <Text style={styles.description}>
          Este aplicativo tem como missão auxiliar o descarte consciente de lixo eletrônico,
          promovendo práticas sustentáveis e a economia circular.
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  description: {
    textAlign: 'justify',
    color: 'white',
    fontSize: 16,
  },
});
