import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, Linking, TextInput, Alert,CheckBoxProps, KeyboardAvoidingView, ActivityIndicator, ScrollView, ImageBackground } from 'react-native';
import axios from "axios";
import api from './../../api'
import Style from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';
import ImagePicker from 'react-native-image-picker';



// import { Container } from './styles';

export default function Perfil( props) {
    const [buttonLoading, setButtonLoading] = useState(false);
    const [user, setUser] = useState(null);
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
         ////console.log("JOGANDO => ",token)
         setToken(token?.token)
         token = token?.user
         //////console.log(token)
       
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
              if(newPassword.length<6 ){

                update({
                    oldpass: oldPassword ,
                    email: userEmail!= user.email ? userEmail: "",
                    phonenumber: userPhoneNumber != user.phonenumber ? userPhoneNumber : "",
                    
                })
              }else{
                update({
                      oldpass: oldPassword ,
                      password: newPassword,
                      password_repeat: repeatPassword,
                      email: userEmail!= user.email ? userEmail: "",
                      phonenumber: userPhoneNumber != user.phonenumber ? userPhoneNumber : "",
                    
                })
              }
                
            }
            
        }else{
            setColorButton("red")
            setMessageModal("Digite sua Password!")
            setTitleModal("ERRO")
            setShowAlert(true)
        }
        //update()
    }
    async function update(objecto){

        
        //console.log("AAAAAA => ", objecto)
        setButtonLoading(true)
        await api.put("/update-user", objecto)
        .then( async response => {
            //console.log(response.data)
            //await AsyncStorage.removeItem('userData')
            await AsyncStorage.setItem('userData', JSON.stringify(response.data))
            await info()
            await setColorButton("green")
            await setButtonLoading(false)
            await setTitleModal("Perfil")
            await setMessageModal("Dados actualizados com sucesso!")
            await setShowAlert(true)
        } )
        .catch(err => {

            if(err.response){
              if(err.response.status == 401){
                setMessageModal("Password Incorrecta")
                setShowAlert(true)
                //console.log("cdkwmc",err.response.data)
                //console.log(err.response.config.data)
              }else if(err.response.status == 409){
                setTitleModal("Erro ao actualizar")
                setMessageModal("Número ou E-mail já existe")
                setShowAlert(true)
                //console.log("cdkwmc",err.response.data)
                //console.log(err.response.config.data)
              }else{
                setTitleModal("Erro")
                setMessageModal(" ERROS")
                setShowAlert(true)
                //console.log("cdkwmc",err.response.data)
                //console.log(err.response.config.data)
              }
                
                
            }else{
              setTitleModal("Erro de conexão")
              setMessageModal("Verifique sua ligação a internet!")
              setColorButton("red")
              setShowAlert(true)
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
          //console.log("CHEGOU")
        try {
          const jsonValue = await AsyncStorage.getItem('photo')
         //jsonValue = JSON.parse(jsonValue)
         //console.log(" PHOTO => ",JSON.parse(jsonValue).uri)
         setPhoto(JSON.parse(jsonValue).uri ? JSON.parse(jsonValue).uri : "https://url.gratis/r4QR4")
         //console.log('Pegou')
         
        } catch(e) {
          // read error
          console.warn(e)
        }
      
       
      
      }


async function setObjectValue(value){
 
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('photo', jsonValue)
      //console.log("SeTANDO => ", jsonValue)
      getMyObject()
    } catch(e) {
      // save error
      console.warn(e)
    }

  
   // //console.log('Done.')
  }
  async function removeValue() {
    try {
      await AsyncStorage?.removeItem('photo')
    } catch(e) {
      // remove error
    }
  
    //console.log('Remove.')
  }

      const openPicker = () => {
       
        ImagePicker.showImagePicker(options, async (response) => {
            ////console.log('Response = ', response);
            if (response.didCancel) {
              //console.log('User cancelled image picker');
            } else if (response.error) {
              //console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              //console.log('User tapped custom button: ', response.customButton);
            } else {
               await  setPhoto(response.uri)
              const source =  { uri: response.uri };
              const formData = await new FormData();
              await formData.append("profile", {
                uri: response.uri,
                name: response.fileName || `${userName}.png`,
                type:response.type || "image/png"
              });

              await api.post("/upload-user",formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              })
              .then(async res => {
                //console.log(res.data)
                await removeValue()
                await setObjectValue({uri: res?.data?.profile_url})
              })
              .catch(err => {
                //console.log(" eRRO ao subir",err)
              })   ////console.log("Caminho => ",source)
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
          
            }
          });
      }
      async function handleInfo(){
        api.get("/bring-user")
        .then( async res => {
             console.log("USUARIO => ", res.data.user)
            setUser(res.data.user)
            if(res.data.user.photo){
              await AsyncStorage.removeItem('photo')
              await setObjectValue({uri:res.data.user.photo})

            }
        })
        .catch( err => {
          if(err.response){
            //console.log("ERRO AO BRING => ", err.response.data)
          }else{
            //console.log("ERRO AO BRING internet => ", err)

          }
        })
      }
    
    useEffect(  ()=> {
          handleInfo()
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
        <ImageBackground 
        style={Style.container}
        source={require('./../../assets/perfil.png')}
    >
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

           
        <ScrollView style={{width: "100%"}}>
            <View style = {Style.containerForm}>
                  <TextInput 
                        placeholder = "Nome de usuário" 
                        style = { Style.inputForm}
                        value={userName}
                        onChangeText = {(e) => {
                            setUserName(e)
                        }}
                        editable={false}
                        
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
                      <Text style={{margin:8, color:"#fff", fontSize: 16}}>Mudar senha (Opcional)</Text>
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
  
              
  
              
        </ScrollView>
        </ImageBackground>
        </KeyboardAvoidingView>
    )
  
}

