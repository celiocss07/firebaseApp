import React from 'react';
import { StyleSheet} from 'react-native';

// import { Container } from './styles';

const Styles =  StyleSheet.create({
    headerTop: {
        
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems:"center",
        backgroundColor:"rgb(0,160,210)",
        width: "100%",
        height:50,
        padding:8
    },
    containerMenu: {
        flex: 1, 
        backgroundColor: '#FFF', 
        alignItems:"center",
        justifyContent: "space-around"
    },
    container: {
        flex: 1, 
        alignItems: 'center',
        backgroundColor: "#FFF"
    },

    logoContainer: {
        width:"100%",
        flexDirection: "row",
        justifyContent: "center",
        padding: 16
    },
    logo: {
        width: 150,
        height: 150,
        borderRadius: 100
    },
    logoHeader: {
        width: 80,
        height: "100%"
    },
    logoPerfil: {
        width: 40,
        height: 40,
        borderRadius: 100
    },
    logoMenu: {
        width:30,
        height: "80%"
    },
    title: {
        color:"#FFF", 
        fontSize:19, 
        fontWeight: "bold", 
        fontStyle: "italic"
    },
    options: {
        width: "100%",
        alignItems: "center",
        padding: 16
    },
    item:  {
        flexDirection: "row",
        width: "90%",
        borderRadius: 5,
        borderColor: "rgba(255,255,255,0.4)",
        borderBottomWidth: 1,
        padding: 8,
        marginBottom: 8,
        alignItems: "center"

    },
    itemText: {
        fontSize: 15,
        color: "#FFF",
        fontWeight: "bold",
        lineHeight: 23,
        marginLeft: 16
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
      },
})

export default Styles;