
import axiosInstance from "../Interceptor/AxiosInterceptor";



const getProfile = async (id: any) => {
    return axiosInstance.get(`/profiles/get/${id}`)
        .then(res => res.data)
        .catch(error => {
            throw error;
        })
}

const updateProfile = async (profile: any) => {
    return axiosInstance.put(`/profiles/update`, profile)
        .then(res => res.data)
        .catch(error => {
            throw error;
        })
}

const getAllProfiles = async () => {
    return axiosInstance.get(`/profiles/getAll`)
        .then(result => result.data)
        .catch(error => { throw error; })
}


const uploadResume = async (id: any, file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    return axiosInstance.post(`/profiles/uploadResume/${id}`, formData)
        .then(res => res.data);
};

const downloadResume = async (id: any) => {
    const response = await axiosInstance.get(
        `/profiles/downloadResume/${id}`,
        { responseType: "blob" } // 🔥 important
    );

    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    window.open(url);
};


const deleteResume = async (id: any) => {
    return axiosInstance.delete(`/profiles/deleteResume/${id}`)
        .then(res => res.data);
};

export {
    getProfile,
    updateProfile,
    getAllProfiles,
    uploadResume,
    downloadResume,
    deleteResume
}
