import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080'
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
