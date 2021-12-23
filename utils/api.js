import axios from 'axios'
import { signOut } from 'next-auth/client'

import { getSession } from 'next-auth/client'

export const api = async (url, options = { method: 'get', params: {} }) => {
  const session = await getSession()
  try {
    const { headers, ...config } = options
    const response = await axios(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      headers: Object.assign(headers || {}, {
        Authorization: `Bearer ${session.user.token}`,
      }),
      ...config,
    })
    return response
  } catch (e) {
    if (e?.response?.status === 401) await signOut()
    throw e
  }
}

/*
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

export default api*/
