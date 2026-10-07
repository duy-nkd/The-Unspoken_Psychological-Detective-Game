import axiosClient from './axiosClient'

export const listBugReports = () => axiosClient.get('/bug-reports')
export const createBugReport = (report) => axiosClient.post('/bug-reports', report)
