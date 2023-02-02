const express = require("express");
const app = express();
app.use(require("./modules/plugin/session"))
// 配置静态资源
app.use(express.static("./public"))

// 配置解析post
app.use(express.urlencoded({extended:false}))
app.use(express.json());
// 配置路由 
app.use("/user",require("./router/user"))

// 链接数据库
require("./mongoose/mongoose.js")

app.listen("5000",()=>{
    console.log("5000端口启动");
})