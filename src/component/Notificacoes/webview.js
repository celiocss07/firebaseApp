import { HeaderTitle } from '@react-navigation/stack';
import React from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';

// import { Container } from './styles';



const WebPage = ( props) => {
//console.log(props.route.params.url)
return <WebView source={{ uri: props.route.params.url }} />;
}

WebPage.navigationOptions = (props) => {
    title: props.route.params.url
    }



export default WebPage;