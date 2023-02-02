// 处理整个项目axios请求书写地址  暴露到组件中进行使用
import axios from "./index"
// 设置请求地址
let url = '/api'

// vuex中组件进行获取session
export const getSession = ()=> axios('get',url+"/user/session")

// Login组件注册账号
export const createName = (value)=> axios('post',url+"/user/reg",value)

// Login组件登录
export const loginName = (value)=> axios('post',url+"/user/login",value)

// HomeHander组件设置销毁session
export const  setDestory =  ()=> axios('post',url+"/user/delete")

// Manageuser组件设置创建员工岗位
export const  createRole =  (value)=> axios('post',url+"/user/role",value)

//  Manageuser组件获取员工初始数据
export const  getRole =  ()=> axios('get',url+"/user/getrole")


// Manageuser组件删除员工初始数据
export const  removeRole =  (value)=> axios('post',url+"/user/remove",value)

// Manageuser组件搜索员工初始数据
export const  roleSearch =  (value)=> axios('post',url+"/user/search",value)

// Manageuser组件修改员工数据
export const  upDateRole =  (value)=> axios('post',url+"/user/update",value)

// Manageuser组件分页获取数据
export const  getPage =  (value)=> axios('post',url+"/user/page",value)

// Manage组件获取账号权限
export const getJurisdiction = ()=> axios('get',url+"/user/jur")