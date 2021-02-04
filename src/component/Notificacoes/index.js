import React, {useEffect, useState} from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, FlatList}  from 'react-native';
import Styles from './style';


// import { Container } from './styles';

const Notificacoes = () => {

    const [loading, setLoading]  = useState(false);
    const referal = [

        {id: 1, nome: "Actualização", desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",img: '../Imagens/imagem_pass.jpg'},
        {id: 2, nome: "Actualização", desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",img: '../Imagens/imagem_pass.jpg'},
        {id: 3, nome: "Actualização", desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",img: '../Imagens/imagem_pass.jpg'},
        {id: 4, nome: "Actualização", desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",img: '../Imagens/imagem_pass.jpg'},
        

    ]
  return (
    <View >

   

    <View style={{alignItems: "center",marginTop: 16}}>

          {
              loading ? (
                  < ActivityIndicator size = "large" color = "#da552f" />
              ) 
              :
              (
                <FlatList
                        data={referal}
                        showsVerticalScrollIndicator={false}
                        
                        style = {{width: "90%"}}
                        keyExtractor = {referal.id}
                        renderItem={({item}) => (

                    <TouchableOpacity
                        onPress = { () => {}}
                        style = {Styles.item}
                    >

                        <View style = {Styles.containerTexto}>
                            <Text style = {Styles.texto}> {item.nome} </Text>
                            <Text style = {Styles.desc2}> {item.desc} </Text>
                        </View>
                        <View style = {Styles.containerImg}>
                            <Image 
                                source = {require('../Imagens/delete.png')} 
                                style={Styles.img}
                            />
                        </View>

                        
                    </TouchableOpacity>
                )}
            />
              )
          }
      
    </View>
    
</View>
  );
}

export default Notificacoes;