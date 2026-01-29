import axios, { InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://jobhunt-backend-ndu9.onrender.com'
    // baseURL: 'http://localhost:8080'
});

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;

        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

// export const setupResponseInterceptor = (navigate : any)=>{
//     axiosInstance.interceptors.response.use(
//         (response)=>{
//             return response;
//         },
//         (error)=>{
//             if(error.response?.status === 401){
//                 navigate('/login');
//             }
//             return Promise.reject(error);
//         }
//     )
// }


let interceptorSet = false;

export const setupResponseInterceptor = (navigate: any) => {
    if (interceptorSet) return;

    interceptorSet = true;

    axiosInstance.interceptors.response.use(
        (res) => res,
        (error) => {
            if (
                error.response?.status === 401 &&
                !window.location.pathname.startsWith("/login")
            ) {
                localStorage.removeItem("token");
                navigate("/login", { replace: true });
            }
            return Promise.reject(error);
        }
    );
};

export default axiosInstance;