//封装axios

import axios from "axios"
// ui框架 ElMessage提示功能
import { ElMessage } from 'element-plus'

// 发送请求
const createAxios = (TYPE,URL,DATA,PARAMs,res,rej) => {
    axios({
        method:TYPE,
        url:URL,
        data:DATA,
        params:PARAMs
    }).then(({data})=>{
        if(data.code == 1){
            ElMessage({
                message: data.value,
                type: 'success',
              })
        }
        
        if(data.code == 0){
            ElMessage({
               
                message: data.value,
                type: 'error',
              })
        }
        
        res(data)

    }).catch((err)=>{

        
        
        rej(err)
       
    })
}



export default (TYPE,URL,DATA) => {

    return new Promise((res,rej)=>{
        if( TYPE.toLocaleLowerCase() == "get"){
            createAxios(TYPE,URL,{},DATA,res,rej)
        }else{
            createAxios(TYPE,URL,DATA,{},res,rej)
        }
        
    })   
}