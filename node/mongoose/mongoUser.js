const mongoose = require("mongoose");
// 设置账号表格

module.exports = mongoose.model(
    "mongoUser",
    new mongoose.Schema(
        {
            userName:{type:String,required:true,min:3,max:12}, // 账号
            userPass:{type:String,required:true,min:6,max:12}, // 密码
            userDate:{type:Date},  // 账号创建时间
            userImg:{type:String,default:"/default/1.jpg"}, // 默认头像
            // userAbout:{         // 账号权限
            //     type:mongoose.Schema.Types.ObjectId,
            //     ref:"mongoRole"
            // },
            // userCreate:{
            //     type:mongoose.Schema.Types.ObjectId,
            //     ref:"mongonUser"
            // }
        },
        {
            versionKey:false
        }
    )
)