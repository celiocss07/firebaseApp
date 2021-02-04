import React from 'react';
import { View, Text, Image,TouchableOpacity } from 'react-native';
import Styles from './styles';

const Call_Center = () => {

  const info = 
    {
      phone: "+244 930 151 001",
      email: "info@calltaxi.co.ao",
      site: "www.calltaxi.co.ao"
    }
  
  return (
    <View style={ Styles.container}>

      <View style={ Styles.logoContainer} >
            <Image 
                source = {require('../Imagens/Logo.png')}
                style={Styles.logo}
            />
      </View>

      <View style={Styles.info} >

          <TouchableOpacity 
                style={Styles.item}
                onPress={ () => navigation.navigate('Notificacoes')}
          >
                <Image 
                source = {require('../Imagens/icons8_Touchscreen_40px.png')}
                style={Styles.ico}
            />
              <Text style={Styles.itemText}>{info.phone}</Text>

          </TouchableOpacity>

          <TouchableOpacity 
                style={Styles.item}
                onPress={ () => navigation.navigate('Notificacoes')}
          >
              <Image 
                source = {require('../Imagens/icons8_Email_40px.png')}
                style={Styles.ico}
            />
              <Text style={Styles.itemText}> {info.email} </Text>

          </TouchableOpacity>

          <TouchableOpacity 
                style={Styles.item}
                onPress={ () => navigation.navigate('Notificacoes')}
          >   
              <Image 
                source = {require('../Imagens/icons8_Link_40px.png')}
                style={Styles.ico}
            />
              <Text style={Styles.itemText}> {info.site} </Text>

          </TouchableOpacity>
      </View>
    </View>
  );
}

export default Call_Center;