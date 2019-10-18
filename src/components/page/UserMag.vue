<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-service"></i> 简家用户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="select_phone" placeholder="查找用户(输入用户电话)" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>

            <!--表格-->
            <el-table :data="data" border class="table" ref="multipleTable">
                <el-table-column
                        label="状态"
                        width="70">
                    <template slot-scope="scope">
                        <el-tag  :type="getonline(scope.row)=== '在线' ? 'success' : 'danger'">{{getonline(scope.row)}}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop="name" label="用户名" width="150">
                </el-table-column>
                <el-table-column prop="phone" label="电话" width="180">
                </el-table-column>
                <el-table-column prop="email" label="邮箱" width="220">
                </el-table-column>
                <el-table-column prop="logintime" label="上线时间" sortable width="150" :formatter="dateformat">
                </el-table-column>
                <el-table-column prop="logouttime" label="离线时间" sortable width="150" :formatter="dateformat">
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next"
                               :page-size=upagesize :total=pagecount>
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="60px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-form>
            <el-form ref="form" :model="form" label-width="60px">
                <el-form-item label="密码">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
            </el-form>
            <el-form ref="form" :model="form" label-width="60px">
                <el-form-item label="邮箱">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>


    </div>
</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
                url: 'http://localhost:8201/litehouse/user/readlist',
                updateurl: 'http://localhost:8201/litehouse/user/update',
                getcounturl: 'http://localhost:8201/litehouse/user/getcount',
                userData: [],
                upagesize: 20,
                cur_page: 1,
                select_phone: '',
                editVisible:false,
                form: {
                    id:0,
                    name: '',
                    phone: '',
                    password: '',
                    email:'',
                    iconurl:'',
                    logintime:0,
                    logouttime:0
                },
                idx: -1,
                allusercount:0
            }
        },
        created() {
            this.initData();
        },
        computed: {
            data() {
                return this.userData
            },
            // 一共有多少页，应用用另外的接口获取
            pagecount() {
                return this.allusercount;
            },
        },
        methods: {
            getonline(row, column){
                const item = row;
                const currentTime=new Date().getTime()/1000;
                if (currentTime >= item.logintime && item.logouttime < item.logintime) {
                    return "在线"
                }else{
                    return "离线"
                }
            },
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            initData(){
                this.getcount();
                setTimeout(() => {
                    this.getData()
                }, 1000);
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                // if (process.env.NODE_ENV === 'development') {
                //     this.url = '/ms/table/list';
                // };
                let request = "{\n" +
                    "\"start\": " + this.upagesize * (this.cur_page - 1) + ",\n" +
                    "\"count\": " + this.upagesize + ",\n" +
                    "\"search\": \"default\",\n" +
                    "\"username\": \"\",\n" +
                    "\"time_start\": 0,\n" +
                    "\"time_end\": 0,\n" +
                    "\"order\":\"id\",\n" +
                    "\"info\":"+JSON.stringify(this.form)+"\n" +
                    "}";
                this.$axios.post(this.url, {
                    condition: request
                }).then((response) => {
                    this.userData = response.data;
                });
            },
            // 获取数据总数量
            getcount() {
                this.$axios.post(this.getcounturl).then((response) => {
                    this.allusercount = parseInt(response.data);
                    console.log("get usersize:" + this.allusercount);
                });
            },

            search() {
                let request = "{\n" +
                    "\"start\": " + this.upagesize * (this.cur_page - 1) + ",\n" +
                    "\"count\": " + this.upagesize + ",\n" +
                    "\"search\": \"phone\",\n" +
                    "\"username\": \""+this.select_phone+"\",\n" +
                    "\"time_start\": 0,\n" +
                    "\"time_end\": 0,\n" +
                    "\"order\":\"id\",\n" +
                    "\"info\":"+JSON.stringify(this.form)+"\n" +
                    "}";
                if (this.select_phone===""){
                    this.getData();
                } else{
                    this.$axios.post(this.url, {
                        condition: request
                    }).then((response) => {
                        this.userData=[];
                        this.userData[0] = response.data;
                    });
                }
            },

            //格式化显示日期
            dateformat(row, column) {
                let date = new Date(row[column.property] * 1000);
                let y = date.getFullYear();
                let MM = date.getMonth() + 1;
                MM = MM < 10 ? ('0' + MM) : MM;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                let h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                let m = date.getMinutes();
                m = m < 10 ? ('0' + m) : m;
                let s = date.getSeconds();
                s = s < 10 ? ('0' + s) : s;
                return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
            }
            ,

            handleEdit(index, row) {
                this.idx = index;
                const item = this.userData[index];
                this.form = {
                    id:item.id,
                    name: item.name,
                    phone: item.phone,
                    password: item.password,
                    email:item.email,
                    iconurl:item.iconurl,
                    logintime:item.logintime,
                    logouttime:item.logouttime
                };
                this.editVisible = true;
            },

            // 保存编辑
            saveEdit() {
                if (!(this.form.name === this.userData[this.idx].name)) {
                    let request = "{\n" +
                        "\"start\": " + this.upagesize * (this.cur_page - 1) + ",\n" +
                        "\"count\": " + this.upagesize + ",\n" +
                        "\"search\": \"update_username\",\n" +
                        "\"username\": \"\",\n" +
                        "\"time_start\": 0,\n" +
                        "\"time_end\": 0,\n" +
                        "\"order\":\"id\",\n" +
                        "\"info\":"+JSON.stringify(this.form)+"\n" +
                        "}";
                    this.$axios.post(this.updateurl, {
                        info: request
                    });
                }
                if (!(this.form.email === this.userData[this.idx].email)) {
                    let request = "{\n" +
                        "\"start\": " + this.upagesize * (this.cur_page - 1) + ",\n" +
                        "\"count\": " + this.upagesize + ",\n" +
                        "\"search\": \"update_email\",\n" +
                        "\"username\": \"\",\n" +
                        "\"time_start\": 0,\n" +
                        "\"time_end\": 0,\n" +
                        "\"order\":\"id\",\n" +
                        "\"info\":"+JSON.stringify(this.form)+"\n" +
                        "}";
                    setTimeout(() => {
                        this.$axios.post(this.updateurl, {
                            info: request
                        });
                    }, 500);

                }
                if (!(this.form.password === this.userData[this.idx].password)) {
                    let request = "{\n" +
                        "\"start\": " + this.upagesize * (this.cur_page - 1) + ",\n" +
                        "\"count\": " + this.upagesize + ",\n" +
                        "\"search\": \"update_password\",\n" +
                        "\"username\": \"\",\n" +
                        "\"time_start\": 0,\n" +
                        "\"time_end\": 0,\n" +
                        "\"order\":\"id\",\n" +
                        "\"info\":"+JSON.stringify(this.form)+"\n" +
                        "}";
                    setTimeout(() => {
                        this.$axios.post(this.updateurl, {
                            info: request
                        });
                    }, 1000);
                }

                setTimeout(() => {
                    this.getData()
                }, 2000);

                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx+1} 行成功`);
            },

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
