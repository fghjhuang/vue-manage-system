<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 常见问题管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="danger" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
                <el-button type="primary" icon="add" @click="addQna">添加常见问题</el-button>
            </div>
            <el-table :data="qnashowlist" border class="table" ref="multipleTable" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="head" label="标题" sortable width="150">
                </el-table-column>
                <el-table-column prop="url" label="url" width="180">
                </el-table-column>
                <el-table-column prop="content" label="内容" :formatter="formatter">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="qnasize">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog :title="edittitle" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="标题">
                    <el-input v-model="form.head"
                    ></el-input>
                </el-form-item>
                <el-form-item label="url">
                    <el-input
                            v-model="form.url"
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 5}"
                    ></el-input>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input type="textarea"
                              :autosize="{ minRows: 2, maxRows: 8}"
                              v-model="form.content">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">{{delMassage}}</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
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
                edittitle:"编辑",
                editdialogtype:1,//1->add,2->edit
                deldiaolgtype:1,//1->delete all, 2->delete item
                delMassage:"",
                cur_page: 1,
                multipleSelection: [],
                del_list: [],
                editVisible: false,
                delVisible: false,
                form: {
                    head: '',
                    content: '',
                    url: ''
                },
                idx: -1
            }
        },
        created() {

        },
        computed: {
            qnasize(){
                return this.qna.length;
            },
            qnashowlist() {
                return this.qna.filter((d,pos) => {
                    if (parseInt(pos/10)===(this.cur_page-1)){
                        return d;
                    }
                })
            }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                console.log("cur page:"+this.cur_page);
            },
            // 添加常见问题
            addQna() {
                this.editdialogtype=1;
                this.edittitle="添加常见问题";
                this.editVisible = true;
                this.form = {
                    head: "",
                    content: "",
                    url: ""
                };
            },
            formatter(row, column) {
                return row.content;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.editdialogtype=2;
                this.edittitle="编辑常见问题";
                this.idx = index;
                const item = this.qna[index];
                this.form = {
                    head: item.head,
                    content: item.content,
                    url: item.url
                };
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.idx = index;
                this.deldiaolgtype=2;
                this.delMassage ="删除不可恢复，是否确定删除？";
                this.delVisible = true;
            },
            delAll() {
                this.deldiaolgtype=1;
                const length = this.multipleSelection.length;
                this.delMassage ="你将要删除"+length+"组数据，删除不可恢复，是否确定删除？";
                this.delVisible = true;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                switch (this.editdialogtype) {
                    case 1:// add
                        this.qna.unshift(this.form);
                        this.$message.success(`添加常见问题成功`);
                        this.editVisible = false;
                        break;
                    case 2: // edit
                        this.$set(this.qna, this.idx, this.form);
                        this.editVisible = false;
                        this.$message.success(`修改第 ${this.idx+1} 行成功`);
                        break;
                }
               // console.log("qnasize:"+this.qnasize);
            },
            // 确定删除
            deleteRow(){
                switch (this.deldiaolgtype) {
                    case 1:
                        const length = this.multipleSelection.length;
                        for (let i = 0; i < length; i++) {
                            let pos=this.qna.indexOf(this.multipleSelection[i]);
                            this.qna.splice(pos,1);
                        }
                        this.$message.success('删除成功');
                        this.multipleSelection = [];
                        this.delVisible = false;
                        break;
                    case 2:
                        this.qna.splice(this.idx, 1);
                        this.$message.success('删除成功');
                        this.delVisible = false;
                        break;
                }

            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }
    .handle-del{

    }
    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .mr10{
        margin-right: 10px;
    }
</style>

