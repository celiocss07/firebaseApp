import React from 'react';
import { View, StyleSheet } from 'react-native';

// import { Container } from './styles';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        
        alignItems: "center",
       paddingTop: 16
    },
    title:{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginBottom:8
    },
    titleText: {
        color: "black",
        fontSize: 18
    },
    containerDesc: {
        width: "90%",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 24
    },
   

    item: {
        width: "100%",
        backgroundColor:"#FFF",
        borderColor: "#603915",
        borderRadius: 5,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 3,
        justifyContent: "space-between"

    },
    btnLink :{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"rgb(0,160,210)",
        padding: 8,
        borderRadius: 10,
        marginTop: 16
    },
    btnLinkText:{
        color: "#fff",

    }
    
    




})

export default Styles;