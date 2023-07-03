import axios from "axios"
axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}/api/`

const axiosInstance = axios.create()
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong!"
    )
)

export default axiosInstance
