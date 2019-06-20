import * as api from '../request'


//获取全部教师基本信息
export const findAllTeacherInfo = (currentPage, pageSize) => api.requestGet(api.webUrl + '/api/teacher/findAllTeacherInfo/' + currentPage + '/' + pageSize)
//获取全部教师登录信息
export const findAllTeacherLogin = (currentPage, pageSize) => api.requestGet(api.webUrl + '/api/teacher/findAllTeacherLogin/' + currentPage + '/' + pageSize)
//修改教师账户状态
export const updateAccountState = (params) => api.requestPut(api.webUrl + '/api/teacher/updateAccountState?' + params)
//删除教师账户
export const deleteTeacher = (id) => api.requestDelete(api.webUrl + '/api/teacher/delete/' + id)
//查询教师登陆表总记录数
export const getTotalTeacherLoginNumber = () => api.requestGet(api.webUrl + '/api/teacher/getTotalTeacherLoginNumber')
//查询教师信息表总记录数
export const getTotalTeacherInfoNumber = () => api.requestGet(api.webUrl + '/api/teacher/getTotalTeacherInfoNumber')
