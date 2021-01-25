import React, { useEffect, useState, useRef, Fragment} from 'react'
import { View, Text, StyleSheet, PermissionsAndroid, Image } from 'react-native'
import MapView, { Marker} from "react-native-maps";
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import {
  styles, 
  LocationBox, 
  LocationText,
  LocationTimeBox,
  LocationTimeText,
  LocationTimeTextSmall ,
  Back
}from './style'
import Search from './../Search'
import Directions from './../Directions'
import MarkerImage from './../../assets/user.png'
import BackImage from './../../assets/left-arrow.png'
import Details from '../Details';


export default function Map() {

  Geocoder.init("AIzaSyBPFyNBUARMRtPaEGFYZEEL-_ZId8fwRuc")

  const [myLocation,setMyLocation] = useState({ 
    latitude:-8.827041762379073,
    longitude:13.244275691630248,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121
  })

  const [ destination, setDestination ] = useState(null)
  const [ myAddress, setMyaddress ] = useState(null)
  const [ duration, setDuration ] = useState(null)
  const [ distance, setDistance ] = useState(null)

    async function permission() {
        PermissionsAndroid.requestMultiple(
              [
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
              ],
              {
                  title: 'Give Location Permission',
                  message: 'App needs location permission to find your position.'
              }
          ).then(granted => {
            console.log(granted);
            
            resolve();
          }).catch(err => {
            console.warn(err);
            reject(err);
          });
      }

      function handleBack() {
        setDestination(null)
      }
      function handleInfo( result) {
        console.log(result.distance,result.duration)
        setDistance(Math.floor(result.distance))
        setDuration(Math.floor(result.duration))
        

      }
      function handleZoom(result) {
        mapView.fitToCoordinates(result.coordinates,{
          edgePadding: {
            right: (20),
            bottom: (500),
            left: (40),
            top: (20),
          }
         });
      }

      

      useEffect(
        () => {
          Geolocation.getCurrentPosition(
            async ({ coords: { latitude, longitude}}) => {
                const response = await Geocoder.from({latitude,longitude})
                const address = response.results[0].formatted_address.split(',')
                console.log(address)
                setMyaddress(`${address[0]},${address[1]} `)
                setMyLocation({
                    latitude,
                    longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121
                })
            },
            ( error) => {
                console.log(error.code, error.message)
                permission()
            },
            {
              enableHighAccuracy: true,
              timeout: 2000,
              maximumAge:1000
            }
          )
        },[]
      )

        function handleLocationSelected( data, { geometry }) {
            const { location: { lat: latitude, lng: longitude } } = geometry
            console.log(data.structured_formatting.main_text)
            setDestination( 
              {
                latitude,
                longitude,
                title: data.structured_formatting.main_text,

              }
            )
        }
        let mapView = useRef()

    return (
        <View style={styles.container}>
        <MapView
          
          style={styles.map}
          region={ myLocation }
          showsUserLocation
          loadingEnabled
          ref={ el => mapView = el}
        >

          {
            destination && (
              <Fragment>

                    < Directions 
                          origin={myLocation}
                          destination={destination}
                          onReady={ async ( result ) => {
                            await handleZoom(result)
                            //await handleInfo(result)
                              console.log(result)
                              
                             
                             //setDuration(result.duration)
                          }}
                      />
                    <Marker coordinate={destination}  image={ MarkerImage} >
                          <LocationBox>
                              <LocationText>
                                { destination.title}
                              </LocationText>
                          </LocationBox>
                    </Marker>

                    <Marker coordinate={myLocation}   >
                          <LocationBox>
                            <LocationTimeBox>
                              <LocationTimeText> { duration } </LocationTimeText>
                              <LocationTimeTextSmall> MIN </LocationTimeTextSmall>
                            </LocationTimeBox>
                              <LocationText>
                                { myAddress}
                              </LocationText>
                          </LocationBox>
                    </Marker>

                    
              </Fragment>
                
            )
          }
            
        </MapView>
        {
          destination 
            ? <Fragment>
                  <Back onPress = { ( ) => handleBack()}>
                    <Image source={BackImage} style={{ width: 48, height: 48}} />
                  </Back>
                  <Details /> 
              </Fragment> 

            : 
            <Search onLocationSelected={ handleLocationSelected } />
            
         
        }

        
      </View>
    )
}
