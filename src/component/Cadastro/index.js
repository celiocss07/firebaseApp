import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Text, TouchableOpacity, Linking, TextInput, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import axios from "axios";
import Style from './style';
import api from './../../api'

// import { Container } from './styles';

export default function Login( props) {
    
    //USER
    const [pass, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    //CAR
    const [repeat_pass, setRepeat_pass] = useState("");
  


    const phoneInput = useRef()
    const emailInput = useRef()
    const passwordInput = useRef()
    const repeatPassInput = useRef()

    const [status, setStatus] = useState("Null");
    const [display, setDisplay] = useState('none');

     async function intialLogin() {
         
        
         console.log(pass, userName)

       await api.post("/sign-up", {
              
                username: userName,
                phonenumber: phoneNumber,
                password: pass,
                password_repeat: repeat_pass,
                email: userEmail
                
            
        })
        .then(response => {
            console.log(response.data)
            props.navigation.navigate('Verificacao')
        } )
        .catch(err => {
            console.log("cdkwmc",err.response.data)
            Alert.alert("Dados incompletos!")
        })
    }
  
    return (
        <KeyboardAvoidingView 
        style = { Style.container}
        behavior={Platform.OS =="ios" ? "padding" : "height"}
        >
            <ScrollView style={{width: "100%", padding: 16,}}>
                        <View style={Style.containerLogo}>

                            <Image 
                              source= { require('../Imagens/Logo.png')}
                              style= { Style.logo}
                             />

                            <View style={Style.containerTitle}>
                                <Text style={Style.msg('flex')}>Cadastre-se</Text>
                            </View>

                        </View>



                            <View style = {Style.containerForm}>
                              <TextInput 
                                    placeholder = "Nome de usuário" 
                                    style = { Style.inputForm}
                                    onChangeText = {(e) => {
                                        setUserName(e)
                                    }}
                                    onSubmitEditing={ () => emailInput.current.focus()}
                                    returnKeyType={"next"}
                                />

                                  <TextInput 
                                        placeholder = "E-mail (Opcional)" 
                                        style = { Style.inputForm} 
                                        keyboardType={"email-address"}
                                        textContentType={"emailAddress"}
                                        onChangeText = {(e) => {
                                            setUserEmail(e)
                                        }}
                                        ref={emailInput}
                                        onSubmitEditing={ () => phoneInput.current.focus()}
                                        returnKeyType={"next"}
                                    
                                  />
                                  <TextInput 
                                        placeholder = "Número de Telemóvel" 
                                        style = { Style.inputForm} 
                                        keyboardType={"phone-pad"}
                                        keyboardAppearance={"dark"}
                                        textContentType={"telephoneNumber"}
                                        onChangeText = {(e) => {
                                            setPhoneNumber(e)
                                        }}
                                        ref={phoneInput}
                                        onSubmitEditing={ () => passwordInput.current.focus()}
                                        returnKeyType={"next"}
                                    
                                  />
                                  <TextInput 
                                        placeholder = "Palavra-passe" 
                                        style = { Style.inputForm} 
                                        secureTextEntry={true} 
                                        onChangeText = {(e) => {
                                            setPassword(e)
                                        }}
                                        ref={passwordInput}
                                        onSubmitEditing={ () => repeatPassInput.current.focus()}
                                        returnKeyType={"next"}
                                    
                                  />

                                  <TextInput 
                                        placeholder = "Confirmar palavra-passe" 
                                        style = { Style.inputForm}
                                        secureTextEntry={true} 
                                        onChangeText = {(e) => {
                                            setRepeat_pass(e)
                                        }}
                                        ref={repeatPassInput}
                                        onSubmitEditing={ () => intialLogin()}
                                        returnKeyType={"send"}
                                    />

                                    <TouchableOpacity 
                                        style = {Style.buttonForm}
                                        onPress = {() => {
                                            intialLogin()
                                        }}
                                     >
                                        <Text style = {Style.buttonFormText}>Próximo</Text>
                                    
                                    </TouchableOpacity>
                                    
                                    
                                    <Text 
                                        style={Style.text}
                                        onPress={() => props.navigation.navigate('Login')}
                                    > Já tenho conta! </Text> 

                            </View>
                                    
                            


            </ScrollView>
            
              
  
        </KeyboardAvoidingView>
    )
  
}

