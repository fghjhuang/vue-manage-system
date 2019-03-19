<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-favor"></i> 软件版本管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="drag-box">
                <div class="drag-box-item">
                    <p style="color: #07c4a8">{{versionTitle[0].title}}</p>
                    <br/>
                    <br/>
                    链接:<p style="font-size: 14px;user-select:text;">{{versionTitle[0].url}}</p>
                    <br/>
                    <br/>
                    当前版本标识:<p5>{{versionTitle[0].versionCode}}</p5>
                    <br/>
                    <br/>
                    当前版本号:<p5>{{versionTitle[0].versionName}}</p5>
                    <br/>
                    <br/>
                    <el-upload
                            class="xxx"
                            action="https://jsonplaceholder.typicode.com/posts/">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传apk文件</div>
                    </el-upload>
                </div>

            </div>



        </div>


    </div>
</template>

<script>
    export default {
        name: 'basecharts',
        components: {},
        data: () => ({
            versionTitle: [
                {
                    title: "安卓热更新",
                    versionCode: 10,
                    versionName:"v1.1.0",
                    url:"http://www.smartlitehome.top/androidapp/download"
                }]
        }),
        methods:{
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
        }
    }
</script>

<style>
    .xxx{
        width: 100px;
    }
    .drag-box{
        display: flex;
        user-select: none;
    }
    .drag-box-item {
        flex: 1;
        max-width: 370px;
        min-width: 300px;
        background-color: #eff1f5;
        margin-right: 16px;
        border-radius: 6px;
        border: 1px #e1e4e8 solid;
    }
</style>