import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

export default function DeviceRegisterScreen() {
  const [tipo, setTipo] = useState('');
  const [dataCompra, setDataCompra] = useState(new Date());
  const [imagem, setImagem] = useState(null);

  const vidaUtilPorTipo = {
    celulares: 'Celulares, smartphones geralmente duram de 2 a 5 anos.',
    tablets: 'Tablets geralmente duram de 2 a 5 anos.',
    desktop: 'Computadores têm uma durabilidade de 4 a 6 anos.',
    notebooks: 'notebooks têm uma durabilidade de 4 a 6 anos',
    monitores: 'Monitores tem Vida útil média: 5 a 8 anos.',
    teclados: 'Vida útil média: 5 anos.',
    televisores: 'TV tem Vida útil média: 7 a 10 anos.',
    impressoras_scanners: 'impressoras/scanners tem Vida útil média: 3 a 6 anos.',
    cabos_carregadores: 'cabos/carregadoresVida tem útil média: 1 a 2 anos.',
    baterias_pilhas: 'baterias/pilhas tem Vida útil média: 1 a 2 anos.',
  };

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: dataCompra,
      onChange: (event, selectedDate) => {
        if (selectedDate) setDataCompra(selectedDate);
      },
      mode: 'date',
      display: 'default',
    });
  };

  const escolherImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permissão para acessar a galeria foi negada');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImagem(result.assets[0].uri);
    }
  };

  const mostrarInformacoesVidaUtil = () => {
    if (tipo && vidaUtilPorTipo[tipo]) {
      Alert.alert('Vida Útil do Dispositivo', vidaUtilPorTipo[tipo]);
    } else {
      Alert.alert('Atenção', 'Por favor, selecione um tipo de dispositivo.');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/backgroud2.png')}
      style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Escolha um dispositivo</Text>

        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={tipo}
            onValueChange={(itemValue) => setTipo(itemValue)}
            style={styles.picker}
            dropdownIconColor="white">
            <Picker.Item label="Selecione um tipo" value="" />
            <Picker.Item label="Celulares" value="celulares" />
            <Picker.Item label="Tablets" value="tablets" />
            <Picker.Item label="Desktop" value="desktop" />
            <Picker.Item label="Notebooks" value="notebooks" />
            <Picker.Item label="Monitores" value="monitores" />
            <Picker.Item label="Teclados" value="teclados" />
            <Picker.Item label="Televisores" value="televisores" />
            <Picker.Item label="Impressoras e scanners" value="impressoras_scanners" />
            <Picker.Item label="Cabos e carregadores" value="cabos_carregadores" />
            <Picker.Item label="Baterias e pilhas" value="baterias_pilhas" />
          </Picker>
        </View>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={mostrarInformacoesVidaUtil}>
          <Text style={styles.buttonText}>Mais informações</Text>
        </TouchableOpacity>
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
  pickerWrapper: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(188, 245, 169, 0.3)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#BCF5A9',
    justifyContent: 'center',
    marginBottom: 15,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: '100%',
    color: 'white',
    marginLeft: 10,
  },
  registerButton: {
    backgroundColor: '#BCF5A9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
    width: '70%',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
