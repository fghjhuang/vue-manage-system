<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i>简家app反馈信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="tabname">

                <!--未读消息表格-->
                <el-tab-pane :label="`未读消息(${unread.length})`" name="first">
                    <!--表格内容-->
                    <el-table :data="unread" :show-header="true" style="width: 100%"  @current-change="selectItem">
                        <el-table-column label="标题">
                            <template slot-scope="scope">
                                <span class="message-title">{{scope.row.detail | ellipsis}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="username" label="用户名" sortable width="180"></el-table-column>
                        <el-table-column prop="time" label="日期" sortable width="180" :formatter="dateformat"></el-table-column>
                        <el-table-column width="120">
                            <template slot-scope="scope">
                                <el-button size="small" @click="handleRead(scope.$index, scope.row)">标为已读</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!--翻页-->
                    <div class="pagination">
                        <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="unread.length">
                        </el-pagination>
                    </div>

                    <!--下一行的按钮-->
                    <div class="handle-row">
                        <el-button type="primary">全部标为已读</el-button>
                    </div>

                </el-tab-pane>


                <!--已读消息表格-->
                <el-tab-pane :label="`已读未处理消息(${read.length})`" name="second">
                    <!--template表示是否显示-->
                    <template v-if="tabname === 'second'">

                        <el-table :data="read" :show-header="true" style="width: 100%" @current-change="selectItem">
                            <el-table-column label="标题">
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.detail| ellipsis}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="username" label="用户名" sortable width="180"></el-table-column>
                            <el-table-column prop="time" label="日期" sortable width="150" :formatter="dateformat"></el-table-column>
                            <el-table-column width="120">
                                <template slot-scope="scope">
                                    <el-button type="primary" @click="handleprocess(scope.$index, scope.row)">标为已处理</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!--翻页-->
                        <div class="pagination">
                            <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="read.length">
                            </el-pagination>
                        </div>
                    </template>

                </el-tab-pane>


                <el-tab-pane :label="`已读已处理(${processed.length})`" name="third">
                    <!--template表示是否显示-->
                    <template v-if="tabname === 'third'">

                        <el-table :data="processed" :show-header="true" style="width: 100%" @current-change="selectItem">
                            <el-table-column label="标题">
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.detail| ellipsis}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="username" label="用户名" sortable width="180"></el-table-column>
                            <el-table-column prop="time" label="日期" sortable width="150" :formatter="dateformat"></el-table-column>
                            <el-table-column width="120">
                                <template slot-scope="scope">
                                    <el-button type="success" @click="handlefinish(scope.$index, scope.row)">标为已完成</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!--翻页-->
                        <div class="pagination">
                            <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="processed.length">
                            </el-pagination>
                        </div>
                    </template>

                </el-tab-pane>

                <el-tab-pane :label="`搜用户反馈(${searchuserfeedback.length})`" name="fourth">
                    <!--template表示是否显示-->
                    <template v-if="tabname === 'fourth'">
                        <el-row :gutter="5">
                            <el-col :span="8">
                                <el-input v-model="search_feedback" placeholder="查找反馈信息(输入用户手机号)" class="handle-input mr10"></el-input>
                            </el-col>
                            <el-col :span="8">
                                <el-button type="primary" icon="search" @click="search">搜索</el-button>
                            </el-col>
                        </el-row>


                        <el-table :data="searchuserfeedback" :show-header="true" style="width: 100%" @current-change="selectItem">
                            <el-table-column label="标题">
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.detail| ellipsis}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="username" label="用户名" sortable width="180"></el-table-column>
                            <el-table-column prop="time" label="日期" sortable width="150" :formatter="dateformat"></el-table-column>
                            <el-table-column  label="状态" width="150" >
                                <template slot-scope="scope" >
                                    <el-tag :type="getstatetype(scope.row)">{{getstate(scope.row)}}</el-tag>
                                </template>
                            </el-table-column>
                            <el-table-column width="250" label="标记">
                                <template slot-scope="scope">
                                    <el-button type="danger" @click="handleunread(scope.$index, scope.row)">未读</el-button>
                                    <el-button type="warning" @click="handlenotprocess(scope.$index, scope.row)">未处理</el-button>
                                    <el-button type="primary" @click="handleprocessed(scope.$index, scope.row)">已处理</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!--翻页-->
                        <div class="pagination">
                            <el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :total="searchuserfeedback.length">
                            </el-pagination>
                        </div>
                    </template>

                </el-tab-pane>

            </el-tabs>
        </div>

        <!-- 提示框 -->
        <el-dialog title="提示" :visible.sync="markFinishVis" width="300px" center>
            <div class="del-dialog-cnt">确认设置为已完成吗？如果确定会标记已完成，以后不会显示该消息！请考虑清楚！</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="markFinishVis = false">取 消</el-button>
                <el-button type="primary" @click="confirmFinish">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="详情" :visible.sync="showdetail" width="30%">
            <el-form ref="feedbackcontent" :model="feedbackcontent" label-width="100px">
                <el-form-item label="ID">
                    {{feedbackcontent.id}}
                </el-form-item>
            </el-form>
            <el-form ref="feedbackcontent" :model="feedbackcontent" label-width="100px">
                <el-form-item label="手机号">
                    {{feedbackcontent.username}}
                </el-form-item>
            </el-form>
            <el-form ref="feedbackcontent" :model="feedbackcontent" label-width="100px">
                <el-form-item label="邮箱">
                    {{feedbackcontent.email}}
                </el-form-item>
            </el-form>
            <el-form ref="feedbackcontent" :model="feedbackcontent" label-width="100px">
                <el-form-item label="提交时间">
                    {{feedbackcontent.time}}
                </el-form-item>
            </el-form>
            <el-form ref="feedbackcontent" :model="feedbackcontent" label-width="100px">
                <el-form-item label="内容">
                    {{feedbackcontent.detail}}
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showdetail = false">取 消</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: 'tabs',
        filters: {
            // 超过一定数量标题就显示...
            ellipsis (value) {
                if (!value) return '';
                if (value.length > 35) {
                    return value.slice(0,35) + '...'
                }
                return value
            }
        },
        data() {
            return {
                readurl:"http://localhost:8201/litehouse/feedback/readlist",
                readcounturl:"http://localhost:8201/litehouse/feedback/getcount",
                updateurl:"http://localhost:8201/litehouse/feedback/updatefeedback",
                tabname: 'first',
                showHeader: false,
                listorder: '',
                unread: [],
                read: [],
                processed:[],
                searchuserfeedback:[],
                cur_page:1,
                search_feedback:"",
                command:{
                    start:0,
                    count:50,
                    search:"",
                    username:"",
                    timestart:0,
                    timeend:0,
                    state:0,
                    readed:0,
                    order:"id"
                },
                feedbackcontent:{
                    id:0,
                    username:"",
                    email:"",
                    detail:"",
                    time:0,
                    readed:0,
                    state:0
                },
                markFinishVis:false,
                showdetail:false,
                idx:0,
            }
        },
        created(){
            this.initData()
        },
        computed: {
            unreadNum(){
                return this.unread.length;
            }
        },
        methods: {
            selectItem(val){
              const item = val;
              this.showdetail=true;
               this.feedbackcontent.id=item.id;
               this.feedbackcontent.detail=item.detail;
                this.feedbackcontent.email=item.email;
                this.feedbackcontent.time=item.time;
            },
            getstate(row){
                const item = row;
                if (item.readed===0){
                    return "未读"
                } else{
                    switch (item.state) {
                        case 1://未处理
                            return "未处理";
                        case 2://已处理
                            return "已处理";
                        case 3://已完成
                            return "已完成";
                    }
                }
            },
            getstatetype(row){
                const item = row;
                if (item.readed===0){
                    return "danger"
                } else{
                    switch (item.state) {
                        case 1://未处理
                            return "warning";
                        case 2://已处理
                            return "primary";
                        case 3://已完成
                            return "success"
                    }
                }
            },

            // 查找
            search(){
                this.getData(4);
            },
            // 分页导航
            handleCurrentChange(type,val) {
                this.cur_page = val;
                switch (this.tabname) {
                    case "first":
                        this.getData(1);
                        break;
                    case "second":
                        this.getData(2);
                        break;
                    case "third":
                        this.getData(3);
                        break;
                    case "fourth":
                        this.getData(4);
                        break;
                }
            },

            initData(){
                this.getData(1);
                setTimeout(() => {
                    this.getData(2)
                }, 500);
                setTimeout(() => {
                    this.getData(3)
                }, 1000);
            },
            // 获取数据
            getData(type){
                switch (type) {
                    case 1://读取未读的消息
                        this.command.search="readed";
                        this.command.readed=0;
                        this.command.start=this.command.count*(this.cur_page-1);
                        this.$axios.post(this.readurl,{
                            condition:JSON.stringify(this.command)
                        }).then((response) => {
                            this.unread=response.data;
                        });
                        break;
                    case 2://读取已读未处理的消息
                        this.command.search="state";
                        this.command.readed=1;
                        this.command.state=1;
                        this.command.start=this.command.count*(this.cur_page-1);
                        this.$axios.post(this.readurl,{
                            condition:JSON.stringify(this.command)
                        }).then((response) => {
                            this.read=response.data;
                        });
                        break;
                    case 3:// 读取已处理的消息
                        this.command.search="state";
                        this.command.readed=1;
                        this.command.state=2;
                        this.command.start=this.command.count*(this.cur_page-1);
                        this.$axios.post(this.readurl,{
                            condition:JSON.stringify(this.command)
                        }).then((response) => {
                            this.processed=response.data;
                        });
                        break;
                    case 4:// 读取某个用户的消息
                        this.command.search="username";
                        this.command.username=this.search_feedback;
                        this.command.start=this.command.count*(this.cur_page-1);
                        this.$axios.post(this.readurl,{
                            condition:JSON.stringify(this.command)
                        }).then((response) => {
                            this.searchuserfeedback=response.data;
                        });
                        break;
                }

            },

            updateFeedback(){
                this.$axios.post(this.updateurl,{
                    feedbackContent:JSON.stringify(this.feedbackcontent)
                }).then((response) => {
                    this.initData();
                });
            },
            // 标记为已读未处理
            handleRead(index, itemObject) {
                this.idx = this.unread.indexOf(itemObject);
                this.feedbackcontent.id=this.unread[this.idx].id;
                this.feedbackcontent.readed=1;
                this.feedbackcontent.state=1;
                this.updateFeedback();
                // ////删除起始下标为index，长度为1的一个值(len设置1)
                // const item = this.unread.splice(index, 1);
                // console.log(item);
                // //concat()方法可以简单的将其理解为合并数组
                // this.read = item.concat(this.read);
            },
            // 标记为已读已处理
            handleprocess(index, itemObject){
                this.idx = this.read.indexOf(itemObject);
                this.feedbackcontent.id=this.read[this.idx].id;
                this.feedbackcontent.readed=1;
                this.feedbackcontent.state=2;
                this.updateFeedback();
            },
            // 标记为未读
            handleunread(index, itemObject){
                this.idx = this.searchuserfeedback.indexOf(itemObject);
                this.feedbackcontent.id=this.searchuserfeedback[this.idx].id;
                this.feedbackcontent.readed=0;
                this.feedbackcontent.state=1;
                this.updateFeedback();
            },
            // 标记为已读未处理
            handlenotprocess(index, itemObject){
                this.idx = this.searchuserfeedback.indexOf(itemObject);
                this.feedbackcontent.id=this.searchuserfeedback[this.idx].id;
                this.feedbackcontent.readed=1;
                this.feedbackcontent.state=1;
                this.updateFeedback();
            },
            // 标记为已读已处理
            handleprocessed(index, itemObject){
                this.idx = this.searchuserfeedback.indexOf(itemObject);
                this.feedbackcontent.id=this.searchuserfeedback[this.idx].id;
                this.feedbackcontent.readed=1;
                this.feedbackcontent.state=2;
                this.updateFeedback();
            },
            // 标记为已读已完成
            handlefinish(index, itemObject) {
                this.idx = this.processed.indexOf(itemObject);
                this.markFinishVis=true;
            },
            // 确定已读已完成
            confirmFinish(){
                this.feedbackcontent.id=this.processed[this.idx].id;
                this.feedbackcontent.readed=1;
                this.feedbackcontent.state=3;
                this.updateFeedback();
                this.markFinishVis=false;
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
        },

    }

</script>

<style>
.message-title{
    cursor: pointer;
}
.handle-row{
    margin-top: 30px;
}
</style>

