import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Map from './component/Map'
import menuScreen from './component/Menu'
import cadastroScreen from './component/Cadastro'
import verifScreen from './component/Cadastro/verificacao'
import forgetScreen from './component/forgetPassword'
import loginScreen from './component/Login';
import Detalhes from './component/Details';
import Politica from './component/Politica';
import Termos from './component/Termos';
import otherLocation from './component/otherLocation';
import Notificacoes from './component/Notificacoes';
import WebView from './component/Notificacoes/webview';
import Reservas from './component/Reservas';
import Historico from './component/Historico';
import Call_Center from './component/Call_Center';
import Sobre from './component/Sobre';
import Perfil from './component/Perfil'
import auth from './auth';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { color } from 'react-native-reanimated'
import codePush from 'react-native-code-push'

// import { Container } from './styles';

const Stack = createStackNavigator();
function App() {
  return(
    <NavigationContainer>

        <Stack.Navigator>
        
          <Stack.Screen name="Autorization" component={auth}  options={{headerShown:false}}/>
          <Stack.Screen name="Menu" component={menuScreen}  options={{headerShown:false}}/>
          <Stack.Screen name="Mapa" component={Map}  options={{headerShown:false}}/>

          <Stack.Screen name="Politica" component={Politica} options={ { 
            headerTitle:"Política de Privacidade", 
            headerTitleAlign: 'center',
            headerStyle:{
            backgroundColor:"rgb(0,160,210)"
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },}}  />
          
          <Stack.Screen name="Termos_uso" component={Termos}  options={ { 
            headerTitle:"Termos de Uso", 
            headerTitleAlign: 'center',
            headerStyle:{
              backgroundColor:"rgb(0,160,210)"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            }}/>
        <Stack.Screen name="otherLocation" component={otherLocation} options={ { 
            headerTitle:"Localização", 
            headerTitleAlign: 'center',
            headerStyle:{
            backgroundColor:"rgb(0,160,210)"
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },}}  />
          <Stack.Screen name="ForgetPassword" component={forgetScreen} options={{headerShown:false}} />
          <Stack.Screen name="Notificacoes" component={Notificacoes} options={{
            headerTitle:"Notificaçōes",
            headerTitleAlign: 'center',
            headerStyle:{
              backgroundColor:"rgb(0,160,210)"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            }}  />
          <Stack.Screen name="WebView" component={WebView} options={({ route }) => ({ 
            title: route.params.url, 
            headerTitleAlign: 'center',
            headerStyle:{
            backgroundColor:"rgb(0,160,210)"
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
           })} />
          <Stack.Screen name="Reservas" component={Reservas}  options={{
            
            headerStyle:{
              backgroundColor:"rgb(0,160,210)"
            },
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            }} />
          <Stack.Screen name="Historico" component={Historico}  options={{
            headerTitle:"Histórico",
            headerStyle:{
              backgroundColor:"rgb(0,160,210)"
            },
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            }} />
  <Stack.Screen name="Call_Center" component={Call_Center}  options={{
            headerTitle:"Call Center",
            headerStyle:{
              backgroundColor:"rgb(0,160,210)"
            },
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            }} />
         <Stack.Screen name="Detalhes" component={Detalhes}  options={{headerShown:false}}/>
        
          
          
          <Stack.Screen name="Login" component={loginScreen} options={{headerShown:false}} />
          <Stack.Screen name="Verificacao" component={verifScreen} options={{headerShown:false}} />
          <Stack.Screen name="Cadastro" component={cadastroScreen} options={{headerShown:false}} />
          <Stack.Screen name="Perfil" component={Perfil} options={{
            
            headerStyle:{
              backgroundColor:"rgb(0,160,210)"
            },
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            }}  />
          <Stack.Screen name="Sobre" component={Sobre}  options={{
            
            headerStyle:{
              backgroundColor:"rgb(0,160,210)"
            },
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            }} />
        
        </Stack.Navigator>

    </NavigationContainer>
  );
}

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.IMMEDIATE,
}

export default codePush(codePushOptions)(App)