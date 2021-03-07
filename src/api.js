import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api =  axios.create({
    
    baseURL: 'https://api.dahora.ao/api',
    timeout: 10000,
    headers: {
           
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        

    }
})

api.interceptors.request.use(
    async config => {
        let data = await AsyncStorage.getItem('userData')
        //console.log( "TOKEN  API +>", JSON.parse(data)?.token)
        try {
            if (data && JSON.parse(data)?.token)
            config.headers.Authorization = `Bearer ${JSON.parse(data)?.token}`
          return Promise.resolve(config)
        } catch (error) {
            //console.log(error)
          return Promise.resolve(config)
        }
          
        
       
    },
    error => {
      return Promise.reject(error)
    },
  )

 
export default api;

