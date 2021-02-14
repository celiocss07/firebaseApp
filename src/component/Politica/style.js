import styled from 'styled-components/native';
import { Platform, StyleSheet} from 'react-native'

export const style = StyleSheet.create( { 
  modal: {
   width: '80%',
   height: '40%',
   backgroundColor: '#da552f'
  }
})
export const Container = styled.View`
    flex:1;
  background: #FFF;
  width: 100%;
  shadow-color: #000;
  shadow-offset: 0 0;
  shadow-opacity: 0.2;
  shadow-radius: 10px;
  elevation: 3;
  border: 1px solid #DDD;
  align-items: center;
  padding: 8px;
`;

export const ContainerBox = styled.View` 
  width: 100%;
  
  
  padding: 8px;
`;
export const ContainerBox2 = styled.View` 
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ContainerBoxBtn = styled.TouchableOpacity` 
  width: 50%;
  justify-content: center;
  align-items: center;
  align-self: stretch;
`;
export const ContainerBoxDiv = styled.View` 
  width: 50%;
  justify-content: center;
  align-items: center;
  align-self: stretch;
`;

export const CloseButton= styled.TouchableOpacity` 
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  background: rgba(255,255,255,0.5);
  margin-top: 8px;
  border-radius: 100px;
`;
export const AddButton= styled.TouchableOpacity` 
  width: 25px;
  height: 25px;
  justify-content: center;
  align-items: center;
  background: #03a9f4;
  margin-top: 8px;
  border-radius: 100px;
  margin: 0 8px;
`;
export const AddButtonText= styled.Text` 
  font-size: 19.5px;
  font-weight: bold;
  color: #FFF;
`;
export const CloseButtonText= styled.Text` 
  font-size: 24px;
  font-weight: bold;
  color: black;
`;


export const TypeTitle = styled.Text`
  font-size: 19.5px;
  color: #222;
  font-weight: bold;
`;
export const TypeSubTitle = styled.Text`
  font-size: 16px;
  color: #222;
  font-weight: bold;
`;


export const TypeDescription = styled.Text`
  font-size: 16px;
  color: black;
  text-align: justify;
  margin: 8px;
  
`;

export const TypeImage= styled.Image`
    height: 40px;
    width: 50%;
    
`;
export const BackgroundButton = styled.TouchableOpacity`
    justify-content: center;
    width:50%;
    align-items: center;
    align-self: stretch;
    padding: 8px;
   
`;

export const RequestButton = styled.TouchableOpacity`
    background: #03a9f4;
    justify-content: center;
    align-items: center;
    height: 44px;
    align-self: stretch;
    margin-top: 10px;
`;

export const RequestButtonText= styled.Text`
    color: #FFF;
    font-weight: bold;
    font-size: 18px;
`;


