import React, { useEffect, useState } from 'react';
import { 
  View, Text, StyleSheet, ImageBackground, FlatList, 
  TouchableOpacity, Image, Alert 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // ícone de lixeira

const API_URL = 'http://192.168.100.55:3000';

export default function DevicesListScreen({ navigation }) {
  const [dispositivos, setDispositivos] = useState([]);
  const [loading, setLoading] = useState(true);

  const usuario_id = 1; // substitua pelo seu userId ou contexto

  useEffect(() => {
    fetch(`${API_URL}/dispositivos/${usuario_id}`)
      .then(res => res.json())
      .then(data => {
        setDispositivos(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao buscar dispositivos:', error);
        setLoading(false);
      });
  }, []);

  const deletarDispositivo = (id) => {
    Alert.alert(
      'Excluir dispositivo',
      'Tem certeza que deseja excluir este dispositivo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            fetch(`${API_URL}/dispositivos/deletar/${id}`, {
              method: 'DELETE'
            })
              .then(res => res.json())
              .then(() => {
                setDispositivos(dispositivos.filter(d => d.id !== id));
              })
              .catch(error => {
                console.error('Erro ao deletar:', error);
              });
          }
        }
      ]
    );
  };

  return (
    <ImageBackground source={require('../assets/backgroud2.png')} style={styles.background}>
      <Text style={styles.title}>Meus Dispositivos</Text>
      {loading ? (
        <Text style={styles.loadingText}>Carregando...</Text>
      ) : (
        <FlatList
          data={dispositivos}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.deviceItem}>
              <TouchableOpacity
                style={styles.deviceInfo}
                onPress={() => navigation.navigate('DeviceInfo', { dispositivo: item })}
              >
                <View style={styles.deviceText}>
                  <Text style={styles.deviceName}>{item.nome}</Text>
                  <Text style={styles.deviceDate}>Data de Compra: {item.data_compra}</Text>
                </View>
                <Image
                  source={{ uri: item.foto ? `${API_URL}${item.foto}` : 'https://i.imgur.com/Nq7zX2g.png' }}
                  style={styles.deviceImage}
                />
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deletarDispositivo(item.id)}
              >
                <Icon name="delete" size={28} color="red" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 120,
    marginBottom: 20,
    alignSelf: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
    marginTop: 50,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  deviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(188, 245, 169, 0.2)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  deviceInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceText: {
    flex: 1,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  deviceDate: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
  },
  deviceImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: 'white',
  },
  deleteButton: {
    marginLeft: 15,
    padding: 5,
  },
});
