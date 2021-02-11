import React, { Component, useEffect,useState, useRef} from 'react';
import { View, Image, Text, TouchableOpacity, Linking, TextInput, Alert, KeyboardAvoidingView } from 'react-native';
import axios from "axios";

import Style from './style2';
import api from './../../api'
export default function  Login (props) {
    
    const [code, setCode] = useState("");
    const [code1, setCode1] = useState("");
    const [code2, setCode2] = useState("");
    const [code3, setCode3] = useState("");
    const [code4, setCode4] = useState("");
    const [code5, setCode5] = useState("");

  const fourthInput = useRef()
  const secondtInput = useRef()
  const threeInput = useRef()
  const fivethInput = useRef()

    async function intialLogin() {
         
        
        console.log(code1+""+code2+""+code3+""+code4+""+code5)

      await api.post("/confirm-sign-up", {
             
               confirmcode: code1+""+code2+""+code3+""+code4+""+code5
           
       })
       .then(response => {
           console.log(response.data)
           props.navigation.navigate('Login')
       } )
       .catch(err => {
           console.log("cdkwmc",err)
          // Alert.alert("Código Errado!")
       })
   }
 
   return (
    <KeyboardAvoidingView style = { Style.container}>

        <ScrollView style={{width: "100%", padding: 16,}}>
        <View style={Style.containerLogo}>
            <Image 
              source= { require('../Imagens/Logo.png')}
              style= {Style.logo}
             />
             <View style={Style.containerTitle}>
                <Text style={Style.msg('flex')}>Código de confirmação</Text>
            </View>

        </View>
            
          
          <View style = {Style.containerForm}>

            <View>
                <Text style = { Style.text}> Insira o código enviado ao seu telemóvel</Text>

            </View>

                
            <View style={Style.containerInput}>
            
                  <TextInput  style = { Style.inputForm}
                  
                      onChangeText = { text => {
                        secondtInput.current.focus()
                        setCode1(text)
                      }}
                      returnKeyType={"next"}
                    
                  />

                  <TextInput  style = { Style.inputForm}
                  
                  onChangeText = { text => {
                    setCode2(text)
                    
                    threeInput.current.focus()
                    
                  }
                  }
                  returnKeyType={"next"}
                  ref={secondtInput}
                  />

                  <TextInput  style = { Style.inputForm}
                  
                  onChangeText = { text => {
                    fourthInput.current.focus()
                    setCode3(text)
                  }
                  }
                  returnKeyType={"next"}
                  ref={threeInput}

                  />
                  <TextInput  style = { Style.inputForm}
                  
                  onChangeText = { text => {
                    fivethInput.current.focus()
                    setCode4(text)
                    }}
                    returnKeyType={"next"}
                    ref={fourthInput}

                  />
                  <TextInput  style = { Style.inputForm}
                  
                  onChangeText = { text => setCode5(text)
                  }
                  returnKeyType={"send"}
                  ref={fivethInput}
                  onSubmitEditing={ () => intialLogin()}
                  
                  />
                 
            </View>
              
             
          </View>

        

          <View style={{width:"100%", alignItems:'center'}}>
              <TouchableOpacity 
                style = {{ width:152, height:49, backgroundColor: '#03a9f4', justifyContent:'center',alignItems:'center', borderRadius: 5}}
                onPress = {() => {
                   setCode(code1+code2+code3+code4+code5)
                   intialLogin()
                }}
                >
                  <Text style = {{ color: '#FFF', fontSize: 24, lineHeight: 34}}>Próximo</Text>
              </TouchableOpacity>
          </View>
          </ScrollView>
    </KeyboardAvoidingView>
)
  }


