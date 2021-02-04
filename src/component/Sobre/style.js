import React from 'react';
import { StyleSheet} from 'react-native';

// import { Container } from './styles';

const Styles =  StyleSheet.create({
    
    container: {
        flex: 1, 
        alignItems: 'center',
        backgroundColor: "#FFF",
        
    },
  logo: {
    width: 180,
    height: 180,
    borderRadius: 100
},
  info: {
    alignItems: "center",
    padding: 24
  },
  text: {
    fontFamily: "arial",
    textAlign: "justify",marginTop: 24
    
  }
})

export default Styles;