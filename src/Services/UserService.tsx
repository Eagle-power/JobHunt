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

const sendOtp = async (email : any)=>{
    return axios.post(`${baseUrl}sendOtp/${email}`)
    .then(res=>res.data)
    .catch(error =>{
        throw error;
    })
}

const verifyOtp = async (email : any , otp : any) =>{
    return axios.get(`${baseUrl}verifyOtp/${email}/${otp}`)
    .then(res=>res.data)
    .catch(error =>{
        throw error;
    })
}


const changePass = async (email : String , password : String) =>{
    return axios.post(`${baseUrl}changePass`,{email , password})
    .then(res=>res.data)
    .catch(error=>{
        throw error;
    })
}


export {registerUser , loginUser , sendOtp , verifyOtp , changePass};