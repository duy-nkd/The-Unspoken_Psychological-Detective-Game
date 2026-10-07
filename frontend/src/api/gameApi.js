import axiosClient from './axiosClient'

export const loadProgress = () => axiosClient.get('/game-progress')
export const saveProgress = (progress) => axiosClient.put('/game-progress', progress)
export const getEvidence = (chapter) => axiosClient.get('/evidence', { params: { chapter } })
