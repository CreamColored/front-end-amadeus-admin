import * as api from '../request'

//查询全部院校信息
export const findAllCollegeInfo = () => api.requestGet(api.webUrl + '/api/college/findAll')
//修改院校状态信息
export const updateCollegeState = (params) => api.requestPut(api.webUrl + '/api/college/updateState?' + params)
//修改院校信息
export const update = (params) => api.requestPut(api.webUrl + '/api/college/update?' + params)
