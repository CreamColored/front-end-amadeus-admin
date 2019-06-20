import * as api from '../request'


//获取全部学生信息
export const findAllStudentInfo = (currentPage, pageSize) => api.requestGet(api.webUrl + '/api/student/findAll/' + currentPage + '/' + pageSize)
//获取全部学生登录信息
export const findAllStudentLogin = () => api.requestGet(api.webUrl + '/api/student/findAllStudentLogin')
//修改学生账户状态
export const updateAccountState = (params) => api.requestPut(api.webUrl + '/api/student/updateAccountState?' + params)
//删除学生账户
export const deleteStudent = (id) => api.requestDelete(api.webUrl + '/api/student/delete/' + id)
//查询总记录数
export const getTotalNumber = () => api.requestGet(api.webUrl + '/api/student/getTotalNumber')
