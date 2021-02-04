import React, {useEffect, useState, useRef} from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, FlatList, Alert}  from 'react-native';
import Styles from './style'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal'
import axios from 'axios';
import api from './../../api'
import AwesomeAlert from 'react-native-awesome-alerts';


const Reservas = () => {

    const [loading, setLoading]  = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [referal, setReferal]  = useState();
    const [showAlert, setShowAlert] = useState(false);
    const [messageModal, setMessageModal] = useState('none');
    const [titleModal, setTitleModal] = useState('none');
    const [colorButton, setColorButton] = useState('green');
    let [obj, setObj] =useState();
 
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
      };
const aux = useRef("2");


  

async function getinfo(){

     
    
    setLoading(true)
    //console.log("\n \n \n => ", token)
    await api.get("/my-reserves")
    .then( async response => {
        if(response.status){
            if(response.status == 200){
                response.data.map((item, index ) => console.log("BURRO => ",item.reserveto))
                await setReferal(response.data);
            }
             if(response.status == 204)
             {
                 setMessageModal("Nenhuma reserva marcada!")
                 setTitleModal("Informação")
                 setShowAlert(true)
             }
            console.log(" CANCELADA => ",response.status)
        }

        
       //await console.log("HELLO", referal)
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
        //console.log("cdkwmc",err.response.data)
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
    <View>
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

    <View style = {Styles.items}>

                {
                    loading ? (
                        < ActivityIndicator size = "large" color = "#da552f" />
                    ) 
                    :
                    (
                        <FlatList
                            data={referal}
                            style = {{width: "90%"}}
                            keyExtractor = { (item) => `${item.idreserve}`}
                            showsVerticalScrollIndicator={false}

                            renderItem={({item}) => (

                                <TouchableOpacity
                                    onPress = { async () => {
                                       
                                    }}
                                    style = {Styles.item}
                                    ref={aux}
                                >
                                    
                                    

                                    <View style = {Styles.containerTexto}>
                                        <Text style = {Styles.desc}> <Text style = {Styles.texto} > De : </Text> {item.reservefrom.address} </Text>
                                        <Text style = {Styles.desc}> <Text style = {Styles.texto} > Para: </Text> {item.reserveto.address} </Text>
                                        <Text style = {Styles.desc}> <Text style = {Styles.texto} > Data: </Text> {item.reservedate} </Text>


                                        <Modal 
                                            isVisible={isModalVisible}
                                            style={{justifyContent: "space-around", alignItems:"center"}}
                                    >

                                        
                                            <View style={{backgroundColor:"#FFF", width: "100%", height:"80%", borderRadius: 10,}} >
                                                    <View style={{width: "100%", height:"40%", borderRadius: 10, padding:8}}>
                                                            <Image
                                                                    source={require('./../Imagens/routa.png')}
                                                                    style={{width:"100%", height:"100%", borderRadius: 10}}
                                                            />
                                                    </View>
                                                    <View style={{padding:24}}>
                                                        
                                                            <Text style = {Styles.desc}> <Text style = {Styles.texto} > De : </Text> {item.reservefrom} </Text>
                                                            <Text style = {Styles.desc}> <Text style = {Styles.texto} > Para: </Text> {item.reserveto} </Text>
                                                            <Text style = {Styles.desc}> <Text style = {Styles.texto} > Data: </Text> {item.reservedate} </Text>
                                                            <Text style = {Styles.desc}> <Text style = {Styles.texto} > Preço : </Text> {item.idreserve} </Text>
                                                            <Text style = {Styles.desc}> <Text style = {Styles.texto} > Passageiros: </Text> {item.passenger} </Text>
                                                            <Text style = {Styles.desc}> <Text style = {Styles.texto} > Duração: </Text> {item.expectedduration} </Text>
                                   
                                                    </View>
                                                    
                                            </View>
                                            <TouchableOpacity 
                                                    style={{width:50, height: 50, justifyContent: "center",alignItems: "center",backgroundColor: "rgba(0, 0, 0, 0.8)", borderRadius:100}}
                                                    onPress={toggleModal}
                                            >
                                                    <Text style={{color:"#FFF", fontWeight: "bold", fontSize:19}}> X </Text>
                                            </TouchableOpacity>
                                    </Modal>
                                    </View>
                                    <TouchableOpacity
                                            onPress={ async () => {
                                                const d= await referal.find((elem) => elem.idreserve == item.idreserve)
                                                api.post('/cancel-reserve',{
                                                    idreserve: d.idreserve
                                                })
                                                .then(response => {
                                                    console.log("Results => ",response.data)
                                                    getinfo()
                                                })
                                                .catch( err => {
                                                    console.log("Erro => ", err.response)
                                                })
                                            }}
                                    >
                                            <Image 
                                        source={require('./../Imagens/delete.png')}
                                    />
                                    </TouchableOpacity>
                                    
                                </TouchableOpacity>
                            )}
                        />
                    )
                }
            
          </View>
          
      
</View>
  );
}

export default Reservas;