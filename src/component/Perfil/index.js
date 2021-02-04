import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, Linking, TextInput, Alert,CheckBoxProps, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import axios from "axios";
import api from './../../api'
import Style from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';



// import { Container } from './styles';

export default function Perfil( props) {
    const [buttonLoading, setButtonLoading] = useState(false);
    const [userPassword, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [userPhoneNumber, setUserPhoneNumber] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [messageModal, setMessageModal] = useState('none');
    const [titleModal, setTitleModal] = useState('none');
    const [colorButton, setColorButton] = useState('green');
    const [avatar, setAvatar] = useState()

    const perfil = {
        nome: "",
        email: "",
        telefone: "",
        
    }

    async function info(){
        let token = await AsyncStorage.getItem('userData')
         token =  JSON.parse(token)
         console.log("JOGANDO => ",token)
         setToken(token.token)
         token = token.user
         //console.log(token)
       
        setUserName(token.username)
        setUserEmail(token.email)
        setUserPhoneNumber(token.phonenumber)
    }


    async function verify(){
        if( userName && userEmail 
            && oldPassword
        ){
            if(newPassword != repeatPassword ){
            Alert.alert("Dados Incorretos!", "Password's não são idênticas...")
            }else{
                update()
            }
            
        }else{
            setColorButton("red")
            setMessageModal("Digite sua Password!")
            setTitleModal("ERRO")
            setShowAlert(true)
        }
        //update()
    }
    async function update(){

        
console.log("AAAAAA => ", oldPassword)
        setButtonLoading(true)
        await api.put("/update-user", {
           
            
                oldpass: oldPassword,
                password: newPassword,
                password_repeat: repeatPassword,
                email:userEmail,
                phonenumber: userPhoneNumber,
                username: userName

           
       })
        .then( async response => {
            console.log(response.data)
            await AsyncStorage.clear()
            let userData = await AsyncStorage.setItem('userData', JSON.stringify(response.data))
            await info()
            await setColorButton("green")
            await setButtonLoading(false)
            await setTitleModal("Perfil")
            await setMessageModal("Dados actualizados com sucesso!")
            await setShowAlert(true)
        } )
        .catch(err => {

            if(err.response){
                console.log("cdkwmc",err.response.data)
                console.log(err.response.config.data)
                setMessageModal(err.response.msg)
                setShowAlert(true)
            }else{
                console.log("mensagem",err)
                setMessageModal(err[0])
                Alert.alert("Dados incompletos!")
            }
           
            
            setButtonLoading(false)

        })
    } 
    const options = {
        title: 'Select Avatar',
        customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
    function callback(data) {
        if(data.didCancel) {
          return;
        }
        if(data.error) {
          return;
        }
        if(!data.uri) {
          return;
        }
        imagePi
        setAvatar(data)
      }
    
    
    useEffect(  ()=> {
        
         info()


    }, [])
  
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
          confirmText="Yes"
          confirmButtonColor={colorButton}
          onConfirmPressed={() => {
            setShowAlert(false)
          }}
          
        />
            <View style={Style.containerLogo}>

                <TouchableOpacity onPress={ () => {}}>
                <Image 
                  source= { {uri: avatar ? avatar.uri : 'https://www.dlf.pt/dfpng/middlepng/359-3591655_black-business-user-black-user-icon-hd-png.png'} }
                  style= { Style.logo}
                 />
                </TouchableOpacity>

                <View style={Style.containerTitle}>
                    <Text style={Style.msg}>{ userName}</Text>
                </View>

            </View>

           

            <View style = {Style.containerForm}>
                  <TextInput 
                        placeholder = "Nome de usuário" 
                        style = { Style.inputForm}
                        value={userName}
                        onChangeText = {(e) => {
                            setUserName(e)
                        }}
                    />
                  
                      <TextInput 
                            placeholder = "E-mail" 
                            style = { Style.inputForm} 
                            textContentType={"emailAddress"}
                            keyboardType={"email-address"}
                            value={userEmail}
                            
                            onChangeText = {(e) => {
                                setUserEmail(e)
                            }}
                      
                      />
                      <TextInput 
                            placeholder = "Número de telefone" 
                            style = { Style.inputForm}
                            value={userPhoneNumber}
                            textContentType={"telephoneNumber"}
                            keyboardType={"phone-pad"} 
                            onChangeText = {(e) => {
                                setUserPhoneNumber(e)
                            }}
                        />
                      <TextInput 
                            placeholder = "Password Actual" 
                            style = { Style.inputForm} 
                            secureTextEntry={true} 

                            onChangeText = {(e) => {
                                setOldPassword(e)
                            }}
                      
                      />

                      <TextInput 
                            placeholder = "Nova Password" 
                            style = { Style.inputForm}
                            secureTextEntry={true} 
                            onChangeText = {(e) => {
                                setNewPassword(e)
                            }}
                        />
                        <TextInput 
                            placeholder = "Repita Nova Password" 
                            style = { Style.inputForm}
                            secureTextEntry={true} 
                            onChangeText = {(e) => {
                               setRepeatPassword(e)
                            }}
                        />

                        <TouchableOpacity 
                            style = {Style.buttonForm}
                            onPress = {() => {
                                //setShowAlert(true)
                               verify()
                            }}
                         >
                            {
                                buttonLoading ? <ActivityIndicator size="small" color="#FFF" />
                                : <Text style = {Style.buttonFormText}>Guardar</Text>
                            }

                        </TouchableOpacity>

                         
                       
                  
              </View>
  
              
  
              
  
        </KeyboardAvoidingView>
    )
  
}

