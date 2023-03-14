import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
})

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
