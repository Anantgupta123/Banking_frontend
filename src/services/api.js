import axios from 'axios'
import { toast } from 'react-hot-toast'

const api = axios.create({
  baseURL: '/api',
  withCredentials: true, // Important for cookie-based JWT
})

// Request interceptor for loading/errors
api.interceptors.request.use(
  (config) => {
    // Add loading spinner globally if needed
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.error('Session expired. Please login again.')
      // Redirect to login could be added here
    } else if (error.response?.status >= 400) {
      toast.error(error.response?.data?.message || 'Something went wrong')
    }
    return Promise.reject(error)
  }
)

export { api }
export default api

