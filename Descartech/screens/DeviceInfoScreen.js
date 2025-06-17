import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import MapView, { Marker } from 'react-native-maps';



export default function DeviceInfoScreen({ route }) {
  const { dispositivo } = route.params;

  return (
    <ImageBackground source={require('../assets/backgroud2.png')} style={styles.background}>
      <View style={styles.container}>

        {/* Cabeçalho com imagem e informações */}
        <View style={styles.header}>
          <Image source={{ uri: dispositivo.imagem }} style={styles.image} />
          <View style={styles.details}>
            <Text style={styles.name}>{dispositivo.nome}</Text>
            <Text style={styles.date}>Data de Compra: {dispositivo.dataCompra}</Text>
          </View>
        </View>

        {/* Vida útil */}
        <Text style={styles.sectionTitle}>Vida útil estimada:</Text>
        <Text style={styles.text}>{dispositivo.descricao}</Text>

        {/* Endereço do ponto de coleta */}
        <Text style={styles.sectionTitle}>Ponto de Coleta:</Text>
        <Text style={styles.text}>Rua Sustentável, 123 - São Paulo, SP</Text>

        {/* Mapa com marcador */}
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: -23.55052,
            longitude: -46.633308,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{
              latitude: -23.55052,
              longitude: -46.633308,
            }}
            title="Ponto de Coleta"
            description="Rua Sustentável, 123"
          />
        </MapView>
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
    padding: 20,
    paddingTop: 120,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: '#fff',
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  date: {
    fontSize: 16,
    color: '#ddd',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#BCF5A9',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  map: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginTop: 10,
  },
});
