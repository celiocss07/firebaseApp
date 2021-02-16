import React, { useState, useEffect, useRef, Fragment } from 'react';
import { View, Image, Text, TouchableOpacity, Linking, TextInput, Alert, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native';
import axios from "axios";
import Style from './style';
import api from './../../api'
import AwesomeAlert from 'react-native-awesome-alerts';
// import { Container } from './styles';

export default function Login( props) {
    
    //USER
    const [pass, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [userCode, setUserCode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [exist, setExist] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [messageModal, setMessageModal] = useState('none');
    const [titleModal, setTitleModal] = useState('none');
    const [colorButton, setColorButton] = useState('green');
    const [alertMsgStyle, setAlertMsgStyle] = useState({fontSize: 16, textAlign: 'center'});
    //CAR
    const [data, setData] = useState(null)
    const [fine, setFine] = useState(false)
    const [repeat_pass, setRepeat_pass] = useState("");
  
    const userInput = useRef()
    const codeInput = useRef()
    const passwordInput = useRef()
    const repeatPassInput = useRef()




   

     async function VerifIdentify() {
        setButtonLoading(true)
        
         console.log( userName)

       await api.put("/forget-my-pass-send-code", {
              
            data: userName.match("@") ? "" : userName,
            email: userName.match('@') ? userName : ""

        })
        .then(response => {

            if(response.status == 204){
                console.log("not found")
                setButtonLoading(false)
                setColorButton('red')
                setMessageModal(`Nº de telefone ou E-MAIL errado!`)
                setTitleModal("Usuário não encontrado")
                setShowAlert(true)
            }else if(response.status == 200){
                setData(response.data.data)
                console.log(response.data.data)
                setButtonLoading(false)
                setExist(true)
                
                //userInput.current.disable()
            }

            console.log(response.data)
            
        } )
        .catch(err => {

            
            console.log("cdkwmc",err)
           

        })
    }

    async function updateUser() {
        setButtonLoading(true)
        
         console.log( userName)

       await api.put("/forget-my-pass-change", {
              
                confirmcode: userCode,
                password: pass,
                password_repeat: repeat_pass,
                data: data

        })
        .then(response => {

            if(response.status == 204){
                console.log("confirm code not exist", response.config.data)
                setButtonLoading(false)
                setColorButton('red')
                setMessageModal(`Código de confirmação errado!`)
                setTitleModal("Dados incorrectos")
                setShowAlert(true)
            }else if(response.status == 200){
                console.log(response.data)
                setButtonLoading(false)
                setFine(true)
                setButtonLoading(false)
                setColorButton('green')
                setMessageModal(`Os seus dados foram actualizados com sucesso, aperte em sair para iniciar sessão.`)
                setTitleModal("Dados Actualizados")
                setShowAlert(true)
                setExist(false)
                
                //userInput.current.disable()
            }

            console.log(response.data)
            
        } )
        .catch(err => {

            
            console.log("cdkwmc",err.response)
           

        })
    }
  
    return (
        <KeyboardAvoidingView 
        style = { Style.container}
        
        >
            <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title={titleModal}
          message={messageModal}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          messageStyle={alertMsgStyle}
          confirmText="Sair"
          confirmButtonColor={colorButton}
          onConfirmPressed={() => {
            if(fine){
                setShowAlert(false)
                props.navigation.navigate('Login')
            }else{
                setShowAlert(false)
            }
          }}
          
        />
            <ScrollView style={{width: "100%", padding: 16,}}>
                        <View style={Style.containerLogo}>

                            <Image 
                              source= { require('../Imagens/Logo.png')}
                              style= { Style.logo}
                             />

                            <View style={Style.containerTitle}>
                                <Text style={Style.msg('flex')}>Recuperar Conta</Text>
                            </View>

                        </View>



                            <View style = {Style.containerForm}>
                              <TextInput 
                                    placeholder = "N• de telefone ou E-mail" 
                                    style = { Style.inputForm}
                                    onChangeText = {(e) => {
                                        setUserName(e)
                                    }}
                                    ref={userInput}
                                    onSubmitEditing={ () => {
                                        if(exist){
                                            codeInput.current.focus()
                                        }else{
                                            VerifIdentify()
                                        }
                                    }}
                                    returnKeyType={exist?"next":"send"}
                                />

                                  
                                { exist ? 
                                <Fragment>
                                            <TextInput 
                                        placeholder = "Código de confirmação" 
                                        style = { Style.inputForm} 
                                        
                                        onChangeText = {(e) => {
                                            setUserCode(e)
                                        }}
                                        ref={codeInput}
                                        keyboardType={"phone-pad"}
                                        onSubmitEditing={ () => passwordInput.current.focus()}
                                        returnKeyType={"next"}
                                    
                                  />
                                   <TextInput 
                                        placeholder = "Senha" 
                                        style = { Style.inputForm} 
                                        secureTextEntry={true} 
                                        onChangeText = {(e) => {
                                            setPassword(e)
                                        }}
                                        autoCapitalize={'none'}
                                        ref={passwordInput}
                                        onSubmitEditing={ () => repeatPassInput.current.focus()}
                                        returnKeyType={"next"}
                                    
                                  />

                                  <TextInput 
                                        placeholder = "Confirmar senha" 
                                        style = { Style.inputForm}
                                        secureTextEntry={true} 
                                        onChangeText = {(e) => {
                                            setRepeat_pass(e)
                                        }}
                                        ref={repeatPassInput}
                                        autoCapitalize={'none'}
                                        onSubmitEditing={ () => { 

                                        }}
                                        returnKeyType={"send"}
                                    />
                                </Fragment> 
                                : <Fragment>

                                </Fragment>

                                    }

                                    <TouchableOpacity 
                                        style = {Style.buttonForm}
                                        onPress = {() => {
                                            exist ? updateUser() : VerifIdentify() 
                                            
                                        }}
                                     >
                                        {
                                buttonLoading ? <ActivityIndicator size="small" color="#FFF" />
                                : <Text style = {Style.buttonFormText}>Próximo</Text>
                            }
                                    
                                    </TouchableOpacity>
                                    
                                    
                                    

                            </View>
                                    
                            


            </ScrollView>
            
              
  
        </KeyboardAvoidingView>
    )
  
}

