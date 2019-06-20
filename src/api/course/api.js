import * as api from '../request'

//分页查询全部课程信息
export const findAllCourseInfo = (currentPage, pageSize) => api.requestGet(api.webUrl + '/api/course/findAllCourseInfo/' + currentPage + '/' + pageSize)
//修改课程状态信息
export const updateCourseState = (params) => api.requestPut(api.webUrl + '/api/course/updateCourseState?' + params)
//修改课程信息
export const update = (params) => api.requestPut(api.webUrl + '/api/course/update?' + params)
//删除课程信息
export const deleteCourse = (id) => api.requestDelete(api.webUrl + '/api/course/delete/' + id)
//获取课程基本信息表总数据量
export const getTotalCourseInfoNumber = () => api.requestGet(api.webUrl + '/api/course/getTotalNumber')
