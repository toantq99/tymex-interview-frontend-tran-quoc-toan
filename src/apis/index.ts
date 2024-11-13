import axios from 'axios'

import { delay } from '../helpers/general'

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

axiosInstance.interceptors.response.use(async response => {
  await delay(1000)

  return response
})

export default axiosInstance
