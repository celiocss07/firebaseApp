import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Details from '../Details'
import Styles from '../Historico/style'
import Search from './../Search'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center"
    },
    containerSearch:{
        width: "100%",
        alignItems: "center"
    },
    containerSearch2:{
        width: "100%",
        alignItems: "center",
        marginTop: 74
    },
    containerTexto: {
        flex: 1,
        justifyContent: "center",
        width: "90%"
    },
    texto: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#000",
        lineHeight: 23
    },
})


export default function index() {
    return (
        <View style={styles.container}>
            <View style={styles.containerSearch}>
                <Search placeholder='Onde estás?'/>
            </View>
            <View style={styles.containerSearch2}>
                <Search />
            </View>
            <View style = {styles.containerTexto}>
                              
                <Text style = {styles.desc}> <Text style = {Styles.texto} > Origem : </Text>  </Text>
                <Text style = {styles.desc}> <Text style = {Styles.texto} > Destino: </Text>  </Text>
                <Text style = {styles.desc}> <Text style = {Styles.texto} > Estimativa: </Text> 1000 Kz</Text>

            </View>
        </View>
    )
}
