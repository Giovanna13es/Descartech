import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { UserProvider } from './context/UserContext';  // Import UserProvider

// Telas
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import DeviceRegisterScreen from './screens/DeviceRegisterScreen';
import DevicesListScreen from './screens/DevicesListScreen';
import DeviceInfoScreen from './screens/DeviceInfoScreen';
import CollectionPointsScreen from './screens/CollectionPointsScreen';
import AboutScreen from './screens/AboutScreen';

// Navegadores
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// Navegação com Tabs
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Perfil') iconName = 'person';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Menu Lateral
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        drawerStyle: {
          backgroundColor: 'rgba(108, 194, 74, 0.4)',
          width: 260,
        },
        overlayColor: 'transparent',
      }}
      
            
           

            /* Itens do Menu */
         drawerContent={(props) => (
  <View style={styles.drawerContent}>
    <View style={styles.contentWrapper}>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => props.navigation.navigate('Cadastrar Dispositivo')}
      >
        <Text style={styles.drawerItemText}> Dispositivo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => props.navigation.navigate('Locais de Coleta')}
      >
        <Text style={styles.drawerItemText}>Locais de Coleta</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => props.navigation.navigate('Sobre Nós')}
      >
        <Text style={styles.drawerItemText}>Sobre Nós</Text>
      </TouchableOpacity>
      {/* Sair logo após os itens */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => props.navigation.navigate('Login')}
      >
        <Text style={styles.drawerItemText}>Sair</Text>
      </TouchableOpacity>
    </View>
  </View>
)}
    >
      <Drawer.Screen name="Início" component={TabNavigator} />
      <Drawer.Screen name="Cadastrar Dispositivo" component={DeviceRegisterScreen} />
      <Drawer.Screen name="Locais de Coleta" component={CollectionPointsScreen} />
      <Drawer.Screen name="Sobre Nós" component={AboutScreen} />
    </Drawer.Navigator>
  );
}

// Estilos
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  contentWrapper: {
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 200,
    marginBottom: 30,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  drawerItem: {
    backgroundColor: 'rgba(108, 194, 74, 0.4)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 8,
    width: 200,
    alignItems: 'center',
  },
  drawerItemText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#6CC24A',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 20,
    width: 200,
    alignItems: 'center',
  },
});

// Navegação Principal
export default function App() {
  return (
    <UserProvider> {/* <-- Envolvendo o app no UserProvider */}
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            initialParams={{ resetNavigation: true }}
          />
          <Stack.Screen name="Cadastro" component={RegisterScreen} />
          <Stack.Screen name="App" component={DrawerNavigator} />
          <Stack.Screen name="Devices" component={DevicesListScreen} />
          <Stack.Screen name="DeviceInfo" component={DeviceInfoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
