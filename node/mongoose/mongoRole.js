const mongoose = require("mongoose");
// 设置账号表格

module.exports = mongoose.model(
    "mongoRole",
    new mongoose.Schema(
        {
            roleName:{type:String,required:true},   // 岗位名称
            roleDate:{type:Date},                   //  岗位创建时间
            roleKeyArr:{type:Array},                //  岗位key
            roleArr:{type:Array},                   // 岗位权限
            roleAbout:{                             // 岗位关联创建人
                type:mongoose.Schema.Types.ObjectId,
                ref:"mongoUser"
            }
        },
        {
            versionKey:false
        }
    )
)