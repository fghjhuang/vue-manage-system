<template>
    <section class="main">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-rank"></i> 常见问题</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-button type="danger" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>

        <el-button type="primary" class=" mr10" @click="addQna">添加常见问题</el-button>

        <el-table :data="qna" border class="table" ref="multipleTable" >
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="head" label="标题" sortable width="150">
            </el-table-column>
            <el-table-column prop="url" label="url" width="180">
            </el-table-column>
            <el-table-column prop="content" label="内容" :formatter="formatter">
            </el-table-column>
            <el-table-column label="操作" width="180" align="center">
                <template slot-scope="scope">
                    <el-button type="text" icon="el-icon-edit" >编辑</el-button>
                    <el-button type="text" icon="el-icon-delete" class="red" >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="qnazise">
            </el-pagination>
        </div>
        <!--<div class="container">-->
            <!--<p>通过指令 v-dialogDrag 使 Dialog 对话框具有可拖拽的功能。</p>-->
            <!--<br>-->
            <!--<el-button type="primary" @click="visible = true;">点我弹框</el-button>-->
        <!--</div>-->
        <!--<el-dialog v-dialogDrag title="拖拽弹框" center :visible.sync="visible" width="30%">-->
            <!--我是一个可以拖拽的对话框！-->
            <!--<span slot="footer" class="dialog-footer">-->
                <!--<el-button @click="visible = false">取 消</el-button>-->
                <!--<el-button type="primary" @click="visible = false">确 定</el-button>-->
            <!--</span>-->
        <!--</el-dialog>-->
    </section>
</template>

<script>
export default {
    data(){
        return {
            visible: false,
            qna: [{
                head: "红外控制不了",
                content: "如果红外线控制失败，请检查是否同时有其他红外设备正在使用",
                url: "http://www.baidu.com"
            },
                {
                    head: "如何添加设备",
                    content: "点击右上角，然后选择添加设备",
                    url: "http://www.baidu.com"
                },
                {
                    head: "控制设备没响应",
                    content: "请确认好已经添加设备成功，网关成功连接网络",
                    url: "http://www.baidu.com"
                }
            ],
            qnazise:30
        }
    },
    created() {

        console.log("init");

    }
}
</script>

<style>
    .red{
        color: #ff0000;
    }
    .mr10{
        margin-right: 10px;
        margin-bottom: 5px;
    }
</style>
