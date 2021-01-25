import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapViewDirections from 'react-native-maps-directions'

export default function Directions({ destination, origin, onReady}) {
    return (
        < MapViewDirections 
            destination={destination}
            origin={origin}
            onReady={onReady}
            apikey="AIzaSyBPFyNBUARMRtPaEGFYZEEL-_ZId8fwRuc"
            strokeWidth={6}
            strokeColor="#03a9f4"
        
        
        />
    )
}

const styles = StyleSheet.create({})
