import { AsyncStorage } from "react-native";
import axios from "axios";

const api = axios.create({
    //baseURL: "https://192.168.0.101:54635/api"
    baseURL: "https://goflix.azurewebsites.net/api"
});

api.interceptors.request.use(async config => {
    const token = await AsyncStorage.getItem("tokenJwt");
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
});

export default api;