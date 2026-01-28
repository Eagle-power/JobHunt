import axiosInstance from "../Interceptor/AxiosInterceptor";

export const askChatbot = async (
    profileId: number,
    message: string,
    jobId?: number
) => {
    const res = await axiosInstance.post("/chat/ask", {
        profileId,
        jobId: jobId ?? null,
        message
    });

    return res.data; // { reply }
};
