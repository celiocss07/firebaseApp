import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, Linking, TextInput, Alert,CheckBoxProps, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import axios from "axios";
import api from './../../api'
import Style from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';
import ImagePicker from 'react-native-image-picker';



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
    const [photo, setPhoto] = useState("https://img2.gratispng.com/20180401/rle/kisspng-computer-icons-user-profile-male-user-5ac10d05430db1.7381637515226012212747.jpg")

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
         setPhoto(token.fotoname ? token.fotoname : "./../Imagens/Login.png")
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
      const options = {
        title: 'Escolhe sua foto',
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
        
      };


      async function getMyObject() {
          console.log("CHEGOU")
        try {
          const jsonValue = await AsyncStorage.getItem('photo')
         //jsonValue = JSON.parse(jsonValue)
         console.log(" PHOTO => ",JSON?.parse(jsonValue).uri)
         //setPhoto(JSON.parse(jsonValue).uri?JSON.parse(jsonValue).uri : "./../Imagens/Login.png" )
         console.log('Pegou')
        } catch(e) {
          // read error
        }
      
       
      
      }


async function setObjectValue(value){
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('photo', jsonValue)
      console.log("SeTANDO => ", jsonValue)
    } catch(e) {
      // save error
    }
  
    console.log('Done.')
  }
  async function removeValue() {
    try {
      await AsyncStorage?.removeItem('photo')
    } catch(e) {
      // remove error
    }
  
    console.log('Remove.')
  }

      const openPicker = () => {
       
        ImagePicker.showImagePicker(options, async (response) => {
            //console.log('Response = ', response);
         
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
               await  setPhoto(response.uri)
              const source =  { uri: response.uri };
              const formData = await new FormData();
              await formData.append("profile", {
                uri: response.uri,
                name: response.fileName || "profile_photo.png",
                type:response.type || "image/png"
              });

              await api.post("/upload",formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
              .then(res => {
                console.log(res.data)
              })
              .catch(err => {
                console.log(" eRRO ao subir",err)
              })
             await  removeValue()
             await  setObjectValue(source)
                //console.log("Caminho => ",source)
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          
            }
          });
      }
    
    
    useEffect(  ()=> {
        
         info()
         getMyObject()


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

            <TouchableOpacity onPress={openPicker}>
                    <Image 
                      source= { {uri: photo} }
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

