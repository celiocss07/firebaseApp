import React, {useEffect, useState, Fragment} from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, FlatList}  from 'react-native';
import Styles from './style';
import api from '../../api'


// import { Container } from './styles';

const Notificacoes = () => {

    const [loading, setLoading]  = useState(true);
    const [notify, setNotify]  = useState(null);
    const [message, setMessage]  = useState(null);
    const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const referal = [

        {id: 1, nome: "Actualização", desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",img: '../Imagens/imagem_pass.jpg'},
        {id: 2, nome: "Actualização", desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",img: '../Imagens/imagem_pass.jpg'},
        {id: 3, nome: "Actualização", desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",img: '../Imagens/imagem_pass.jpg'},
        {id: 4, nome: "Actualização", desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",img: '../Imagens/imagem_pass.jpg'},
        

    ]
    async function getNotify(){
        api.get("get-notification")
        .then(res => {
            if(res.status == 200){
                console.log("Há dados", res.data)
                setLoading(false)
            }else{
                console.log("Não Há dados", res.data)
                setMessage("Vazio")
                setLoading(false)
            }
        })
        .catch( err => {
            if(err.response){
                console.log(err.response.data)
            }else{
                console.log(err)
                setMessage("Verifique a sua conexão de internet")
                setLoading(false)
            }
        })
    }
    useEffect(() => {
        
        getNotify()
        
    }, [])
  return (
    <View style={Styles.container}>


          {
              loading ? (
                  < ActivityIndicator size = "large" color = "#da552f" />
              ) 
              :
              <Fragment>
                  {
                      !notify ? 
                      <Fragment>
                          <View style={{width: "100%", justifyContent: "center", alignItems:"center"}}>
                              <Text style={{ fontSize: 19.5, color:"#777"}}>{message}</Text>
                          </View>
                      </Fragment>
                      :
                      <Fragment>

                      </Fragment>
                  }
              </Fragment>
              
          }
      
   
    
</View>
  );
}

export default Notificacoes;