import React, {useEffect, useState} from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, FlatList, Alert}  from 'react-native';
import Styles from './style'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from 'axios';
import api from './../../api'

const Historico = () => {

  const [loading, setLoading]  = useState(false);
  const [referal, setReferal]  = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [cor, setCor]  = useState('#D34242');
   const [showAlert, setShowAlert] = useState(false);
    const [messageModal, setMessageModal] = useState('none');
    const [titleModal, setTitleModal] = useState('none');
    const [colorButton, setColorButton] = useState('green');
  let token = "jdj";
 
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  

async function getinfo(){

      
    
    setLoading(true)
    console.log("\n \n \n => ", token)
    await api.get("/historic-all-reserves", {
       
   })
    .then( async response => {

        if(response.status){
            if(response.status == 200){
                response.data.map((item, index ) => console.log("BURRO => ",item.reserveto))
                await setReferal(response.data);
            }
             if(response.status == 204)
             {
                 setMessageModal("Não tens histórico!")
                 setTitleModal("Informação")
                 setShowAlert(true)
             }
            console.log(" CANCELADA => ",response.status)
        }

        //await AsyncStorage.clear()
        //let userData = await AsyncStorage.setItem('userData', JSON.stringify(response))
        //info()
        setLoading(false)
    } )
    .catch(err => {
        if(err.response){

        }else{
            setColorButton('red')
            setMessageModal("Verifique sua conexão de internet!")
            setTitleModal("Erro de conexão")
            setShowAlert(true)
        }
        console.log("cdkwmc",err)
       // Alert.alert("Dados incompletos!")
        //setLoading(false)

    })
} 

  
useEffect(
    () => {
        getinfo()
    }
, [])

  return (
    <View style={Styles.container}>
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
      

          {
              loading ? (
                  < ActivityIndicator size = "large" color = "#da552f" />
              ) 
              :
              (<View style = {Styles.items}>
                    <FlatList
                      data={referal}
                      style = {{width: "90%"}}
                      keyExtractor = {(item) => `${item.idreservein}`}
                      showsVerticalScrollIndicator={false}
                      renderItem={({item}) => (
                      
                          <TouchableOpacity
                              onPress = { () => toggleModal()}
                              
                              style = {Styles.item}
                          >
                          
                              <View style = {Styles.containerTexto}>
                              
                                  <Text style = {Styles.desc}> <Text style = {Styles.texto} > De : </Text> {item.reservefrom.address} </Text>
                                  <Text style = {Styles.desc}> <Text style = {Styles.texto} > Para: </Text> {item.reserveto.address} </Text>
                                  <Text style = {Styles.desc}> <Text style = {Styles.texto} > Data: </Text> {item.reservedate} </Text>
                                  <Text style = {Styles.desc}> <Text style = {Styles.texto} > Valor: </Text> {item.price} </Text>
                                  <Text style = {Styles.desc2(item.cor)}> <Text style = {Styles.texto} > Status: </Text> {item.status} </Text>
                              </View>
                          </TouchableOpacity>
                      )}
                  />
                </View>
                 
              )
          }


    </View>
  );
}

export default Historico;
                  