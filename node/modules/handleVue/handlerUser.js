const mongooUser = require("../../mongoose/mongoUser");
const mongoRole = require("../../mongoose/mongoRole");


// 处理账号注册功能
exports.handlerReg = async ({userName,userPass})=>{
    // 先判断是否存在该账号
    let bol =  await mongooUser.findOne({userName});
    if(bol)    return {code:0,value:"已存在该账号",data:""}
       // 不存在创建
      let result = await mongooUser.create({
            userName:userName, // 账号
            userPass:userPass, // 密码
            userDate:Date.now(),  // 账号创建时间

        })
        return {code:1,value:"注册成功",data:result}
    
    // 存在
    
} 
// 处理登录功能
exports.handlerLogin = async({userName,userPass})=>{
    // 先判断是否存在该账号
    let bol =  await mongooUser.findOne({userName});
    // 不存在
    if(!bol)    return {code:0,value:"账号不存在",data:"result"}
    // 存在 判断密码是否正确   
    if(bol.userPass === userPass)  return {code:1,value:"登录成功",data:bol}
    // 密码错误
     return {code:0,value:"密码错误",data:"result"}    
}

// 处理创建岗位功能
exports.createRole = async({roleName,treeKeyArr,treeArr},{data})=>{
   let bol = await mongoRole.findOne({roleName});
   // 存在
   if(bol) return {code:0,value:"岗位已存在",data:""};
   // 不存在 {roleName,treeKeyArr,treeArr},{data}
   await mongoRole.create({
    roleName:roleName,   // 岗位名称
    roleDate:Date.now(),                   //  岗位创建时间
    roleKeyArr:treeKeyArr,                //  岗位key
    roleArr:treeArr,                   // 岗位权限
    roleAbout:data._id               // 岗位关联创建人
   })
   // 返回数据
  let data1 =  await mongoRole.find({roleName}).populate("roleAbout",{userName:1});;
     return {code:1,value:"创建成功",data:data1}
  }
  
// 获取员工数据
exports.getRole = async ()=>{
	
    let data = await mongoRole.find({},{},{}).populate("roleAbout",{userName:1});
	let len = data.length;
	let result = data.slice(0,10)
      return {code:1,value:"创建成功",data:result,len}    
 }

 // 删除岗位数据
 exports.removeRole = async ({id})=>{
  await mongoRole.deleteOne({_id:id})
    return {code:3,value:"删除成功",data:"result"}    
}

// 搜索岗位功能
exports.roleSearch = async ({value})=>{
    let result = await mongoRole.find({
        // 正则匹配
        roleName:{
            "$regex":value
        }
    },
    {},
    {}).populate("roleAbout",{userName:1});
	  let len = result.length
	  let result1 = result.slice(0,10)
      return {code:3,value:"搜索成功",data:result1,len}    
  }

// 修改岗位数据
exports.updateRole = async ({role,id})=>{
	   await mongoRole.updateOne(
	  {_id:id},
	  {
		  roleName:role.roleName,   // 岗位名称
		  roleKeyArr:role.treeKeyArr,                //  岗位key
		  roleArr:role.treeArr,                   // 岗位权限
	  })
	  let result = await mongoRole.find({_id:id}).populate("roleAbout",{userName:1});
	  
      return {code:3,value:"搜索成功",data:result}    
  }
  
  // 获取分页数据
  exports.getPage = async ({val})=>{
	  // skip:1,limit:1
	  let num = val * 10 - 10
	  let result = await mongoRole.find({},{},{skip:num,limit:10}).populate("roleAbout",{userName:1});
        return {code:3,value:"翻页成功",data:result}    
   }
   
   // 获取岗位数据
   exports.getJurisdiction = async ()=>{
   	  
   	  let result = await mongoRole.find({},{},{})
         return {code:3,value:"获取成功",data:result}    
    }
   