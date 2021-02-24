import React from 'react';
import { View, StyleSheet } from 'react-native';

// import { Container } from './styles';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: "rgba(0,160,210,2)"
    },
    desc: {
        fontSize: 13,
        color: "black"
    },
    items: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 24,
    },

    item: {
        width: "100%",
        flexDirection: "row",
        backgroundColor:"#FFF",
        borderColor: "#603915",
        borderRadius: 5,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 3,

    },
    
    containerTexto: {
      
        justifyContent: "center",
        width: "90%"
    },
    texto: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#000",
        lineHeight: 23
    },
    desc2: (color = 'black') => ({
      fontSize: 13,
      color: color
  }),
  





})

export default Styles;