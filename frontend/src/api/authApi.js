import axiosClient from './axiosClient'

export const login = (credentials) => axiosClient.post('/auth/login', credentials)
export const register = (payload) => axiosClient.post('/auth/register', payload)
