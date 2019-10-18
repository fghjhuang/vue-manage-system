<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-cascades"></i> 简家网关管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="add" class="handle-del mr10" @click="handleAdd">添加网关</el-button>

                <el-input v-model="search_gateway" placeholder="查找网关(输入GsnText)" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>


            <el-table :data="data" border class="table" ref="multipleTable">
                <el-table-column
                        label="状态"
                        width="70">
                    <template slot-scope="scope" >
                        <el-tag :type="getonlinetype(scope.row)">{{getonline(scope.row)}}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop="gname" label="名称" width="120">
                </el-table-column>
                <el-table-column prop="gsn" label="Gsn" width="120">
                </el-table-column>
                <el-table-column prop="gsntext" label="GsnText" width="180">
                </el-table-column>
                <el-table-column prop="appid" label="Appid" width="200">
                </el-table-column>
                <el-table-column prop="gtoken" label="GToken" width="180">
                </el-table-column>
                <el-table-column prop="logintime" label="上线时间" sortable width="120" :formatter="dateformat">
                </el-table-column>
                <el-table-column prop="logouttime" label="离线时间" sortable width="120" :formatter="dateformat">
                </el-table-column>
                <el-table-column label="操作" width="80" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button type="text" style="color: red" icon="el-icon-delete"
                                   @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next"
                               :page-size=gpagesize :total=pagecount>
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="名称">
                    <el-input v-model="form.gname"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 添加弹出框 -->
        <el-dialog title="添加网关" :visible.sync="addVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="名称">
                    <el-input v-model="form.gname"></el-input>
                </el-form-item>
            </el-form>
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="gsn">
                    {{form.gsn}}
                </el-form-item>
            </el-form>
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="gsntext">
                    <el-input v-model="form.gsntext">{{getgsn}}</el-input>
                </el-form-item>
            </el-form>
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="appid">
                    <el-input v-model="form.appid"></el-input>
                </el-form-item>
            </el-form>
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="gtoken">
                    <el-input v-model="form.gtoken"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="AddGateway">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'basetable',
        data() {
            return {
                url: 'http://localhost:8201/litehouse/gateway/readlist',
                updateurl: 'http://localhost:8201/litehouse/gateway/update',
                addurl: 'http://localhost:8201/litehouse/gateway/add',
                delurl: 'http://localhost:8201/litehouse/gateway/del',
                getcounturl: 'http://localhost:8201/litehouse/gateway/getcount',
                gatewaylistdata: [],
                cur_page: 1,
                gpagesize: 20,
                search_gateway: '',
                editVisible: false, // 修改框
                delVisible: false, //删除框
                addVisible: false,//添加框
                form: {
                    id: 0,
                    gname: '网关',
                    gtype: 1,
                    gsn: 0,
                    gsntext: '',
                    appid: 'ofir84YUMkexpdi923nqUV971JA0pqcUhTgX45dpKI91JFnbd91hd6G8dbxwJ61V',
                    gtoken: '0101jdnfudmfjklodeFH82KNhfpleq',
                    logintime: 0,
                    logouttime: 0
                },
                idx: -1,
                debug: {},
                allgatewaycount: 0,
                test: 0
            }
        },
        created() {
            this.initData();
        },
        computed: {

            data() {
                return this.gatewaylistdata
            },
            // 一共有多少页，应用用另外的接口获取
            pagecount() {
                return this.allgatewaycount;
            },
            // 根据gsntext获取gsn
            getgsn() {
                let snlist="";
                if (this.form.gsntext.split(":").length === 8) {
                    snlist=this.processhex(this.form.gsntext);
                    this.form.gsn =this.hex2int(snlist)
                }
                return this.form.gsntext
            },
        },
        methods: {
            // 把sntext转没：的16进制字符串
            processhex(hex){
                let result="";
                let hexlist = hex.split(":");
                for (let i=0;i<8;i++){
                    if (hexlist[i].length===1&&this.hex2int(hexlist[i])<10){
                        hexlist[i]='0'+hexlist[i];
                    }
                    result=result+hexlist[i];
                }
                //return this.form.gsntext.replace(new RegExp(":",'g'),"")
                return result;
            },
            // 16进制字符串转10进制
            hex2int(hex) {
                var len = hex.length, a = new Array(len), code;
                for (var i = 0; i < len; i++) {
                    code = hex.charCodeAt(i);
                    if (48 <= code && code < 58) {
                        code -= 48;
                    } else {
                        code = (code & 0xdf) - 65 + 10;
                    }
                    a[i] = code;
                }

                return a.reduce(function (acc, c) {
                    acc = 16 * acc + c;
                    return acc;
                }, 0);
            },
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            }
            ,
            // 获取 easy-mock 的模拟数据
            initData() {
                this.getcount();
                setTimeout(() => {
                    this.getData()
                }, 1000);
            },
            getonline(row){
                const item = row;
                const currentTime=new Date().getTime()/1000;
                if (currentTime >= item.logintime && item.logouttime < item.logintime) {
                    return "在线"
                }else{
                    return "离线"
                }
            },
            getonlinetype(row){
                const item = row;
                const currentTime=new Date().getTime()/1000;
                if (currentTime >= item.logintime && item.logouttime < item.logintime) {
                    return "success"
                }else{
                    return "danger"
                }
            },
            // 获取当前页面的数据
            getData() {
                // 开发环境使用 easy-mock 数据，正式环境使用 json 文件
                // if (process.env.NODE_ENV === 'development') {
                //     this.url = '/ms/table/list';
                // };
                let request = "{\n" +
                    "\"start\": " + this.gpagesize * (this.cur_page - 1) + ",\n" +
                    "\"count\": " + this.gpagesize + ",\n" +
                    "\"gsn\": 0,\n" +
                    "\"order\":\"gsn\"\n" +
                    "}";
                this.$axios.post(this.url, {
                    condition: request
                }).then((response) => {
                    this.gatewaylistdata = response.data;
                });

            }
            ,
            // 获取数据总数量
            getcount() {
                this.$axios.post(this.getcounturl).then((response) => {
                    this.allgatewaycount = parseInt(response.data);
                    console.log("get datasize:" + this.allgatewaycount);
                });
            }
            ,
            // 搜索网关
            search() {
                let request = "{\n" +
                    "\"start\": " + 0 + ",\n" +
                    "\"count\": 3,\n" +
                    "\"gsn\": " + this.search_gateway + ",\n" +
                    "\"order\":\"gsn\"\n" +
                    "}";
                this.$axios.post(this.url, {
                    condition: request
                }).then((response) => {
                    this.gatewaylistdata = response.data;
                });
            }
            ,
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

            // 点击显示添加网关框
            handleAdd() {
                this.addVisible = true;
            }
            ,
            //确认添加网关
            AddGateway() {
                let request = "{\n" +
                    "\"id\": 0,\n" +
                    "\"gname\":\"" +
                    this.form.gname +
                    "\",\n" +
                    "\"gtype\":1,\n" +
                    "\"gsn\":" +
                    this.form.gsn +
                    ",\n" +
                    "\"gsntext\":\""+ this.form.gsntext+"\",\n" +
                    "\"appid\":\""+ this.form.appid+"\",\n" +
                    "\"gtoken\":\""+ this.form.gtoken+"\",\n" +
                    "\"logintime\":0,\n" +
                    "\"logouttime\":0\n" +
                    "}";

                this.$axios.post(this.addurl, {
                    gateway: request
                }).then((response) => {
                    this.debug = response.data;
                    console.log("add data:" + response.data.state);
                    if (response.data.state == "success") {
                        this.getData();//重新获取一下
                        this.$message.success(`添加网关成功`);
                    }
                });
                this.addVisible = false;
            },


            // 点击批量删除
            handleDelete(index, row) {
                this.idx = index;
                this.delVisible = true;
            }
            ,
            // 确定删除
            deleteRow() {
                let request = this.gatewaylistdata[this.idx].gsn;

                this.$axios.post(this.delurl, {
                    gateway: request
                }).then((response) => {
                    this.debug = response.data;
                    console.log("update data:" + response.data.state);
                    if (response.data.state == "success") {
                        this.getData();//重新获取一下
                        setTimeout(() => {
                            this.getcount();
                        }, 500);
                        this.$message.success(`删除第 ${this.idx + 1} 行成功`);
                    }
                });
                this.delVisible = false;
            }
            ,

            // 弹出编辑网关信息的框
            handleEdit(index, row) {
                this.idx = index;
                const item = this.gatewaylistdata[index];
                this.form = {
                    gname: item.gname,
                };
                this.editVisible = true;
            }
            ,
            // 保存编辑网关名称
            saveEdit() {
                let request = "{\n" +
                    "\"id\": 0,\n" +
                    "\"gname\":\"" +
                    this.form.gname +
                    "\",\n" +
                    "\"gtype\":1,\n" +
                    "\"gsn\":" +
                    this.gatewaylistdata[this.idx].gsn +
                    ",\n" +
                    "\"gsntext\":\"\",\n" +
                    "\"appid\":\"changedata\",\n" +
                    "\"gtoken\":\"123\",\n" +
                    "\"logintime\":0,\n" +
                    "\"logouttime\":0\n" +
                    "}";

                this.$axios.post(this.updateurl, {
                    gateway: request
                }).then((response) => {
                    this.debug = response.data;
                    console.log("update data:" + response.data.state);
                    if (response.data.state == "success") {
                        this.getData();//重新获取一下
                        this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                    }
                });
                this.editVisible = false;
            }
            ,


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

    .del-dialog-cnt {
        font-size: 16px;
        text-align: center
    }

    .table {
        width: 100%;
        font-size: 14px;
    }

    .red {
        color: #ff0000;
    }

    .mr10 {
        margin-right: 10px;
    }
</style>
