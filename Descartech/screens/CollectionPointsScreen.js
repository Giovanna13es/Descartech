import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const pontos = [
  { nome: 'SAR DO BRASIL', endereco: 'R. Zioudu Benedito Romanini, 25 - Jardim Tres Marias, Taboão da Serra - SP, 06790-050 '},
  { nome: 'Ecoponto jardim Irapuã', endereco: 'R. José Milani, 275 - Jardim Irapua, Taboão da Serra - SP, 06766-420 ' },
  { nome: 'Ecoponto Jardim Maria do Carmo', endereco: 'R. Caminho do Engenho, 800 - Ferreira, São Paulo - SP, 05524-000' },
  { nome: 'RCRambiental ', endereco: 'R. Raphael de Marco, 300 - Parque Industrial das Oliveiras, Taboão da Serra - SP, 06765-350 ' },
  { nome: 'Ecoponto Olinda', endereco: 'R. Nelson Brissac, 1235 - Parque Regina, São Paulo - SP, 05778-180' },
];

export default function CollectionPointsScreen() {
  return (
    <ImageBackground source={require('../assets/background.jpg')} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Pontos de Coleta</Text>
        {pontos.map((ponto, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.row}>
              <Ionicons name="location-sharp" size={20} color="#2F4F2F" style={styles.icon} />
              <Text style={styles.name}>{ponto.nome}</Text>
            </View>
            <Text style={styles.info}>
              <Ionicons name="map-outline" size={14} color="#2F4F2F" /> {ponto.endereco}
            </Text>
            
          </View>
        ))}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 80, // Afastamento do topo
    paddingBottom: 60,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'rgba(188, 245, 169, 0.85)',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    width: '100%',
    maxWidth: 350,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    marginRight: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F4F2F',
  },
  info: {
    fontSize: 14,
    color: '#2F4F2F',
    marginBottom: 4,
    marginLeft: 2,
  },
});
