import React from 'react';
import { StyleSheet} from 'react-native';

// import { Container } from './styles';

const Styles =  StyleSheet.create({
    
    container: {
        flex: 1, 
        alignItems: 'center',
        backgroundColor: "#FFF",
        
    },
    item:  {
      flexDirection: "row",
      width: "70%",
      borderRadius: 5,
      borderColor: "#603915",
      borderBottomWidth: 2,
      padding: 8,
      marginBottom: 16,
      alignItems: "center"

  },
  itemText: {
      fontSize: 19,
      color: "#000",
      fontWeight: "bold",
      lineHeight: 23
  },
  logoContainer: {
    width: "100%",
    height: "40%",
    justifyContent:"center",
    alignItems:"center",
    
  },
  ico: {
    width: 30,
    height:30,
    marginRight: 8
  }, 
  info: {
    width:"100%",
    alignItems: "center"
  },
  logo: {
    width: 180,
    height: 180,
    borderRadius: 100
},
    
})

export default Styles;