import React, {useEffect, useState} from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        
            getUser()
    }, [])

  return (
      <View style={{width: "100%", justifyContent: "center", alignItems: "center"}}>
         
      </View>
  )
}

