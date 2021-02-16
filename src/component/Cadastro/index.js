import React, { useState, useEffect, useRef } from 'react';
import { View, Image, Text, TouchableOpacity, Linking, TextInput, Alert, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native';
import axios from "axios";
import Style from './style';
import api from './../../api'
import AwesomeAlert from 'react-native-awesome-alerts';
// import { Container } from './styles';

export default function Login( props) {
    
    //USER
    const [buttonLoading, setButtonLoading] = useState(false);
    const [pass, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [messageModal, setMessageModal] = useState('none');
    const [titleModal, setTitleModal] = useState('none');
    const [colorButton, setColorButton] = useState('green');
    
    //CAR
    const [repeat_pass, setRepeat_pass] = useState("");
  


    const phoneInput = useRef()
    const emailInput = useRef()
    const passwordInput = useRef()
    const repeatPassInput = useRef()

    const [status, setStatus] = useState("Null");
    const [display, setDisplay] = useState('none');

     async function intialLogin() {
         
        setButtonLoading(true)
         console.log(pass, userName)
         if(userName && phoneNumber && pass && repeat_pass){
             console.log(userName,userEmail, phoneNumber,pass, repeat_pass)
             if(userName.length < 4){
                setColorButton('yellow')
                setMessageModal(`Nome deve conter mais de 3 caracteres!`)
                setTitleModal("Nome incorrecto")
                setShowAlert(true)
                setButtonLoading(false)
             }else if(phoneNumber < 9 ){
                setColorButton('yellow')
                setMessageModal(`Número de telefone deve conter no mínimo 9 digitos!`)
                setTitleModal("Número de telefone incorrecto")
                setShowAlert(true)
                setButtonLoading(false)
             }else if(pass != repeat_pass){
                setColorButton('yellow')
                setMessageModal(`As senhas têm de ser iguais!`)
                setTitleModal("Senhas diferentes")
                setShowAlert(true)
                setButtonLoading(false)
             }else{
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
                if(err.response){
                    
                        setColorButton('red')
                        setMessageModal(`Número de telefone ou E-mail já existe!`)
                        setTitleModal("Dados incorrectos")
                        setShowAlert(true)
                        setButtonLoading(false)
                        console.log("cdkwmc",err.response.data)
                    
                }else{
                    setColorButton('red')
                    setMessageModal("Verifique sua conexão de internet!")
                    setTitleModal("Erro de conexão")
                    setShowAlert(true)
                    console.log("cdkwmc",err)
                    setButtonLoading(false)
                }
                
            })
             }
         }else{
            setColorButton('yellow')
            setMessageModal(`Preencha os campos vazios E-mail(opcional)!`)
            setTitleModal("Dados inválido")
            setShowAlert(true)
            setButtonLoading(false)
         }

       
    }
  
    return (
        <KeyboardAvoidingView 
        style = { Style.container}
        behavior={Platform.OS =="ios" ? "padding" : "height"}
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
                                        {
                                buttonLoading ? <ActivityIndicator size="small" color="#FFF" />
                                : <Text style = {Style.buttonFormText}>Próximo</Text>
                            }
                                    
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

