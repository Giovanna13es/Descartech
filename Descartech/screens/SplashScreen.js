import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); // Vai para Login após 3 segundos e não volta para Splash
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ImageBackground
      source={ require('../assets/background.jpg')} // Coloque aqui a URL da sua imagem de background
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Image
          source={ require('../assets/logo.jpg')} // Seu logo
          style={styles.logo}
        />
        <Text style={styles.title}>DESCARTECH</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
