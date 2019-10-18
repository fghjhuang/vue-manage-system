<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 常见问题管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="add" @click="addQna">添加常见问题</el-button>
            </div>
            <el-table :data="qnashowlist" border class="table" ref="multipleTable">
                <el-table-column prop="head" label="标题" sortable width="150">
                </el-table-column>
                <el-table-column prop="url" label="url" width="180">
                </el-table-column>
                <el-table-column prop="content" label="内容">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange"
                               :page-size=npagesize layout="prev, pager, next" :total="qnasize">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
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
                <el-button type="danger" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
                readurl:"http://localhost:8201/litehouse/about/readinfo",
                writeurl:"http://localhost:8201/litehouse/about/updateinfo",
                qna: [],
                alldata:[],
                editdialogtype:1,//1->add,2->edit
                delMassage:"",
                cur_page: 1,
                npagesize:10,
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
            this.initData()
        },
        computed: {
            qnasize(){
                return this.qna.length;
            },
            qnashowlist() {
                return this.qna.filter((value,position) => {
                    if (parseInt(position/this.npagesize)===(this.cur_page-1)){
                        return value;
                    }
                })
            }
        },
        methods: {
            initData(){
                this.getData()
            },
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
            },
            // 获取数据
            getData(){
                this.$axios.post(this.readurl).then((response) => {
                    this.alldata=response.data;
                    this.qna = this.alldata.qna;
                });
            },
            // 添加常见问题
            addQna() {
                this.editdialogtype=1;
                this.editVisible = true;
                this.form = {
                    head: "",
                    content: "",
                    url: ""
                };
            },

            // 修改常见问题内容
            handleEdit(index, row) {
                this.editdialogtype=2;
                console.log("index:"+index);
                this.idx = (this.cur_page-1)*this.npagesize+index;
                const item = this.qna[this.idx];
                console.log("idx:"+ this.idx);
                this.form = {
                    head: item.head,
                    content: item.content,
                    url: item.url
                };
                this.editVisible = true;
            },
            // 删除一条数据
            handleDelete(index, item) {
                this.idx = (this.cur_page-1)*this.npagesize+index;
                this.delMassage ="删除不可恢复，是否确定删除？";
                this.delVisible = true;
            },

            // 保存编辑
            saveEdit() {
                switch (this.editdialogtype) {
                    case 1:// add
                        this.qna.unshift(this.form);
                        this.editVisible = false;
                        this.alldata.qna=this.qna;
                        this.$axios.post(this.writeurl,{
                            updatejson:JSON.stringify(this.alldata)
                        }).then((response) => {
                            this.getData();
                            this.$message.success(`添加常见问题成功`);
                        });
                        break;
                    case 2: // edit
                        this.$set(this.qna, this.idx, this.form);
                        this.editVisible = false;
                        this.alldata.qna=this.qna;
                        this.$axios.post(this.writeurl,{
                            updatejson:JSON.stringify(this.alldata)
                        }).then((response) => {
                            this.getData();
                            this.$message.success(`修改第 ${this.idx+1} 行成功`);
                        });
                        break;
                }
               // console.log("qnasize:"+this.qnasize);
            },
            // 确定删除
            deleteRow(){
                this.qna.splice(this.idx, 1);
                this.alldata.qna=this.qna;
                this.$axios.post(this.writeurl,{
                    updatejson:JSON.stringify(this.alldata)
                }).then((response) => {
                    this.getData();
                    this.$message.success('删除成功');
                });
                this.delVisible = false;

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

