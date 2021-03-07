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
        width:"100%",
        alignItems: "center", 
        
    },
    containerTitle: {
        width:"100%",
        margin: 10,
        alignItems: "center"
    },
    containerForm: {
        width:"100%",
        padding: 32
        
    },
    inputForm: {
        backgroundColor:"#FFF",
        fontSize: 19.5,
        paddingLeft: 16,
        marginBottom: 8,
        borderRadius: 5,
        height: 48,
        width:"100%"
    },
    buttonForm: {
        width:"100%",
        height:48,
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
        fontSize: 19.5,
        color:"#FFF"
    },
    msg: (text = 'none') => ({
        fontWeight:"bold",
        fontSize: 16,
        color: "red",
        marginTop: 10,
        marginBottom: 15,
        display: text

    }),
    text: {
        color: "red",
        fontSize: 19.5,
    },
    logo:{
        width:200,
        height: 200
    }
    
})
export default style;