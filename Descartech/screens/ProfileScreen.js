import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { UserContext } from '../context/UserContext';

export default function ProfileScreen({ navigation }) {
  // Contexto completo para usuarioId, nome e email, e seus setters
  const { usuarioId, nome, email, setNome, setEmail } = useContext(UserContext);

  const [profileImage, setProfileImage] = useState(null);
  const [editable, setEditable] = useState(false);
  const [localName, setLocalName] = useState(nome || '');
  const [localEmail, setLocalEmail] = useState(email || '');

  useEffect(() => {
    if (!usuarioId) {
      console.log('usuarioId não definido no contexto');
      return;
    }

    const fetchUserData = async () => {
      try {
        console.log('Buscando dados do usuário ID:', usuarioId);
        const response = await fetch(`http://192.168.100.55:3000/api/usuarios/${usuarioId}`);
        const data = await response.json();
        console.log('Dados recebidos:', data);

        if (response.ok) {
          setLocalName(data.nome);
          setLocalEmail(data.email);
          setNome(data.nome);  // atualiza contexto
          setEmail(data.email); // atualiza contexto
        } else {
          Alert.alert('Erro', data.mensagem || 'Erro ao carregar dados.');
        }
      } catch (error) {
        console.error('Erro ao buscar perfil:', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados do usuário.');
      }
    };

    fetchUserData();
  }, [usuarioId]);

  // Permissão para pegar foto do dispositivo
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Permissão para acessar as imagens foi negada.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // Salvar novo nome no backend e atualizar contexto
  const handleSaveName = async () => {
    if (!editable) return;

    try {
      const response = await fetch(`http://192.168.100.55:3000/api/usuarios/${usuarioId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: localName }),
      });

      if (!response.ok) throw new Error('Erro ao salvar nome');
      setNome(localName);
      Alert.alert('Sucesso', 'Nome atualizado!');
      setEditable(false);
    } catch {
      Alert.alert('Erro', 'Não foi possível atualizar o nome.');
    }
  };

  return (
    <ImageBackground source={require('../assets/backgroud2.png')} style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={profileImage ? { uri: profileImage } : require('../assets/default-user.png')}
            style={styles.profileImage}
          />
          <Text style={styles.editPhotoText}>Editar Foto</Text>
        </TouchableOpacity>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Nome</Text>
          <View style={styles.row}>
            <TextInput
              style={styles.input}
              value={localName}
              onChangeText={setLocalName}
              editable={editable}
              onEndEditing={handleSaveName}
            />
            <TouchableOpacity onPress={() => setEditable(!editable)}>
              <Ionicons name="pencil" size={20} color="gray" />
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Email</Text>
          <View style={styles.row}>
            <TextInput style={styles.input} value={localEmail} editable={false} />
            <Ionicons name="lock-closed" size={20} color="gray" />
          </View>

          
        </View>
      </View>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    paddingTop: 60,
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  editPhotoText: {
    color: '#007BFF',
    marginTop: 8,
    marginBottom: 20,
    fontWeight: '500',
  },
  infoContainer: {
    width: '100%',
  },
  label: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 15,
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(188, 245, 169, 0.4)',
    borderRadius: 20,
    padding: 12,
    marginRight: 10,
    color: '#000',
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: 'rgba(188, 245, 169, 0.3)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  devicesText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
  },
});
