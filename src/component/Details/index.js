import React, { useState, useRef } from 'react'
import { View, Text } from 'react-native'
import Modal from 'react-native-modal';
import RadioButtonRN from 'radio-buttons-react-native';

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
} from './styles'

import planos from './../../assets/car.jpg'


export default function Details() {

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

    function handleSubmit(){
        const data = { 
            way: selectedPlan,
            passanger,
            payMethod,

            
        }
    }





    return (
        <Container>
           
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
                        <TypeTitle> AO { Math.floor(price)}</TypeTitle>
                    </ContainerBox2>
                </ContainerBoxDiv>
                
            </ContainerBox2>
            
            <RequestButton onPress = { () => { }} >
                <RequestButtonText>
                    Viajar agora
                </RequestButtonText>
            </RequestButton>
        </Container>
    )
}
