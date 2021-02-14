import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


let token = "jdj";

async function info(){
    let data = await AsyncStorage.getItem('userData')

    
        data =  JSON.parse(data)
        data = await data?.token
        token = await  data
        await console.log("MEU TOKEN => ",data)
        await console.log("\n \n ++++++++",token)
        api.defaults.headers.common['Authorization'] = `Bearer ${data}`;
    
     
     
    
    await  console.log("jnle ", data)
     
     
    
    
    
}
let api =  axios.create({
    
    baseURL: 'https://api.dahora.ao/api',
    timeout: 10000,
    headers: {
           
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        

    }
})
info()
 
export default api;

