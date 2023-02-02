// 设置正则文件
// 设置正则规则  字母开头 最少3个 最多9个
let regName = /^[[a-zA-Z][\w]{2,8}$/
// 正则匹配密码  特殊符号与字母数字  6-12位
let regPass = /^[0-9a-zA-Z_!@#%^&]{6,12}$/

// 用户名
export const validatename = (_, value, callback) => {
  
    // 验证规则代码
    if(!value){
      callback(new Error("不能为空"))
    }else if(!regName.test(value)){
      callback(new Error("输入不规范"))
      }else{
        callback()
      }
    
  }
// 密码
export const validatePass = (_, value, callback) => {  
  
    if(!value){
      callback(new Error("不能为空"))
    }else if(!regPass.test(value)){
      callback(new Error("输入不规范"))
      }else{
        callback()
      }
  }

// 设置通过规则不能为空
export const validateTrim = (_, value, callback) => {  
  
  if(!value){
    callback(new Error("不能为空"))
  }else{
      callback()
    }
}
