import React,{useState, createRef} from 'react';
import {View, Text, TouchableOpacity, Image, TextInput, ImageBackground, KeyboardAvoidingView} from 'react-native';
import { DrawerLayoutAndroid} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Map from '../Map';
import Styles from './style';


// 38fc263f-daad-441d-a48e-801050e92f10

function Menu({navigation}) {
    
    const [destination, setDestination] = useState(null)
        
        var navigationView = (
          
                <ImageBackground source={require('./../Imagens/Background.jpg')} style={Styles.containerMenu}>

                <View style={Styles.logoContainer}>
                    <Image 
                        source= { require('../Imagens/Logo.png')}
                        style= { Styles.logo}
                    />
                </View>

              <View style={Styles.options}>

                    

                    
                    <TouchableOpacity 
                      style={Styles.item}
                      onPress={ () => navigation.navigate('Notificacoes')}
                    >
                       <Image 
                        source= { require('../Imagens/icons8_Delete_Ticket_28px_1.png')}
                        
                    />
                          <Text style={Styles.itemText}>Notificações</Text>
                         

                    </TouchableOpacity>

                   {/* <TouchableOpacity 
                      style={Styles.item}
                      onPress={ () => navigation.navigate('Reservas')}
                      
                    >
                      <Image 
                        source= { require('../Imagens/icons8_Delete_Ticket_28px_1.png')}
                        
                    />
                          <Text style={Styles.itemText}>Reservas</Text>

                   </TouchableOpacity>*/}

                    <TouchableOpacity 
                      style={Styles.item}
                      onPress={ () => navigation.navigate('Historico')}
                    >
                      <Image 
                        source= { require('../Imagens/icons8_Historical_28px.png')}
                        
                    />
                          <Text style={Styles.itemText}>Histórico</Text>

                    </TouchableOpacity>

                    <TouchableOpacity 
                      style={Styles.item}
                      onPress={ () => navigation.navigate('Call_Center')}
                    >
                      <Image 
                        source= { require('../Imagens/icons8_Online_Support_28px.png')}
                        
                    />
                          <Text style={Styles.itemText}>Call Center</Text>

                    </TouchableOpacity>

                    

                    <TouchableOpacity 
                      style={Styles.item}
                      onPress={ () => navigation.navigate('Sobre')}
                    >
                      <Image 
                        source= { require('../Imagens/icons8_About_28px.png')}
                        
                    />
                          <Text style={Styles.itemText}>Sobre</Text>

                    </TouchableOpacity>

                    <TouchableOpacity 
                      style={Styles.item}
                      onPress={ async () => {
                        await AsyncStorage.clear()
                        navigation.navigate('Login')
                      }}
                    >
                      <Image 
                        source= { require('../Imagens/icons8_Exit_28px.png')}
                        
                    />
                          <Text style={Styles.itemText}>Sair</Text>

                    </TouchableOpacity>


              </View>

              <View style={Styles.logoContainer}>
                    
                </View>

                </ImageBackground>
             
                

          
        );

        const aux = createRef();

        function open() {
            aux.current.openDrawer()
            
        }
        return (
            < DrawerLayoutAndroid
                drawerWidth={ 300}
                nativeID={'DRAWER'}
                drawerPosition={"left"}
                renderNavigationView={() => navigationView}
                ref={aux}
                
        
            >
            


            <View style={Styles.container}>

                <View style={Styles.headerTop}>

                    <TouchableOpacity 
                        style={{}} 
                        onPress={ () => open()}>
                        <Image 
                            source= { require('../Imagens/Menu_48px.png')}
                            style= {Styles.logoMenu }
                        />
                    </TouchableOpacity>

                    <View style={{flexDirection:"row",justifyContent:"center", alignItems:"center", height:"100%"}}>
                    
                    <Image 
                            source= { require('../Imagens/Logo.png')}
                            style= {Styles.logoHeader }
                        />
                    </View>

                    <TouchableOpacity 
                        onPress = { () => navigation.navigate('Perfil')}
                        
                    >

                        <Image 
                            source= { require('../Imagens/imagem_pass.png')}
                            style= { Styles.logoPerfil}
                        />
                    </TouchableOpacity>

                </View>
                
                <KeyboardAvoidingView style={{ width:"100%", alignItems:"center", padding: 16, height: "92%"}}>
                    
                  <Map />
                </KeyboardAvoidingView>

                

                

                
            </View>
            
          </DrawerLayoutAndroid>
        );
      
}

export default Menu;