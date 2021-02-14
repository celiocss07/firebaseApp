import AsyncStorage from '@react-native-async-storage/async-storage';


import React, {useEffect, useState} from 'react';
import { View, ActivityIndicator } from 'react-native';

// import { Container } from './styles';

export default function auth(props) {
    const [loged, setLoged] = useState()
   async  function  getUser() {
    //await AsyncStorage.clear()
        let resData = await AsyncStorage.getItem('userData')
        if(resData){
           props.navigation.navigate('Menu')
        }else{
           props.navigation.navigate('Login')

        }
        
    }

    useEffect(()=> {
        async  function  getUser() {
            //await AsyncStorage.clear()
                let resData = await AsyncStorage.getItem('userData')
                if(resData){
                   props.navigation.navigate('Menu')
                }else{
                   props.navigation.navigate('Login')
        
                }
                
            }
            getUser()
    }, [])

  return (
      <View style={{width: "100%", justifyContent: "center", alignItems: "center"}}>
          <ActivityIndicator size ="large"  color={"#da552f"}/>
      </View>
  )
}

