const express = require("express");
const router = express.Router();
const {
    handlerReg,
    handlerLogin,
    createRole,
    getRole,
    removeRole,
    roleSearch,
	updateRole,
	getPage,
	getJurisdiction
} = require("../modules/handleVue/handlerUser")

// 设置注册路由
router.post("/reg",async (req,res)=>{
    let result = await handlerReg(req.body)
    res.send(result)
})

// 设置登录路由
router.post("/login",async (req,res)=>{
    let result = await handlerLogin(req.body)
    // 设置session进行自动验证登录
    if(result.code)  req.session.userSession = result;
    res.send(result)
})

// 获取session路由
router.get("/session",(req,res)=>{
    let result = req.session.userSession
    // 设置session进行自动验证登录
    if(result) return res.send({code:1,value:"session存在",data:result})
    res.send({code:0,value:"请先登录",data:''})
})

// 销毁session路由
router.post("/delete",(req,res)=>{
     req.session.userSession = ""
    res.send({code:1,value:"退出成功",data:''})
})

// 创建岗位路由
router.post("/role",async (req,res)=>{
    let result = await createRole(req.body,req.session.userSession)
   res.send(result)
})

// 获取初始岗位路由
router.get("/getrole",async (req,res)=>{
    let result = await getRole()
   res.send(result)
})

// 删除岗位路由
router.post("/remove",async (req,res)=>{
    let result = await removeRole(req.body)
   res.send(result)
})

// 搜索岗位路由
router.post("/search",async (req,res)=>{
    let result = await roleSearch(req.body)
   res.send(result)
})

// 修改岗位路由
router.post("/update",async (req,res)=>{
    let result = await updateRole(req.body)
   res.send(result)
})

// 分页获取岗位路由
router.post("/page",async (req,res)=>{
    let result = await getPage(req.body)
   res.send(result)
})

// 获取所有岗位数据
router.get("/jur",async (req,res)=>{
    let result = await getJurisdiction()
   res.send(result)
})

module.exports = router 