import React from 'react';
import {StyleSheet} from 'react-native';



const style = StyleSheet.create({

    
    container : {
         flex: 1, 
         
         backgroundColor:"#FFF",
         
    },
    containerLogo: {
        marginTop:16,
        width:"100%",
        alignItems: "center",   
    },
    logo: {
        width:200,
        height: 200

    },
    containerTitle: {
        width:"100%",
       marginBottom: 10,
        alignItems: "center"
    },
    containerForm: {
        width:"100%",
        marginTop:16,
        alignItems:"center"
        
        
    },
    inputForm: {
        backgroundColor:"#FFF",
        fontSize: 13,
        paddingLeft: 16,
        marginBottom: 8,
        borderColor: "#603915",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 5,
        height: 40,
        width:"80%"
    },
    buttonForm: {
        width:"85%",
        height:42,
        backgroundColor: "rgb(0,104,138)",
        alignSelf: "center",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
        
    },
    buttonFormNew: {
        backgroundColor: "green",
        width:"55%"
    },
    buttonFormText: {
        fontWeight:"bold",
        fontSize: 19,
        color:"#FFF"
    },
    msg: (text = 'none') => ({
        fontWeight:"bold",
        fontSize: 19,
        color: "#2E3094",
        marginBottom: 24,
        display: text

    }),
    text: {
        color: "blue",
        marginTop:24,
        fontSize: 19
    }
    
})
export default style;