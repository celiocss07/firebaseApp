import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Map from './component/Map'
import menuScreen from './component/Menu'
import cadastroScreen from './component/Cadastro'
import verifScreen from './component/Cadastro/verificacao'
import loginScreen from './component/Login';
import Detalhes from './component/Details';

import Notificacoes from './component/Notificacoes';
import Reservas from './component/Reservas';
import Historico from './component/Historico';
import Call_Center from './component/Call_Center';
import Sobre from './component/Sobre';
import Perfil from './component/Perfil'
import auth from './auth';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
// import { Container } from './styles';

const Stack = createStackNavigator();
function App() {
  return(
    <NavigationContainer>

        <Stack.Navigator>
        
          <Stack.Screen name="Autorization" component={auth}  options={{headerShown:false}}/>
          <Stack.Screen name="Menu" component={menuScreen}  options={{headerShown:false}}/>
          <Stack.Screen name="Mapa" component={Map}  options={{headerShown:false}}/>

        

          <Stack.Screen name="Notificacoes" component={Notificacoes}  />
          <Stack.Screen name="Reservas" component={Reservas}  />
          <Stack.Screen name="Historico" component={Historico}  />
  <Stack.Screen name="Call_Center" component={Call_Center}  />
         <Stack.Screen name="Detalhes" component={Detalhes}  options={{headerShown:false}}/>
        
          
          
          <Stack.Screen name="Login" component={loginScreen} options={{headerShown:false}} />
          <Stack.Screen name="Verificacao" component={verifScreen} options={{headerShown:false}} />
          <Stack.Screen name="Cadastro" component={cadastroScreen} options={{headerShown:false}} />
          <Stack.Screen name="Perfil" component={Perfil}  />
          <Stack.Screen name="Sobre" component={Sobre}  />
        
        </Stack.Navigator>

    </NavigationContainer>
  );
}

export default App;