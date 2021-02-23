import React, { useEffect, useState, useRef, Fragment} from 'react'
import { View, Text, StyleSheet, PermissionsAndroid, Image, Alert, TextInput, TouchableOpacity, ActivityIndicator, Linking, AppState } from 'react-native'
import MapView, { Marker} from "react-native-maps";
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import messaging from '@react-native-firebase/messaging';
import Modal from 'react-native-modal';
import RadioButtonRN from 'radio-buttons-react-native';
import api from './../../api'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';
import { io } from "socket.io-client";


import {
  styles, 
  LocationBox, 
  LocationText,
  LocationTimeBox,
  LocationTimeText,
  LocationTimeTextSmall ,
  Back
}from './style'
import { 
  Container, 
  TypeTitle, 
  TypeDescription, 
  TypeImage, 
  RequestButton,
  RequestButtonText,
  ContainerBox,
  BackgroundButton,
  ContainerBoxDiv,
  style,
  CloseButton,
  CloseButtonText,
  AddButton,
  ContainerBoxBtn,
  AddButtonText,
  ContainerBox2
} from './../Details/styles'
import Search from './../Search'
import Directions from './../Directions'
import MarkerImage from './../../assets/user.png'
import driverImage from './../../assets/driverIcon.png'
import BackImage from './../../assets/left-arrow.png'
//import Details from '../Details';
import planos from './../../assets/car.jpg'

const socket = io("http://192.168.100.7:8082");



export default function Map() {
  

  navigator.geolocation = require("react-native-geolocation-service")
  Geocoder.init("AIzaSyBPFyNBUARMRtPaEGFYZEEL-_ZId8fwRuc")
    socket.on('notification',(data)=> {
      console.log("SOCKET",data)
})
  function DetailsComing( props ) {
    function call(){

      console.log("+++++++++callNumber ", phoneNumber);
      let phoneNumber = driverInfo?.phonenumber;
      if (Platform.OS !== "android") {
        phoneNumber = `telprompt:${phoneNumber}`;
      } else {
        phoneNumber = `tel:${phoneNumber}`;
      }
      Linking.canOpenURL(phoneNumber)
        .then(supported => {
          if (!supported) {
            Alert.alert("Number is not available");
          } else {
            return Linking.openURL(phoneNumber);
          }
        })
        .catch(err => console.log(err));
        
    };
    

    return (
        <Container>
            <ContainerBox style={{borderBottomWidth:1, flexDirection: "column"}}>
                
                <ContainerBox2 style={{justifyContent: "flex-start", paddingLeft:16, marginBottom:8, borderBottomWidth:1, paddingBottom: 8}}>
                <ContainerBoxDiv  style={{flexDirection:"row", justifyContent:"flex-start", width: "70%"}}>
                    <TypeImage source={ { uri: driverInfo?.photo ? driverInfo?.photo : "https://img2.gratispng.com/20180401/rle/kisspng-computer-icons-user-profile-male-user-5ac10d05430db1.7381637515226012212747.jpg"}} style={{width:40, height:40, marginRight:8}} />

                    <TypeTitle style={{fontSize:20}}>{driverInfo?.username} </TypeTitle>
                    
                </ContainerBoxDiv>
                <ContainerBoxDiv style={{flexDirection:"row",justifyContent:"space-around", width: "30%"}} >
                  <TouchableOpacity onPress={() => {
                        call()
                  }}
                    style={
                      {
                        width: 40,
                        height: 40,
                        borderRadius: 100,
                        
                        justifyContent: "center",
                        alignItems: "center"
                      }
                    }
                  >
                      <TypeImage source={ require('../../assets/call.png') } style={{width:32, height:32}} />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={async () => {
                        //call()
                        const url = await `sms:${driverInfo?.phonenumber}${Platform.OS === "ios" ? "&" : "?"}body=${"Olá, caro motorista!"}`

                        await Linking.openURL(url);
                  }}
                    style={
                      {
                        width: 40,
                        height: 40,
                        borderRadius: 100,
                        
                        justifyContent: "center",
                        alignItems: "center"
                      }
                    }
                  >
                      <TypeImage source={ require('../../assets/sms.png') } style={{width:32, height:32}} />
                  </TouchableOpacity>
                    

                    
                    
                </ContainerBoxDiv>
                </ContainerBox2>

                <ContainerBox2 style={{justifyContent: "space-between", paddingLeft:16,marginBottom:8, paddingRight:16}}  >
                
                    <TypeTitle style={{fontSize:16}}>Marca: {driverInfo?.tradecar} </TypeTitle>
                    <TypeTitle style={{fontSize:16}}>Modelo: {driverInfo?.modelcar} </TypeTitle>
                    
                </ContainerBox2>
                <ContainerBox2 style={{justifyContent: "space-between", paddingLeft:16,marginBottom:8,paddingRight:16}}  >
                
                   
                    <TypeTitle style={{fontSize:16}}>Matricula:  {driverInfo?.registrationcar} </TypeTitle>
                    <TypeTitle style={{fontSize:16}}>Cor:  {driverInfo?.colorcar} </TypeTitle>
                    
                </ContainerBox2>

                
                
                
            </ContainerBox>
            { ok ?<Fragment>
                   <RequestButton 
                onPress = { async () => { 
                    
                    setVisivel(true)
                
                }} 
                style={{
                  backgroundColor:"red"
                }}
                
                >
                   
                
                <RequestButtonText>
                    Cancelar viagem
                </RequestButtonText>
                </RequestButton>
                 </Fragment>
                 :
                 <Fragment>
                   
                 </Fragment>
            }
            
               
        </Container>
    )
}
   function Details( props ) {
    console.log("Tela de Detalhes => ",props)

    const [selectedPlan, setSelectedPlan] = useState('Economico')
    const [payMethod, setPayMethod] = useState('Multicaixa')
    const [passanger, setPassanger] = useState(1)
    const [price, setPrice] = useState((Math.round(props.data.distance) < 3 ? priceEco?.initial_price : ((Math.round(props.data.distance) - 3) * priceEco?.fees_by_3k) + priceEco?.initial_price ))
    const [isVisible, setIsVisible] = useState(false)
    const [isVisiblePlan, setIsVisiblePlan] = useState(false)
    const Economic = useRef()
    const [image, setImage] = useState( require('./../../assets/classe_A.jpg') );
   
    //const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const Method = [
        {
          label: 'Multicaixa'
         },
         {
          label: 'Dinheiro'
         }
        ];
        const Plan = [
            {
              label: 'Economico'
             },
             {
              label: 'Plus'
             }
            ];
            const ser = {
              classe_A: require('./../../assets/classe_A.jpg'),
              classe_B: require('./../../assets/Classe_B.jpg'),
             }
    

    function selectPayMethod() {
        setIsVisible(!isVisible)
    }
    function selectPlan() {
        setIsVisiblePlan(!isVisiblePlan)
//(Math.round(props.data.distance) < 3 ? priceEco?.initial_price : ((Math.round(props.data.distance) - 3) * priceEco?.fees_by_3k) + priceEco?.initial_price )
        
    }

    function addPassenger() {
        passanger == 4 ? setPassanger(1) : setPassanger(passanger + 1)
    }
    function lessPassenger() {
        passanger == 1 ? setPassanger(4) : setPassanger(passanger - 1)
    }
    function notify(dataInfo, token) {
console.log("tokennnn => ", token)
        axios.post("https://fcm.googleapis.com/fcm/send",{
            "data": {dataInfo}, 

            "notification":{
                    "body":"This is an FCM notification message!",
                    "title":"FCM Message",
                    "sound": "app_som.mp3"
                  },
            "registration_ids":token
        },{
            headers: {
           
                'Content-Type': 'application/json',
                'Authorization': 'key=AAAAo6GbIK4:APA91bFzcFr2Vk7vLeqSxtLX6u5q6dP5AUJtRVCn3lpaSvy3kyq6rcNErXnuC3EWyvf9FlyAo3eAXQ5zXXwhuPYa2AHl6bBQlWcrmoezbYyI8I_MxqBw-ef4Z59TPxBTeOXPWm8CkQDN',
                
        
            }
        }).then( Response => {
            console.log("Feito com sucesso notify => ",Response.data)
        })
        .catch(err => {
          if(err.response){
            console.log("erro ao enviar notify", err.response.data)
          }else{
            console.log("erro ao fazer pedido", err)
          }
            
        })
    } 

    async function  handleSubmit(){
        const data = await props.data
        data.passenger = await passanger
        data.paymethod = payMethod=="Multicaixa" ? "card" : "cash"
        data.price = price
        data.idcategory = selectedPlan=="Economico"?1:2
        
        await api.post("/confirm-drive",{

            ...data,
 
        }
        ).then( async (Response) => {
            console.log("Feito com sucesso => ",Response.data)
            setReserveInfo(Response.data)
            console.log("Dados => ",data)

           await  api.get('/driver-player-id')
              .then( async(response) => {
                  console.log(" GET=> ",response.data.info)
                  let array = []
                  if(response.data.info){
                    await response.data.info.map((item,index) => {
                      console.log(item)
                      if(item)array.push(item)
                     
                  })
                  notify(Response.data,array)
                  }else{
                          setColorButton('orange')
                          setMessageModal(`De momento nāo temos motoristas disponíveis, por favor tente mais tarde!`)
                          setTitleModal("Sem motoristas")
                          setShowAlert(true)
                          setAlertMsgStyle({textAlign: 'center'})
                  }
                  
                  console.log(array)
                  
                })
              .catch(err => {
                if(err.Response){
                  console.log("Token not GET=> ", err.response.data)
                }else{
                  console.log("Token not => ", err)
                }
              })
            
          
        })
        .catch(err => {
            console.log("erro ao enviar", err.response.data)
        })


    }
    function handle(){

    }
    useEffect( 
        ( ) =>{
            console.log("first => ", props.data.distance)
        },[]
    )





    return (
        <Container aux = { () => {return false} } >
           
            <Modal isVisible={isVisible} >
                <View style={{ flex: 1 , justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{backgroundColor: '#FFF', padding:24, width: '80%' }}>
                        <Text>Selecione o metodo de pagamento</Text>
                        <RadioButtonRN
                            data={Method}
                            initial={payMethod=="Multicaixa"?1:2}
                            selectedBtn={(e) => {
                                console.log(e)
                                
                                e.label == "Multicaixa" ? setPayMethod("Multicaixa") : setPayMethod("Dinheiro")
                            }}
                        />

                    </View>
                    <CloseButton onPress = { ( ) => { 
                        selectPayMethod()
                    }}>
                        <CloseButtonText>X</CloseButtonText>
                    </CloseButton>
                </View>
            </Modal>

            <Modal isVisible={isVisiblePlan} >
                <View style={{ flex: 1 , justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{backgroundColor: '#FFF', padding:24, width: '80%' }}>
                        <Text>Selecione o plano</Text>
                        <RadioButtonRN
                            data={Plan}
                            initial={selectedPlan=="Economico"?1:2}
                            selectedBtn={(e) => {
                                console.log(e)
                                if(selectedPlan=="Economico"){
                                  setImage(ser.classe_A)
                                  setPrice((Math.round(props.data.distance) < 3 ? priceEco?.initial_price : ((Math.round(props.data.distance) - 3) * priceEco?.fees_by_3k) + priceEco?.initial_price ))
                                }else{
                                  setImage(ser.classe_B)
                                  setPrice(Math.round(props.data.distance)< 3 ? pricePlus?.initial_price : ((Math.round(props.data.distance) - 3) * pricePlus?.fees_by_3k) + pricePlus?.initial_price )
                            
                                }
                                e.label == "Economico" ? setSelectedPlan("Economico") : setSelectedPlan("Plus")
                            }}
                        />

                    </View>
                    <CloseButton onPress = { ( ) => { 
                        selectPlan()
                    }}>
                        <CloseButtonText>X</CloseButtonText>
                    </CloseButton>
                </View>
            </Modal>
            
            <ContainerBox style={{borderBottomWidth:1}}>
                <BackgroundButton onPress={ ( ) => { 
                    selectPlan()
                    } } 
                    style={{ backgroundColor: '#FFF'}} 
                    >
                        <TypeImage source={image} />
                        <TypeDescription> {selectedPlan} </TypeDescription>
                </BackgroundButton>

                <ContainerBoxDiv>
                    <TypeTitle>Passageiros</TypeTitle>

                    <ContainerBox2>
                        <AddButton onPress = { ( ) => { 
                            lessPassenger()
                        }}>
                            <AddButtonText>-</AddButtonText>
                        </AddButton>

                        <TypeDescription> {passanger} </TypeDescription>

                        <AddButton onPress = { ( ) => {
                            addPassenger()
                         }}>
                            <AddButtonText>+</AddButtonText>
                        </AddButton>
                    </ContainerBox2>
                </ContainerBoxDiv>
            
            
            </ContainerBox>
                
            <ContainerBox2>
                <ContainerBoxBtn onPress={ ( ) => selectPayMethod()}>
                    <TypeTitle>Pagamento</TypeTitle>
                    <TypeDescription> {payMethod} </TypeDescription>
                </ContainerBoxBtn>

                <ContainerBoxDiv style={{borderLeftWidth:1}}>
                    <TypeTitle>Estimativa</TypeTitle>

                    <ContainerBox2>
                        <TypeTitle> AO { price}</TypeTitle>
                    </ContainerBox2>
                </ContainerBoxDiv>
                
            </ContainerBox2>
            
            <RequestButton 
                onPress = { async () => { 
                    await handleSubmit()
                    await handleBack()
                    
                
                }} >
                <RequestButtonText>
                    Viajar agora
                </RequestButtonText>
            </RequestButton>
        </Container>
    )
}
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  const [myLocation,setMyLocation] = useState({ 
    latitude:-8.827041762379073,
    longitude:13.244275691630248,
    latitudeDelta: 0.0045,
    longitudeDelta: 0.0045
  })
  const [location,setLocation] = useState(null)
  const [carros, setCarros] = useState([])
  const [ destination, setDestination ] = useState(null)
  const [ myAddress, setMyaddress ] = useState(null)
  const [ duration, setDuration ] = useState(null)
  const [ distance, setDistance ] = useState(null)
  const [ myToken, setMyToken ] = useState(null)
  let [aux, setAux] = useState({})
  let [pricePlus, setPricePlus] = useState(0)
  let [priceEco, setPriceEco] = useState(0)
  let[driverInfo , setDriverInfo] = useState(null)
  const [showAlert, setShowAlert] = useState(false);
  const [ok, setOk] = useState(true);
  const [messageModal, setMessageModal] = useState('none');
  const [titleModal, setTitleModal] = useState('none');
  const [colorButton, setColorButton] = useState('green');
  const [alertMsgStyle, setAlertMsgStyle] = useState({fontSize:16, textAlign:'center'});
  const [reserveInfo, setReserveInfo] = useState(null)
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
    async function permission() {
        PermissionsAndroid.requestMultiple(
              [
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
              ],
              {
                  title: 'Give Location Permission',
                  message: 'App needs location permission to find your position.'
              }
          ).then(granted => {
            console.log(granted);
            
            //resolve();
          }).catch(err => {
            console.warn(err);
            //reject(err);
          });
      }

      function handleBack() {
        setDestination(null)
      }
      function handleInfo( result) {
        console.log(result.distance,result.duration)
        setDistance(Math.floor(result.distance))
        setDuration(Math.floor(result.duration))
        

      }
      function handleZoom(result) {
        mapView.fitToCoordinates(result.coordinates,{
          edgePadding: {
            right: (20),
            bottom: (500),
            left: (40),
            top: (20),
          }
         });
      }
      
      function RenderAnotations(){
        return(
          carros.map((point, index) => (
            <Marker 
                coordinate={{latitude:point?.latitude, longitude:point?.longitude}}  
                image={ driverImage} 
                key={`${index}-PointAnnotation`}
            >
                          
              </Marker>
          ))
        )
      }
      async function Driver() {
        api.get("/drivers-status",{
  
        })
        .then( response => {
          console.log(" Position Drivers => ", response.data)
          setCarros(response.data)
        })
        .catch( err => {
          if(err.response){
            console.log(" Erro na requisição => ", err.response.data)
          }else{
            console.log(" Erro na app => ", err)
          }
        })
  } 

      function handleSubmit(  ) {
       

        //setReserve(aux)
        

        console.log(aux)
      }
      
      function priceValues(){
        api.get('get-fees')
        .then( res => {
          console.log(res.data[0].fees_by_3k,res.data[1].fees_by_3k)
          setPriceEco(res.data[0])
          setPricePlus(res.data[1])
        })
        .catch(err => {
          console.warn("PRICE UPDATE ",err.response.data)
        })
      }
      const _handleAppStateChange = async (nextAppState) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === "active"
        ) {
          console.log("App has come to the foreground!");
          let json = await AsyncStorage.getItem("reserve")
          json = JSON.parse(json)
              console.log("JSON", json)

              if(json.accepted){
                //setDriverInfo(JSON.parse(remoteMessage.data.dataInfo))
                console.log(JSON.parse(json.accepted))
                api.get("/drivers-status",{
  
                })
                .then( response => {
                  setColorButton('orange')
                setAlertMsgStyle({fontSize:16,fontWeight: 'normal', textAlign: 'center'})
                setMessageModal("Sua corrida foi aceite, seu motorista está a caminho!")
                setTitleModal("Viagem aceite")
                setShowAlert(true)
                
                  console.log(" Position Drivers IN NOTIFY => ", response.data.find(e => e.username==JSON.parse(json.accepted).username))
                  setCarros([response.data.find(e => e.username==JSON.parse(json.accepted).username)])
                  setLocation(response.data.find(e => e.username==JSON.parse(json.accepted).username))
                  setDriverInfo(response.data.find(e => e.username==JSON.parse(json.accepted).username))
                
                })
                .catch( err => {
                  if(err.response){
                    console.log(" Erro na requisição => ", err.response.data)
                  }else{
                    console.log(" Erro na app => ", err)
                  }
                })
                console.log(carros)

            }else if(json.inLocal){
              console.log(JSON.parse(json.inLocal))
              setLocation({
                latitude: JSON.parse(json.inLocal).to.lat,
                longitude: JSON.parse(json.inLocal).to.lon
              })
              setOk(false)
              //Driver()
              //setDriverInfo(null)
              //setColorButton('orange')
              //setAlertMsgStyle({fontSize:16,fontWeight: 'normal', textAlign: 'center'})
              //setMessageModal("A Call Táxi deseja-lhe uma boa viagem!")
              //setTitleModal("Viagem pronta")
              //setShowAlert(true)
            }else if(json.finished){
              console.log(JSON.parse(json.finished)?.reserveInfo?.price)
              setOk(true)
              setDriverInfo(null)
              
              setLocation(null)
              setColorButton('green')
              setAlertMsgStyle({fontSize:16,fontWeight: 'normal', textAlign: 'center'})
              setMessageModal(`O valor da sua viagem é ${JSON.parse(json.finished)?.reserveInfo?.price} Kz \n Obrigado por viajar com a Call Táxi!`)
              setTitleModal("Viagem Terminada")
              setShowAlert(true)
              driverImage()
              setOk(true)
              await AsyncStorage.removeItem("reserve")
            }else if(json.cancelled){
              await AsyncStorage.removeItem("reserve")
              setOk(true)
              setDriverInfo(null)
              setLocation(null)
              driverImage()
              setOk(true)
            }
              

        }
    
        appState.current = nextAppState;
        setAppStateVisible(appState.current);
        console.log("AppState", appState.current);
      };
      

      useEffect(
        () => {
          AppState.addEventListener("change", _handleAppStateChange);
          //console.log("LINKING", Linking.getInitialURL())
          Driver()
          priceValues()
          const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log(remoteMessage.data)
            if(remoteMessage.data.accepted){
                //setDriverInfo(JSON.parse(remoteMessage.data.dataInfo))
                console.log(JSON.parse(remoteMessage.data.accepted))
                api.get("/drivers-status",{
  
                })
                .then( response => {
                  setColorButton('orange')
                setAlertMsgStyle({fontSize:16,fontWeight: 'normal', textAlign: 'center'})
                setMessageModal("Sua corrida foi aceite, seu motorista está a caminho!")
                setTitleModal("Viagem aceite")
                setShowAlert(true)
                
                  console.log(" Position Drivers IN NOTIFY => ", response.data.find(e => e.username==JSON.parse(remoteMessage.data.accepted).username))
                  setCarros([response.data.find(e => e.username==JSON.parse(remoteMessage.data.accepted).username)])
                  setLocation(response.data.find(e => e.username==JSON.parse(remoteMessage.data.accepted).username))
                  setDriverInfo(response.data.find(e => e.username==JSON.parse(remoteMessage.data.accepted).username))
                
                })
                .catch( err => {
                  if(err.response){
                    console.log(" Erro na requisição => ", err.response.data)
                  }else{
                    console.log(" Erro na app => ", err)
                  }
                })
                console.log(carros)

            }else if(remoteMessage.data.inLocal){
              console.log(JSON.parse(remoteMessage.data.inLocal))
              setLocation({
                latitude: JSON.parse(remoteMessage.data.inLocal).to.lat,
                longitude: JSON.parse(remoteMessage.data.inLocal).to.lon
              })
              setOk(false)
              //Driver()
              //setDriverInfo(null)
              //setColorButton('orange')
              //setAlertMsgStyle({fontSize:16,fontWeight: 'normal', textAlign: 'center'})
              //setMessageModal("A Call Táxi deseja-lhe uma boa viagem!")
              //setTitleModal("Viagem pronta")
              //setShowAlert(true)
            }else if(remoteMessage.data.finished){
              console.log(JSON.parse(remoteMessage.data.finished)?.reserveInfo?.price)
              setOk(true)
              setDriverInfo(null)
              await AsyncStorage.removeItem("reserve")
              setLocation(null)
              setColorButton('green')
              setAlertMsgStyle({fontSize:16,fontWeight: 'normal', textAlign: 'center'})
              setMessageModal(`O valor da sua viagem é ${JSON.parse(remoteMessage.data.finished)?.reserveInfo?.price} Kz \n Obrigado por viajar com a Call Táxi!`)
              setTitleModal("Viagem Terminada")
              setShowAlert(true)
              driverImage()
              setOk(true)
            }else if(remoteMessage.data.cancelled){
              await AsyncStorage.removeItem("reserve")
              setOk(true)
              setDriverInfo(null)
              setLocation(null)
              driverImage()
              setOk(true)
            }


          });

          messaging()
          .getToken()
          .then(token => {
            setMyToken(token)
            api.post("set-player-id-user", {
              player_id: token
            })
            .then( res => {
              console.log("Token actualizado com sucesso!")
            })
            .catch(err => {
              console.log("ERRO AO ACTUALIZAR TOKEN ")
            })

            console.log(token);
          });

          messaging().onNotificationOpenedApp(remoteMessage => {
            console.log(
              'Notification caused app to open from background state:',
              remoteMessage,
            );
            //navigation.navigate(remoteMessage.data.type);
          });

          messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('Message handled in the background!', remoteMessage);
            if(remoteMessage.data.accepted){
              //setDriverInfo(JSON.parse(remoteMessage.data.dataInfo))
              console.log(JSON.parse(remoteMessage.data.accepted))
              await AsyncStorage.setItem("reserve",JSON.stringify(remoteMessage.data))
              const json = await AsyncStorage.getItem("reserve")
              console.log("JSON", json)

          }else if(remoteMessage.data.inLocal){
            console.log(JSON.parse(remoteMessage.data.inLocal))
            await AsyncStorage.setItem("reserve",JSON.stringify(remoteMessage.data))
            const json = await AsyncStorage.getItem("reserve")
              console.log("JSON", json)

          }else if(remoteMessage.data.finished){
            console.log(JSON.parse(remoteMessage.data.finished)?.reserveInfo?.price)
            await AsyncStorage.setItem("reserve",JSON.stringify(remoteMessage.data))
            const json = await AsyncStorage.getItem("reserve")
              console.log("JSON", json)

          }else if(remoteMessage.data.cancelled){
            await AsyncStorage.setItem("reserve",JSON.stringify(remoteMessage.data))
           
            const json = await AsyncStorage.getItem("reserve")
              console.log("JSON", json)
          }
            
          });

          


          requestUserPermission()
          Geolocation.watchPosition(
            async ({ coords: { latitude, longitude}}) => {
                const response = await Geocoder.from({latitude,longitude})
                const address = response.results[0].formatted_address.split(',')
                console.log(address)
                setMyaddress(`${address[0]},${address[1]} `)
                setMyLocation({
                    latitude,
                    longitude,
                    latitudeDelta: 0.0045,
                    longitudeDelta: 0.0045
                })
            },
            ( error) => {
                console.log(error.code, error.message)
                permission()
            },
            {
              enableHighAccuracy: true,
              timeout: 20000,
              maximumAge: 10000,
              distanceFilter: 50
            }
          )
          return () => {
            AppState.removeEventListener("change", _handleAppStateChange);
            unsubscribe;
          }
        },[myLocation]
      )

        function handleLocationSelected( data, { geometry }) {
            const { location: { lat: latitude, lng: longitude } } = geometry
            console.log(data.structured_formatting.main_text)
            setDestination( 
              {
                latitude,
                longitude,
                title: data.structured_formatting.main_text,

              }
            )
        }
        const mapView = useRef()
        const [visivel, setVisivel] = useState(false)
        const [motivo, setMotivo] = useState(" ")
        const [buttonLoading, setButtonLoading] = useState(false)

    return (
        <View style={styles.container}>
         
          <Modal
        
        isVisible={visivel}
        animationInTiming={1000}
        animationOutTiming={1000}
        backdropTransitionInTiming={800}
        backdropTransitionOutTiming={800}>
          <View style={{width:"100%", height: "100%", justifyContent:"center", alignItems:"center"}}>

<View style={{width: "100%", backgroundColor:"#FFF", padding:16}}>

    <View style={{width:"100%", alignItems:"center"}}>
      <Text style={{fontSize: 19.5, fontWeight:"bold", marginBottom: 16}}>
          Qual é o motivo do cancelamento?
      </Text>
      <TextInput placeholder="Descreva o motivo do cancelamento" 
      textContentType={"fullStreetAddress"}

      onChange={ (e) => {
        setMotivo(e)
      }}
      value={motivo}
                style={{width:"90%", borderColor: "rgb(0,104,138)", borderWidth: 1, borderRadius:10 }} 
      />

      <TouchableOpacity 
            onPress = { () => {
              setButtonLoading(true)
              console.log("CONSOLE",reserveInfo)
              api.post('cancel-reserve-retracting',{
                idreserve: reserveInfo?.reservecode,
                // description: motivo
              })
              .then( async res => {
                console.log("reserva cancelada => ", res.data)
               await axios.post("https://fcm.googleapis.com/fcm/send",{
                        "data": {
                          cancelled:{
                            idreserve: reserveInfo?.reservecode
                        }}, 
            
                        "notification":{
                                "body":"O cliente cancelou viagem...",
                                "title":"Viagem Cancelada"
                                
                              },
                              "to":`${driverInfo?.player_id}`,
                              
                    },{
                        headers: {
                       
                            'Content-Type': 'application/json',
                            'Authorization': 'key=AAAAo6GbIK4:APA91bFzcFr2Vk7vLeqSxtLX6u5q6dP5AUJtRVCn3lpaSvy3kyq6rcNErXnuC3EWyvf9FlyAo3eAXQ5zXXwhuPYa2AHl6bBQlWcrmoezbYyI8I_MxqBw-ef4Z59TPxBTeOXPWm8CkQDN',
                            
                    
                        }
                    }).then( Response => {
                        console.log("cancelada com sucesso notify => ",Response.data)
                    })
                    .catch(err => {
                        console.log("erro ao cancelar notify", err.response.data)
                    })
                //notify(reserveInfo,res.data.players_id)
                await setDriverInfo(null)
                await setReserveInfo(null)
                await handleBack()
                await setVisivel(false)
                await setMotivo(" ")
                await setButtonLoading(false)
              })
              .catch( err => {
                if(err.response){
                  console.log("Falha ao cancelar viagem => ", err.response.data)
                }else{
                  console.log("ERRO NOT CANCELED ", err)
                }
              })

            }}
            style={{width:"90%", backgroundColor: "rgb(0,104,138)", borderRadius: 10,marginTop:32, height: 40, justifyContent: "center", alignItems:"center"}}
            
            >
              {
                                buttonLoading ? <ActivityIndicator size="small" color="#FFF" />
                                : <Text style={{fontWeight: "bold", fontSize: 19.5, color:"#FFF"}}>
                                Enviar 
                              </Text>
                            }
          
      </TouchableOpacity>
    </View>
    
</View>

<CloseButton onPress = { ( ) => { 
                        setVisivel(false)
                    }}
                      
                    >
                        <CloseButtonText>X</CloseButtonText>
                    </CloseButton>

</View>
      </Modal>
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
          messageStyle={alertMsgStyle}
          
        />
        <MapView
          
          style={styles.map}
          region={ myLocation }
          showsUserLocation
          loadingEnabled
          ref={ mapView}
          zoomControlEnabled={true}
          zoomEnabled={true}

        >
          {
            driverInfo ? (
              <Fragment>

                    < Directions 
                          origin={myLocation}
                          destination={{latitude: location.latitude,longitude: location.longitude}}
                          onReady={  async (result ) => {
                            console.log(result, driverInfo)
                            //setDuration(result.duration)
                            //await handleInfo(result)
                              mapView.current.fitToCoordinates(result.coordinates,{
                                edgePadding: {
                                  right: (20),
                                  bottom: (500),
                                  left: (40),
                                  top: (20),
                                }
                               }) 
                          }}
                      />
                    
                    
              </Fragment>
              )
              : 
              <Fragment></Fragment>
          }
          <RenderAnotations />

          {
            destination && (
              <Fragment>

                    < Directions 
                          origin={myLocation}
                          destination={destination}
                          onReady={  async (result ) => {
                            console.log(result, destination)
                            //setDuration(result.duration)
                            setAux ({
                              "reservefrom":{
                                "lat": myLocation.latitude,
                                "lon": myLocation.longitude,
                                "address": myAddress
                              },
                              "reserveto":{
                                "lat": destination.latitude,
                                "lon": destination.longitude,
                                "address": destination.title
                              },
                              "reservedate":"",
                              "paymethod": "card/cash",
                              "passenger": "",
                              "price": (Math.floor(result.distance) < 3 ? 1000 : ((Math.floor(result.distance) - 3) * 200) + 1000 ),
                              "expectedduration":Math.floor(result.duration),
                              "distance": Math.floor(result.distance),
                              "player_id": myToken,
                              "timeinit": "00:00",
                              "timeout": "00:00",
                              "idcategory": ""
                            })
                            handleSubmit()
                           
                             
                            //await handleInfo(result)
                              mapView.current.fitToCoordinates(result.coordinates,{
                                edgePadding: {
                                  right: (20),
                                  bottom: (500),
                                  left: (40),
                                  top: (20),
                                }
                               })
                              
                             
                             
                          }}
                      />
                    <Marker coordinate={destination}  image={ MarkerImage} >
                          <LocationBox>
                              <LocationText>
                                { destination.title}
                              </LocationText>
                          </LocationBox>
                    </Marker>

                    <Marker coordinate={myLocation}   >
                          <LocationBox>
                            <LocationTimeBox>
                              <LocationTimeText> { duration } </LocationTimeText>
                              <LocationTimeTextSmall> MIN </LocationTimeTextSmall>
                            </LocationTimeBox>
                              <LocationText>
                                { myAddress}
                              </LocationText>
                          </LocationBox>
                    </Marker>

                    
              </Fragment>
                
            )
          }
            
        </MapView>
       
       
        {
            driverInfo ? 
            <Fragment>
                < DetailsComing />
            </Fragment>
            :
            <Fragment>
              
            </Fragment>
          }
        {
          destination 
            ? <Fragment>
              
                  <Back onPress = { ( ) => handleBack()}>
                    <Image source={BackImage} style={{ width: 48, height: 48}} />
                  </Back>
                  <Details data = {aux} aux={ (ele) => console.log("ACTIVE",ele)} /> 
              </Fragment> 

            : 
            <Search onLocationSelected={ handleLocationSelected } />
            
         
        }

        
      </View>
    )
}
