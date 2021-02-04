import React, { useState, useRef, useEffect } from 'react'
import { View, Text } from 'react-native'
import Modal from 'react-native-modal';
import RadioButtonRN from 'radio-buttons-react-native';
import axios from 'axios'
import api from './../../api'

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
    
    CloseButton,
    CloseButtonText,
    AddButton,
    ContainerBoxBtn,
    AddButtonText,
    ContainerBox2
} from './styles'

import planos from './../../assets/car.jpg'


export default function Details( props ) {
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
            console.log("erro ao enviar notify", err.response.data)
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
                  await response.data.info.map((item,index) => {
                      console.log(item)
                      if(item)array.push(item)
                      
                  })
                  console.log(array)
                  await  notify(Response.data,array)
                })
              .catch(err => console.log("Token not GET=> ", err.response.data))
            
          
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
                    
                
                }} >
                <RequestButtonText>
                    Viajar agora
                </RequestButtonText>
            </RequestButton>
        </Container>
    )
}
