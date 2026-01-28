
import axiosInstance from "../Interceptor/AxiosInterceptor";
import { removeUser } from "../Slices/UserSlice";


const baseUrl = "https://jobhunt-backend-ndu9.onrender.com/auth/"



const loginUser= async(login:any)=>{
    return axiosInstance.post(`${baseUrl}login` , login)
    .then(res=>res.data)
    .catch(error=>{
        throw error;
    })
}

const navigateToLogin = (navigate:any)=>{
    localStorage.removeItem('token');
    removeUser();
    navigate('/login')
}


export {loginUser , navigateToLogin}