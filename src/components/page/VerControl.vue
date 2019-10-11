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
                    <div class="message-title" style="color: #07c4a8">
                        安卓App内更新检查
                    </div>
                    <br/>
                    链接地址:<p style="font-size: 14px;user-select:text;">{{versionTitle[0].url}}</p>
                    <br/>
                    当前版本标识:<el-input  v-model="versionTitle[0].versionCode"></el-input>
                    <br/>
                    <br/>
                    当前版本号:<el-input  v-model="versionTitle[0].versionName"></el-input>
                    <br/>
                    <br/>
                    <el-upload
                            class="upload-demo"
                            drag
                            action="https://jsonplaceholder.typicode.com/posts/"
                            multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                    <br/>
                    <el-button type="success" >保存</el-button>
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
                    versionCode: 10,
                    versionName:"v1.1.0",
                    url:"http://www.smartlitehome.top/androidapp/download"
                }],
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
    .inline-block {
        display: inline-block;
    }
</style>