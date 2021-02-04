import React from 'react';
import {StyleSheet} from 'react-native';



const style = StyleSheet.create({

    
    container : {
         flex: 1, 
         alignItems: 'center',
         backgroundColor:"#FFF",
         justifyContent: "space-around"
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
        width:"80%",
        marginTop:16
        
    },
    containerInput: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 24
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
        height: 50,
        width:"16%"
    },
    buttonForm: {
        width:"100%",
        height:42,
        backgroundColor: "#603915",
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
   
    text: {
        color: "#333",
        marginTop:24,
        fontSize: 13,
        marginBottom: 8,
    },
    msg: (text = 'none') => ({
        fontWeight:"bold",
        fontSize: 19,
        color: "#2E3094",
        marginBottom: 24,
        marginTop:32,
        display: text

    }),
    
})
export default style;