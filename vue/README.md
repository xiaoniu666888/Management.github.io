### 前端技术
> vue3 vite Element-plus    axios vue-router

### 配置

1. Element-plus安装  并配置按需加载  通过官方文档配置
 - npm install -D unplugin-vue-components unplugin-auto-import

2. axios封装
    - 二次封装,完善后续功能
    - 设置message提示
    @import 'element-plus/theme-chalk/el-loading.css';
    @import 'element-plus/theme-chalk/el-message.css';
    
3. 重置样式
    - 下载sass的css预处理器
    - lang="sass"使用和vue-cli使用有细微差别

4. 设置vite.config.js
    - 设置别名 用于设置快捷路径
    - 设置跨域

5. 设置路由 vue-router

### Login组件
1. 操作form表单组件
    - (vue)ref 获取组件信息
    - form属性 label-width => 子属性的laber的宽度
    - ruels prop="选择验证规则"
    - 设置input框前置图标   :prefix-icon=""
    - formEl.validate   表单验证状态 验证规则是否匹配
2. 设置登录注册功能
    - 设置验证规则
    - 验证通过之后 设置发送请求至后端进行注册账号
    - 配置axios请求 并且传递数据 设置注册
    - 配置axios请求 设置登录功能
        - 登录成功,跳转Home页面
        - 配置router路由
    - 将登录的数据放置vuex中进行存储
    - 设置回车登录跳转并且跳转页面
        - 路由组件每次进入会重新加载

### Home组件主体
1. 设置element-plus中的容器
2. 设置容器头部数据
#### HomeHander组件头部
1. 设置阿里云矢量图
    - 通过添加到项目中并且配置前缀 el-icon-  element-icons
    - 在项目中引入对应样式
2. 引入Elemen的头像组件
    - 设置默认头像与动态头像
    - 通过vuex获取对应数据
3. 设置免登录功能
    - 在vuex中进行获取session数据,来进行登录
    - 设置ajax请求
    - 在App组件中进行执行vuex函数 执行axios请求
        - 获取对应的session数据  获取对应的账号信息  存到state中 与login组件登录是一致的
4. 限制访问
    - 设置必须登录才能访问
    - 在vuex中没有访问到session信息,说明没有登录
    - 返回登录页面
5. 设置退出账号功能
    - 使用element组件   el-popconfirm气泡确认框 按照文档进行设置
    - 设置axios请求删除session
    - 跳转到登录页面
6. 设置控制侧边栏功能
    - 通过vuex控制侧边栏移动
7. 设置展示页面名称变化
    - 通过路由的meta完成


#### HomeAside设置侧边栏
1. 基础配置
    - 使用element组件
    - collapse  控制组件展开收缩
    - 收缩侧边栏 将aside容器 width重置为默认属性auto
    - 设置收缩展开
        - css线程和js线程一旦冲突就会造成卡顿
        - GUI渲染线程(渲染css)与JS引擎线程(执行js)互斥
2. 配置路由
    - :router: true
    - index属性为路由地址

### ManageUser账号权限
1. 使用ele-ui组件的bottom input label dialog
2. 设置添加员工角色
    - 使用dialog对话框 设置自定义内容
    - 使用tree设置结构
        - :data="data" 数据
        - show-checkbox 可选择的
        - getCheckedNodes   获取节点数据
        - getCheckedKeys    获取key
        - setCheckedNodes   清空选中
        - dialogTableVisible.value = false 关闭弹窗
        - 添加到显示页面
        - 处理其他数据
3. 设置请求创建岗位
    - 获取数据之后  处理数据结构
    - 创建人数据 后端处理 populate()
    
4. 删除功能
5. 搜索功能
6. 重置功能
7. 分页功能
8. 加载功能

### Manage 账号管理
1. 添加账号
    - 通过form表单设置
    - 设置验证规则
2. 设置账号权限
    - 发送请求获取能设置的账号权限
    - 表单清空 通过直接设置(不是通过用户设置的)那么通过表单API清空是无效的 需要手动清空
3. 设置账号部门
4. 展示账号
5. 删除账号
6. 修改账号
 