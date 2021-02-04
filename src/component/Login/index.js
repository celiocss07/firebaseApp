import React, { Component, useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, Linking, TextInput, Alert,KeyboardAvoidingView, Platform, ActivityIndicator, ScrollView } from 'react-native';
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
    const [iddriver, setiddriver] = useState("");
    const [status, setStatus] = useState("Null");
    const [display, setDisplay] = useState('none');
    const [showAlert, setShowAlert] = useState(false);
    const [messageModal, setMessageModal] = useState('none');
    const [titleModal, setTitleModal] = useState('none');
    const [colorButton, setColorButton] = useState('green');
   
    async function intialLogin() {
        setButtonLoading(true)
        // console.log(this.state.data)
         //const { password, iddriver} = this.state.data
         console.log("Credenciasi => ",password, iddriver)
       await api.post('/login',{
            
                password:password,
                username: iddriver
                

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
                    
                console.log("cdkwmc",err.response.data)
                
                await AsyncStorage.clear()
                await setButtonLoading(false)
                setColorButton('red')
                setMessageModal(`Password ou ID-DRIVER errado!`)
                setTitleModal("Erro de conexão")
                setShowAlert(true)

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
        return () => {
            
        }
    }, [ ])
  
   
    return (
        <KeyboardAvoidingView 
            style={[Style.container, Style.darkBg]} 
            
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
        <ScrollView style={{width:"100%",backgroundColor:"#FFF"}}>
            <View style={Style.containerLogo}>
                    <Image 
                      source= { require('../Imagens/Logo.png')}
                      style={Style.logo}
                     />
            </View>  
                
            

            <View style = {Style.containerForm}>

                  <TextInput 
                        placeholder = "Nome ou Telefone" 
                        style = {Style.inputForm}
                        onChangeText = { text => setiddriver(text) }
                      />

                  <TextInput 
                        placeholder = "Senha" 
                        style = { Style.inputForm} 
                        secureTextEntry={true}
                        onChangeText = { text => setPassword(text) }

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

                  <Text style={{color:"#333",marginTop:16}}>Esqueceu a 
                        <Text 
                            style={Style.text}
                            onPress={() => props.navigation.navigate('ForgetPassword')}
                        >  Senha?</Text> 
                  </Text>


                  <Text style={{color:"#333",margin:8, alignSelf:"center"}}>
                      <Text style={{color:"black"}}>--------------------------------</Text> 
                      <Text style={{fontWeight:"bold"}}> ou </Text>  
                      <Text>----------------------------</Text>

                    </Text>

                  <TouchableOpacity 
                    style = {[Style.buttonForm, Style.buttonFormNew]}
                    onPress = {() => {

                       props.navigation.navigate('Cadastro')
                        
                    }}
                    >
                      <Text style = {Style.buttonFormText}>Criar conta</Text>
                  </TouchableOpacity>

            </View>
            </ScrollView>
              
            <View style={Style.containerTitle}>
                    <Text style={{color:"#707070"}}>@2020copyright_SOLTEC</Text>
            </View>

        </KeyboardAvoidingView>
    )
  
}

