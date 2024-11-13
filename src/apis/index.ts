import axios from 'axios'

import { delay } from '../helpers/general'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

// Use delay to avoid flashy UI
axiosInstance.interceptors.response.use(
  async response => {
    await delay(500)

    return response
  },
  async error => {
    await delay(500)

    return Promise.reject(error)
  }
)

export default axiosInstance
