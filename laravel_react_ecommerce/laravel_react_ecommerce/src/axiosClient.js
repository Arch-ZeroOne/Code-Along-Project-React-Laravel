import axios from "axios";
//*Base url for our API request
//*We established the centralized location for requests
const axiosClient = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
});
//*Intercepts request and modify them before the request its set
//* Can be used in handling authentication tokens
//*We intercept the requests before returning it
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

//*Captures the response  and passes it through to the application
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    //*catches errors
    (error) => {
        //*destructures the response key from error
        console.log(error);
        const { response } = error;
        //*catches the response status to help use handle errors
        if (response.status === 401) {
            //remove the access token for unauthorized users
            localStorage.removeItem("ACCESS_TOKEN");
        }
        throw error;
    }
);

export default axiosClient;
