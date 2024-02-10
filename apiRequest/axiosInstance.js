import axios from "axios";
import { getCookie } from "../apiRequest/cookieProvider";

const axiosInstance = axios.create({
    baseURL : "https://api.ghahramaneman.com/Api",
    timeout : 10000
});
// const token = localStorage.getItem("access_token");
// axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;


// function axiosProvider(token){
//     console.log(token)
//     axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`; 
//     return axiosInstance; 
// }
const token = getCookie("access_token")
axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;; 

export default axiosInstance;