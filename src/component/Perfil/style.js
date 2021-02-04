import React from 'react';
import {StyleSheet} from 'react-native';



const style = StyleSheet.create({

    
   container: {
       flex: 1,
       
       alignItems: "center"
   },
   containerLogo: {
       width: "100%",
       alignItems: "center",
       padding: 16
   },
   logo: {
       width: 80,
       height: 80,
       borderRadius: 100
   },
   containerTitle: {
    width: "100%",
    alignItems: "center",
    padding: 8
   },
   msg: {
       fontSize: 19,
       fontStyle:"italic"
   },
   containerForm: {
       width: "100%",
       alignItems: "center",
       
   },
   inputForm: {
       backgroundColor: "#FFF",
       paddingLeft: 16,
       marginBottom: 8,
       height: 40,
       width: "80%",
       borderRadius: 5,
       shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 3,
   },
   buttonForm: {
    backgroundColor: "rgb(0,160,210)",
    paddingLeft: 16,
    marginBottom: 8,
    marginTop:40,
    height: 40,
    width: "80%",
    justifyContent: "center",
    alignItems:"center",
    borderRadius: 5
   },
   buttonFormText: {
       color: "#FFF",
       fontSize: 19,
       fontWeight: "bold",
       lineHeight: 29,
       
   }

    
    
})
export default style;