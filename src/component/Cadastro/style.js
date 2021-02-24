import React from 'react';
import {StyleSheet} from 'react-native';



const style = StyleSheet.create({

    
    container : {
         flex: 1,
         width: "100%"
         
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
        alignItems:"center",
        marginBottom: 32
        
        
    },
    inputForm: {
        backgroundColor:"#FFF",
        fontSize: 16,
        paddingLeft: 16,
        marginBottom: 8,
        borderRadius: 7,
        width:"80%"
    },
    buttonForm: {
        width:"85%",
        height:42,
        backgroundColor: "rgb(0,104,138)",
        alignSelf: "center",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 16
        
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
        color: "#fff",
        marginBottom: 24,
        display: text

    }),
    text: {
        color: "#fff",
        marginTop:24,
        fontSize: 19
    }
    
})
export default style;