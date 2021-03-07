import React, {useEffect, useState, Fragment} from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, FlatList, Linking}  from 'react-native';
import Styles from './style';
import api from '../../api'


// import { Container } from './styles';

const Notificacoes = ({navigation}) => {

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
        api.post("get-notification")
        .then(res => {
            if(res.status == 200){
                //console.log("Há dados", res.data)
                setNotify(res.data)
                setLoading(false)
            }else{
                //console.log("Não Há dados", res.data)
                setMessage("Sem notificações")
                setLoading(false)
            }
        })
        .catch( err => {
            if(err.response){
                //console.log(err.response.data)
                setMessage("Verifique a sua conexão de internet")
            }else{
                //console.log(err)
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
                      <Fragment >
                          <FlatList
                      data={notify}
                      style = {{width: "90%" }}
                      keyExtractor = {(item) => `${item.idnotification}`}
                      showsVerticalScrollIndicator={false}
                      renderItem={({item}) => (
                      
                          <TouchableOpacity
                              onPress = { () => {
                                Linking.openURL(item.link)
                              }}
                              
                              style = {Styles.item}
                          >
                                <View style={Styles.title}>
                                    <Text style = {Styles.titleText}>  {item.title} </Text>

                                </View>

                                <View style={{}}>
                                    <Text style = {{}}>  {item.description} </Text>

                                </View>

                                {
                                    item?.link ?
                                    <TouchableOpacity 
                                        onPress={ ( ) => {
                                            navigation.navigate('WebView', {url: item.link})
                                        }}
                                        style={Styles.btnLink}
                                    > 
                                        <Text style={Styles.btnLinkText}>Acessar</Text>

                                    </TouchableOpacity>
                                    :
                                    <Fragment>

                                    </Fragment>
                                }
                          </TouchableOpacity>
                      )}
                  />
                      </Fragment>
                  }
              </Fragment>
              
          }
      
   
    
</View>
  );
}

export default Notificacoes;