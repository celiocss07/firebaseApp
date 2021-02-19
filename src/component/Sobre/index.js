import React, {useEffect, useState} from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, FlatList}  from 'react-native';
import Styles from './style';


// import { Container } from './styles';

const Sobre = () => {

    const [loading, setLoading]  = useState(false);

  return (
    <View style ={Styles.Container}>

    <View style={Styles.info}>

          <Image 
                        source= { require('../Imagens/Logo.png')}
                        style= { Styles.logo}
                    />
          <Text style={Styles.text}>
          O seu conforto e satisfação, é a nossa prioridade - Como Empresa de Transporte e como Plataforma de Taxi.
          </Text>
          <Text style={Styles.text}>
          
            Economia e segurança na locomoção da sua equipe, A CALLTaxi, é uma plataforma completa de gestão de transporte de taxi por aplicativo, 
            que acompanha a jornada de cada um dos seus colaboradores de forma segura e confiável.
          </Text>
          <Text style={Styles.text}>
          
            Temos central de atendimento Atendimento aberto
             24hs por dia, 7 dias por semana!
          </Text>

    </View>


    
</View>
  );
}

export default Sobre;