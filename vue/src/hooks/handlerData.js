import { ref } from "vue"
// 处理岗位数据
export const userhandlerDate = (value) => {
    return value.map((item) => {
        item.roleDate = item.roleDate.replace("T", " ").split(".")[0];
        return item
    })
}

// 处理加载内容
export const userLoad = (value) => {
    // 默认显示
    let loading = ref(true);
    // 设置为true
    const loadingTrue = () => {
        loading.value = true

    }
    // 处理隐藏
    const handleSet = () => {
        setTimeout(() => {
            loading.value = false
        }, 300)
    }
    return [loading, handleSet, loadingTrue]
}

// 处理表单清空
export const userFormClear = (value)=>{
    console.log(value);
}