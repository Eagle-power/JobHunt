import axios from "axios"


const baseUrl = "http://localhost:8080/users/"

const registerUser= async(user:any)=>{
    return axios.post(`${baseUrl}register` , user)
    .then(res=>res.data)
    .catch(error=>{
        throw error;
    })
}

const loginUser= async(login:any)=>{
    return axios.post(`${baseUrl}login` , login)
    .then(res=>res.data)
    .catch(error=>{
        throw error;
    })
}


export {registerUser , loginUser};