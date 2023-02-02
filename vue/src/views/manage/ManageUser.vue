<template>
    <div class="wrap">
        <!-- 头部 -->
        <div class="warp-handler">
            <el-button type="primary" @click="dialogTableVisible = true">新增角色</el-button>
            <div class="search">
                <el-input placeholder="请输入搜索名称" v-model.trim="inputValue"></el-input> &nbsp;
                <el-button type="primary" @click="handlerSearch">搜索</el-button>
                <el-button type="primary" @click="handlerRoleData">重置</el-button>
            </div>
        </div>
        <!-- 展示内容 -->
        <el-table :data="tableData" table-layout="auto" v-loading="loading">
            <el-table-column label="岗位" prop="roleName" min-width="180"/>
            <el-table-column label="创建时间" prop="roleDate"  min-width="180"/>
            <el-table-column label="权限" min-width="270">
                <template #default="{ row }">
                    <span v-for="item of row.roleArr" :key="item">{{ item.label }} &nbsp;</span>
                </template>
            </el-table-column>
            <el-table-column label="创建人" prop="roleAbout[userName]"  widmin-widthth="180"/>
            <el-table-column label="操作" fixed="right" min-width="180">
                <template #default="{ row, $index }">
                    <el-popconfirm title="是否删除"
                                    confirm-button-text="确定" 
                                    cancel-button-text="取消"
                                    @confirm="handleDelete(row, $index)"
                                    >
                        <template #reference>
                            <!-- @click="handleDelete(row, $index)" -->
                    <el-button size="small">删除</el-button>
                        </template>
                      </el-popconfirm>
                    <el-button size="small" @click="handleUpdate(row, $index)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 展示权限设置 -->
        <el-dialog v-model="dialogTableVisible" :title="updateBol.bol ? '添加员工岗位' :'修改员工岗位' " @close="reset">
            <div class="context">
                <span class="text">岗位名称:</span>
                <el-input v-model.trim="role.roleName" placeholder="请输入岗位"></el-input>
            </div>
            <el-tree ref="treeData" :data="data" :props="props" node-key="id" show-checkbox :check-strictly="true"
                :default-expand-all="true" />
            <el-button type="primary" @click="handlerRole">确认</el-button>
        </el-dialog>

        <el-pagination background hide-on-single-page layout="prev, pager, next" :total="len" @current-change="currentChange"/>
          
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from "vue"
import { data } from "@/assets/js/data/manage.js"
import { createRole, getRole, removeRole, roleSearch, upDateRole, getPage } from "@/assets/js/axios/axios.js"
import { userhandlerDate, userLoad} from "@/hooks/handlerData.js"
// 展示对话框
const dialogTableVisible = ref(false)

// 定义tree树的子节点
const props = {
    children: 'children',
    label: 'label',
    disabled: "name"
}

// 设置搜索功能
const handlerSearch = async () => {
    if (!inputValue) return;
    loadingTrue()
    let data = await roleSearch({ value: inputValue.value })
    tableData.value = userhandlerDate(data.data)
    len.value = data.len
    // 加载完成
    handleSet()
    // 清空输入框
    inputValue.value=""

}

// 设置修改
const handleUpdate = (row,index) => {
    dialogTableVisible.value = true
    // 设置tree结构
    role.roleName = row.roleName
    // 节点插入页面后执行
    nextTick(()=>{
        // 数组key
        treeData.value.setCheckedKeys(row.roleKeyArr)
    })
    // 设置修改
    updateBol.bol = false
    updateBol.index = index

}
let updateBol = reactive({
    bol:true,
    index:0
});
// 设置分页器
const currentChange = async (val) =>{
    // 发送ajax请求
    let data = await getPage({val})
    tableData.value = userhandlerDate(data.data)
}
// 搜索数据
let inputValue = ref("");
// 显示加载内容
let [loading,handleSet,loadingTrue] = userLoad()

// 定义岗位数据
let role = reactive({
    roleName: "",
    treeKeyArr: [],
    treeArr: []
});

// 分页器
let len = ref(0)

// 获取岗位数据 并且创建
const handlerRole = async () => {
    role.treeArr = treeData.value.getCheckedNodes()
    role.treeKeyArr = treeData.value.getCheckedKeys()
    if (!role.roleName) return;
    // 判断添加创建还是修改
   if(updateBol.bol){
        let data = await createRole(role)
        if (!data.code) return;
        tableData.value.push(...userhandlerDate(data.data))
   }else{
        // 修改
       let id = tableData.value[updateBol.index];
        let data = await upDateRole({role,id})
        tableData.value.splice(updateBol.index,1,...userhandlerDate(data.data))

   }

    // 清空
    reset()
}
let treeData = ref(null);

// 设置展示的账号
const tableData = ref([]);

// 重置弹窗内容功能
const reset = () => {
    // 清空选项选中
    treeData.value.setCheckedNodes([])
    role.roleName = ""
    // 关闭弹窗
    dialogTableVisible.value = false
    updateBol.bol = true

}

// 删除岗位数据 
const handleDelete = async (row, index) => {
    // console.log(index, row)
    await removeRole({ id: row._id })
    // 响应页面删除
    tableData.value.splice(index, 1)
}

// 获取初始数据
onMounted(() => {
    handlerRoleData()
})
// // 获取岗位初始数据
const handlerRoleData = async () => {
    let data = await getRole();
    if (!data.code) return;
    len.value = data.len
    // 处理数据
    tableData.value = userhandlerDate(data.data)
    inputValue.value=""
    // 加载完成
    handleSet()
}





</script>

<style lang="sass" scoped>
.wrap .warp-handler
        display: flex
        justify-content: space-between
        margin-bottom: 15px
.search
        display: flex
        width: 400px
        justify-content: sapce-between
.context
        text-align: center
        
.el-input
        width: 80%
.text
        padding-right: 8px
        
// 删除不能被选中的图标
:deep(.el-tree-node__content .el-checkbox .is-disabled)
            display: none 

:deep(.el-checkbox__inner)
    border-radius: 10px
.el-pagination
    justify-content: center
    margin-top: 20px
.el-table--fit
    min-height: 470px

</style>