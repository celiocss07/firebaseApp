import React, { Component, useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, Linking, TextInput, Alert,KeyboardAvoidingView, Platform, ActivityIndicator, ScrollView, Animated,Keyboard, StyleSheet, ImageBackground } from 'react-native';
import axios from "axios";
import Style from './style'
import api from './../../api'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { color } from 'react-native-reanimated';
import AwesomeAlert from 'react-native-awesome-alerts';

// import { Container } from './styles';

export default function Login( props) {
    
    const [buttonLoading, setButtonLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [user, setUser] = useState("");
    const [status, setStatus] = useState("Null");
    const [display, setDisplay] = useState('none');
    const [showAlert, setShowAlert] = useState(false);
    const [messageModal, setMessageModal] = useState('none');
    const [titleModal, setTitleModal] = useState('none');
    const [colorButton, setColorButton] = useState('green');
    const [offset] = useState(new Animated.ValueXY({x:0, y: 100}))
    const [opacity] = useState(new Animated.Value(0))
    const [logo] = useState(new Animated.ValueXY({x: 200, y:200}))
    
    const style = StyleSheet.create({
        background: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width:"100%"
        },
        containerLogo: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        },
        container:{
            flex: 1,
            alignItems: 'center',
            justifyContent: "center",
            width: "100%",
            marginBottom: 50
        }
    })
     function keyboardDidShow(){
         Animated.parallel([
             Animated.timing(logo.x, {
                 toValue:100,
                 duration: 900,
                 
             }),
             Animated.timing(logo.y, {
                 toValue:100,
                 duration: 400,
                 
             })
         ]).start()
     }
     function keyboardDidHide(){
         Animated.parallel([
             Animated.timing(logo.x, {
                 toValue:200,
                 duration: 400,
                 
             }),
             Animated.timing(logo.y, {
                 toValue:200,
                 duration: 400,
                 
             })
         ]).start()
     }
    async function intialLogin() {
        setButtonLoading(true)
        // console.log(this.state.data)
         //const { password, user} = this.state.data
         await AsyncStorage.clear()
         console.log("Credenciasi => ",password, user, user.match("@"))

       await api.post('/login',{
            
                password:password,
                phonenumber: user.match("@") ? "" : user,
                email: user.match('@') ? user : ""

                

         })
        .then( async response => {
           // console.log("sms => ",response.data)
           
            setStatus("Autorizado")
            setDisplay('none')
            props.navigation.navigate('Menu')
            let userData = await AsyncStorage.setItem('userData', JSON.stringify(response.data))
            let resData = await AsyncStorage.getItem('userData')
            console.log("\n ==============================================")
            console.log(JSON.parse(resData))
            await setButtonLoading(false)
        })
        .catch( async err => {
            if(err.response){
                    
                if(err.response.status == 401){
                    if(err.response.data.msg == "Invalid login, require validate login"){
                        console.log("Registed",err.response.data)
                        props.navigation.navigate('Verificacao')
                        await setButtonLoading(false)
                    }else{
                        await AsyncStorage.clear()
                        await setButtonLoading(false)
                        setColorButton('red')
                        setMessageModal(`Usuário ou senha errado!`)
                        setTitleModal("Dados incorrectos")
                        setShowAlert(true)
                        console.log("Nao",err.response.config.data)
                    }
                }
                console.log("cdkwmc",err.response.data)
                
                

            }else{
                setColorButton('red')
                setMessageModal("Verifique sua conexão de internet!")
                setTitleModal("Erro de conexão")
                setShowAlert(true)
                console.log("cdkwmc",err)
                await setButtonLoading(false)
            }
            
            
            await AsyncStorage.clear()
        })
       
        

        
    }

    useEffect(() => {
         AsyncStorage.clear()
         const KeyboardDidShowListener = Keyboard.addListener("keyboardDidShow",keyboardDidShow)
         const KeyboardHidShowListener = Keyboard.addListener("keyboardDidHide",keyboardDidHide)
         Animated.parallel([
             Animated.spring(offset.y, {
                 toValue:0,
                 speed: 2,
                 bounciness: 20,
                 useNativeDriver: true
             }),
             Animated.timing(opacity, {
                 toValue: 1,
                 duration: 900,
                 useNativeDriver: true
             })
         ]).start()
        return () => {
            KeyboardDidShowListener
            KeyboardHidShowListener
        }
    }, [ ])
  
   
    return (
        <ImageBackground 
            style={
                style.background
            }
            source={ require('./../../assets/login.png')}
        >
        
            <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title={titleModal}
          message={messageModal}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="Sair"
          confirmButtonColor={colorButton}
          onConfirmPressed={() => {
            setShowAlert(false)
          }}
          
        />
       
        <View style={style.containerLogo}>
                    <Animated.Image 
                      source= { require('../Imagens/Logo.png')}
                      style={{
                          width:logo.x,
                          height: logo.y
                          
                      }}
                     />
            </View>  
                
            
            <ScrollView style={{flex:1,padding: 20,height: "60%", width: "90%"}}>
            <Animated.View style = {[
                style.container,
                {
                    opacity: opacity,
                    transform:[{
                        translateY: offset.y
                    }]
                    
                }
                ]}>

                  <TextInput 
                        placeholder = "Telefone ou E-mail" 
                        style = {Style.inputForm}
                        onChangeText = { text => setUser(text) }
                        autoCapitalize={"none"}
                        keyboardType={"email-address"}
                        autoCorrect={false}
                      />

                  <TextInput 
                        placeholder = "Senha" 
                        style = { Style.inputForm} 
                        secureTextEntry={true}
                        onChangeText = { text => setPassword(text) }
                        autoCapitalize={"none"}
                        autoCorrect={false}
                        

                    />
                    
                    
                     <TouchableOpacity 
                    style = {Style.buttonForm}
                    onPress = {() => intialLogin()}
                    >
                        {
                                buttonLoading ? <ActivityIndicator size="small" color="#FFF" />
                                : <Text style = {Style.buttonFormText}>Entrar</Text>
                            }
                     
                  </TouchableOpacity>

                  <Text style={{color:"#fff",marginTop:16}}>Esqueceu a 
                        <Text 
                            style={Style.text}
                            onPress={() => props.navigation.navigate('ForgetPassword')}
                        >  Senha?</Text> 
                  </Text>


                  <Text style={{color:"#fff",margin:8, alignSelf:"center"}}>
                      <Text style={{color:"#fff"}}>--------------------------------</Text> 
                      <Text style={{fontWeight:"bold"}}> ou </Text>  
                      <Text>----------------------------</Text>

                    </Text>

                  <TouchableOpacity 
                    style = {[Style.buttonForm, Style.buttonFormNew]}
                    onPress = {() => {

                       props.navigation.navigate('Cadastro')
                        
                    }}
                    >
                      <Text style = {Style.buttonFormText}>Criar Conta</Text>
                  </TouchableOpacity>

            </Animated.View>
            </ScrollView>

        
        </ImageBackground>
    )
  
}

