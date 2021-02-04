import React, { useState } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function Search( props) {
    
    const { onLocationSelected } = props
    const [searchFocused, setSearchFocused ] = useState( null)
    navigator.geolocation = require("react-native-geolocation-service")
    return (
        <GooglePlacesAutocomplete
            placeholder='Para onde?'
            
            onPress={onLocationSelected}
            query={{
              key: 'AIzaSyBPFyNBUARMRtPaEGFYZEEL-_ZId8fwRuc',
              language: 'pt',
              components: 'country:ao',
            }}
            currentLocation={true}
            currentLocationLabel='Current location'

            textInputProps={{
                
                
                onFocus: () => { setSearchFocused("auto")},
                onBlur: () => { setSearchFocused(null)},
                autoCapitalize: "none",
                autoCorrect: false,
                
            }}
            listViewDisplayed={searchFocused}
            fetchDetails
            enablePoweredByContainer={false}
            styles={{
                container:{
                    position: 'absolute',
                    top: Platform.select({ ios: 60, android:40 }),
                    width:"100%"
                },
                textInputContainer:{
                    flex: 1,
                    backgroundColor: 'transparent',
                    height: 54,
                    marginHorizontal: 20,
                    borderTopWidth: 0,
                    borderBottomWidth: 0
                },
                textInput:{
                    height: 54,
                    margin: 0,
                    paddingTop: 0,
                    paddingBottom: 0,
                    paddingLeft: 16,
                    paddingRight: 16,
                    marginTop: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    elevation: 5,
                    shadowColor: '#000',
                    shadowOpacity: 0.1,
                    shadowOffset: { x: 0, y: 0 },
                    shadowRadius: 15,
                    borderWidth: 1,
                    borderColor: "#DDD",
                    fontSize: 19.5


                },
                listView:{
                    borderWidth: 1,
                    borderColor: "#DDD",
                    backgroundColor: '#FFF',
                    marginHorizontal: 20,
                    elevation: 5,
                    shadowColor: '#000',
                    shadowOpacity: 0.1,
                    shadowOffset: { x:0, y: 0 },
                    shadowRadius: 15,
                    marginTop: 10
                },
                description:{
                    fontSize: 16
                },
                row:{
                    padding: 20,
                    height: 58
                }
            }}
            

    />
    )
}

const styles = StyleSheet.create({})
