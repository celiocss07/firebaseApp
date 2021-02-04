import React, { useEffect, useState, useRef, Fragment} from 'react'
import { View, Text, StyleSheet, PermissionsAndroid, Image, Alert } from 'react-native'
import MapView, { Marker} from "react-native-maps";
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import messaging from '@react-native-firebase/messaging';
import Modal from 'react-native-modal';
import RadioButtonRN from 'radio-buttons-react-native';
import axios from 'axios'
import api from './../../api'
import AwesomeAlert from 'react-native-awesome-alerts';

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

export default function Map() {
  navigator.geolocation = require("react-native-geolocation-service")
  Geocoder.init("AIzaSyBPFyNBUARMRtPaEGFYZEEL-_ZId8fwRuc")

  function DetailsComing( props ) {


    return (
        <Container>
            <ContainerBox style={{borderBottomWidth:1, flexDirection: "column"}}>
                
                <ContainerBox2 style={{justifyContent: "center", paddingLeft:16, marginBottom:8, borderBottomWidth:1, paddingBottom: 8}} >
                    <TypeImage source={ { uri: "https://img2.gratispng.com/20180401/rle/kisspng-computer-icons-user-profile-male-user-5ac10d05430db1.7381637515226012212747.jpg"}} style={{width:40, height:40, marginRight:8}} />

                    <TypeTitle style={{fontSize:29}}>{driverInfo?.username} </TypeTitle>
                    
                </ContainerBox2>

                <ContainerBox2 style={{justifyContent: "space-between", paddingLeft:16,marginBottom:8, paddingRight:16}}  >
                
                    <TypeTitle style={{fontSize:16}}>Marca: {driverInfo?.tradecar} </TypeTitle>
                    <TypeTitle style={{fontSize:16}}>Modelo: {driverInfo?.modelcar} </TypeTitle>
                    
                </ContainerBox2>
                <ContainerBox2 style={{justifyContent: "space-between", paddingLeft:16,marginBottom:8,paddingRight:16}}  >
                
                   
                    <TypeTitle style={{fontSize:16}}>Matricula:  {driverInfo?.registrationcar} </TypeTitle>
                    <TypeTitle style={{fontSize:16}}>Cor:  {driverInfo?.registrationcar} </TypeTitle>
                    
                </ContainerBox2>
            </ContainerBox>
        </Container>
    )
}



   function Details( props ) {
    console.log("Tela de Detalhes => ",props)

    const [selectedPlan, setSelectedPlan] = useState('Economico')
    const [payMethod, setPayMethod] = useState('Multicaixa')
    const [passanger, setPassanger] = useState(1)
    const [price, setPrice] = useState(1345)
    const [isVisible, setIsVisible] = useState(false)
    const [isVisiblePlan, setIsVisiblePlan] = useState(false)
    const Economic = useRef()
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
    

    function selectPayMethod() {
        setIsVisible(!isVisible)
    }
    function selectPlan() {
        setIsVisiblePlan(!isVisiblePlan)
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
                    "title":"FCM Message"
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
          if(rr.response){
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
        
        
        await api.post("/confirm-drive",{

            ...data,
 
        }
        ).then( async (Response) => {
            console.log("Feito com sucesso => ",Response.data)
            console.log("Dados => ",data)

           await  api.get('/driver-player-id')
              .then( async(response) => {
                  console.log(" GET=> ",response.data.info)
                  let array = []
                  if(response.data.info){
                    await response.data.info.map((item,index) => {
                      console.log(item)
                      if(item)array.push(item)
                     notify(Response.data,array)
                  })
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
                        <Text>Selecione o metodo de pagamento</Text>
                        <RadioButtonRN
                            data={Plan}
                            initial={selectedPlan=="Economico"?1:2}
                            selectedBtn={(e) => {
                                console.log(e)
                                
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
                        <TypeImage source={planos} />
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
                    <TypeTitle>Cotaçao</TypeTitle>

                    <ContainerBox2>
                        <TypeTitle> AO { props.data.price}</TypeTitle>
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
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121
  })
  const [carros, setCarros] = useState([])
  const [ destination, setDestination ] = useState(null)
  const [ myAddress, setMyaddress ] = useState(null)
  const [ duration, setDuration ] = useState(null)
  const [ distance, setDistance ] = useState(null)
  const [ myToken, setMyToken ] = useState(null)
  let [aux, setAux] = useState({})
  let[driverInfo , setDriverInfo] = useState(null)
  const [showAlert, setShowAlert] = useState(false);
  const [messageModal, setMessageModal] = useState('none');
  const [titleModal, setTitleModal] = useState('none');
  const [colorButton, setColorButton] = useState('green');
  const [alertMsgStyle, setAlertMsgStyle] = useState({fontSize:16, textAlign:'center'});

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
                coordinate={{latitude:point.latitude, longitude:point.longitude}}  
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
      

      

      useEffect(
        () => {
          Driver()
          const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log(remoteMessage)
            if(remoteMessage.data.accepted){
                //setDriverInfo(JSON.parse(remoteMessage.data.dataInfo))
                console.log(JSON.parse(remoteMessage.data.accepted).username)
                api.get("/drivers-status",{
  
                })
                .then( response => {
                  console.log(" Position Drivers IN NOTIFY => ", response.data.find(e => e.username==JSON.parse(remoteMessage.data.accepted).username))
                  setCarros([response.data.find(e => e.username==JSON.parse(remoteMessage.data.accepted).username)])
                  setDriverInfo(response.data.find(e => e.username==JSON.parse(remoteMessage.data.accepted).username))
                  
                setColorButton('orange')
                setAlertMsgStyle({fontSize:16,fontWeight: 'normal', textAlign: 'center'})
                setMessageModal("Sua corrida foi aceite, seu motrista está a caminho!")
                setTitleModal("Viagem aceite")
                setShowAlert(true)
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
              Driver()
              setDriverInfo(null)
              setColorButton('orange')
              setAlertMsgStyle({fontSize:16,fontWeight: 'normal', textAlign: 'center'})
                setMessageModal("Seu motorista está pronto para viagem, por favor dirija-te ao local de recolha!")
                setTitleModal("Viagem pronta")
                setShowAlert(true)
            }
          });
          messaging()
          .getToken()
          .then(token => {
            setMyToken(token)
            console.log(token);
          });

          messaging().onNotificationOpenedApp(remoteMessage => {
            console.log(
              'Notification caused app to open from background state:',
              remoteMessage.notification,
            );
            //navigation.navigate(remoteMessage.data.type);
          });

          


          requestUserPermission()
          Geolocation.getCurrentPosition(
            async ({ coords: { latitude, longitude}}) => {
                const response = await Geocoder.from({latitude,longitude})
                const address = response.results[0].formatted_address.split(',')
                console.log(address)
                setMyaddress(`${address[0]},${address[1]} `)
                setMyLocation({
                    latitude,
                    longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121
                })
            },
            ( error) => {
                console.log(error.code, error.message)
                permission()
            },
            {
              enableHighAccuracy: true,
              maximumAge:10000,
              timeout: 10000,
              forceRequestLocation: true
            }
          )
          return unsubscribe;
        },[]
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

    return (
        <View style={styles.container}>
          {
            driverInfo ? 
            <Fragment>
                < DetailsComing />
            </Fragment>
            :
            <Fragment>
              
            </Fragment>
          }
          
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
        >
          {
            driverInfo ? (
              <Fragment>

                    < Directions 
                          origin={myLocation}
                          destination={{latitude: driverInfo.latitude,longitude: driverInfo.longitude}}
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
                              "player_id": myToken
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
