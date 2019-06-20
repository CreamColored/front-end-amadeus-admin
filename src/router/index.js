import Vue from 'vue'
import Router from 'vue-router'

import AppView from '@/components/app-view'
import Home from '@/pages/home'

Vue.use(Router)

const page = name => () => import('@/pages/' + name)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      component: AppView,
      children: [
        {path: '/', name: 'home', component: Home},
        {path: '/studentInfo/list', name: 'student-info-list', component: page('student-info-list')},
        {path: '/studentLogin/list', name: 'student-login-list', component: page('student-login-list')},
        {path: '/college/list', name: 'college-info-list', component: page('college-info-list')},
        {path: '/admin/list', name: 'admin-info-list', component: page('admin-info-list'),auth:{identity:'超级管理员身份'}},
        {path: '/admin/add', name: 'admin-add', component: page('admin-add'), hidden: true},
        {path: '/course/list', name: 'course-info-list', component: page('course-info-list')},
        {path: '/teacherLogin/list', name: 'teacher-login-list', component: page('teacher-login-list')},
        {path: '/course/uploadVideo', name: 'course-upload-video', component: page('course-upload-video')},
        {path: '/test/upload', name: 'test-upload', component: page('test-upload')},
        {path: '/button', name: 'c-button', component: page('c-button')},
        {path: '/switch', name: 'c-switch', component: page('c-switch')},
        {path: '/checkbox', name: 'c-checkbox', component: page('c-checkbox')},
        {path: '/alert', name: 'c-alert', component: page('c-alert')},
        {path: '/input', name: 'c-input', component: page('c-input')},
        {path: '/keyboard', name: 'c-keyboard', component: page('c-keyboard')},
        {path: '/loading', name: 'c-loading', component: page('c-loading')},
        {path: '/data-table', name: 'p-data-table', component: page('table')},
        {path: '/dropdown', name: 'c-dropdown', component: page('c-dropdown')},
        {path: '/navbar', name: 'c-navbar', component: page('c-navbar')},
        {path: '/container', name: 'c-container', component: page('c-container')},
        {path: '/demo', name: 'demo', component: page('demo')},
        {path: '/404', name: '404', component: page('404')},
        {path: '/500', name: '500', component: page('500')}
      ]
    },
    {path: '/login', name: 'login', component: page('login')},
    {path: '/cnode', name: 'cnode', component: page('cnode')},
    // pages
    {path: '/home-login', name: 'p-login', component: page('home-login')},
    {path: '/register', name: 'p-register', component: page('register')},
    {path: '/keyboard', name: 'p-keyboard', component: page('c-keyboard')},
    {path: '*', redirect: {name: '404'}}
  ]
})
