<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-warn"></i> 权限测试</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <h1>管理员权限页面</h1>
            <p>目前项目还没需要建立后台账号管理，以后需要的时候再进行开发</p>
        </div>

    </div>
</template>

<script>
    export default {
        data: function(){
            return {}
        }
    }
</script>

<style scoped>
h1{
    text-align: center;
    margin: 30px 0;
}
p{
    line-height: 30px;
    margin-bottom: 10px;
    text-indent: 2em;
}
.logout{
    color: #409EFF;
}
</style>