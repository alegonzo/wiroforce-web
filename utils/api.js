import getConfig from 'next/config'
import axios from 'axios'
import { signOut } from 'next-auth/client'
const { publicRuntimeConfig } = getConfig()

const api = () => {
  const instance = axios.create({ baseURL: `${publicRuntimeConfig.apiUrl}` })
  instance.interceptors.response.use(
    (response) => {
      return response
    },
    async (error) => {
      const originalRequest = error.config
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true
        signOut({
          callbackUrl: `${window.location.origin}/wiroforce`,
        })
        return instance(originalRequest)
      }
      return Promise.reject(error)
    }
  )
  return instance
}

export default api
