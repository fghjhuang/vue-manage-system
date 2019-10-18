<template>
    <section class="main">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-rank"></i> App新闻管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container" style="width: 95%">

            <!--标题头配置-->
            <div class="drag-box">
                <!--头部信息配置-->
                <el-row :gutter="5">
                    <el-col :span="8">
                        <el-card>
                            <div slot="header"><span>头部图片1</span>
                            </div>
                            <el-row :gutter="10">
                                <el-col :span="6"><p>图片url</p>
                                </el-col>
                                <el-col :span="15">
                                    <el-input v-model="sourcejson.head[0].headicon"></el-input>
                                </el-col>
                            </el-row>
                            <el-row :gutter="10">
                                <el-col :span="6"><p>跳转url</p>
                                </el-col>
                                <el-col :span="15">
                                    <el-input v-model="sourcejson.head[0].headurl"></el-input>
                                </el-col>
                            </el-row>
                        </el-card>
                    </el-col>

                    <el-col :span="8">
                        <el-card>
                            <div slot="header"><span>头部图片2</span>
                            </div>
                            <el-row :gutter="10">
                                <el-col :span="6"><p>图片url</p>
                                </el-col>
                                <el-col :span="15">
                                    <el-input v-model="sourcejson.head[1].headicon"></el-input>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="6"><p>跳转url</p>
                                </el-col>
                                <el-col :span="15">
                                    <el-input v-model="sourcejson.head[1].headurl"></el-input>
                                </el-col>
                            </el-row>
                        </el-card>
                    </el-col>

                    <el-col :span="8">
                        <el-card>
                            <div slot="header"><span>头部图片3</span>
                            </div>
                            <el-row :gutter="20">
                                <el-col :span="6"><p>图片url</p>
                                </el-col>
                                <el-col :span="15">
                                    <el-input v-model="sourcejson.head[2].headicon"></el-input>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="6"><p>跳转url</p>
                                </el-col>
                                <el-col :span="15">
                                    <el-input v-model="sourcejson.head[2].headurl"></el-input>
                                </el-col>
                            </el-row>
                        </el-card>
                    </el-col>

                </el-row>
            </div>

            <!--简家新闻信息配置-->
            <div class="drag-box">
                <div style="min-width: 800px; width: 100%">
                    <el-card>
                        <el-button type="primary" @click="addNews">添加新闻</el-button>
                        <br/>
                        <br/>
                        <el-tabs type="card" @tab-click="handleTagClick" v-model="activeTag">
                            <el-tab-pane label="简家新闻" name="litehomenews"></el-tab-pane>
                            <el-tab-pane label="智能家居新闻" name="smarthomenews"></el-tab-pane>
                        </el-tabs>
                        <el-table :data="shownewsdata" border style="width: 100%">
                            <el-table-column prop="title" label="标题" width="280">
                            </el-table-column>
                            <el-table-column prop="url" label="跳转地址" width="280">
                            </el-table-column>
                            <el-table-column width="280" prop="pic" label="图片地址">
                            </el-table-column>
                            <el-table-column width="100" prop="timestr" label="日期" sortable="">
                            </el-table-column>

                            <el-table-column label="操作" width="120" align="center">
                                <template slot-scope="scope">
                                    <el-button type="primary" icon="el-icon-edit" circle
                                               @click="editNews(scope.$index, scope.row)"></el-button>
                                    <el-button type="danger" icon="el-icon-delete" circle
                                               @click="deleteNews(scope.$index, scope.row)"></el-button>
                                </template>
                            </el-table-column>
                        </el-table>

                        <div class="pagination">
                            <el-pagination background  :page-size=psize @current-change="handlePageChange" layout="prev, pager, next"
                                           :total="newsdatasize">
                            </el-pagination>
                        </div>
                    </el-card>
                </div>
            </div>

            <br/>
            <!--预览-->
            <el-row :gutter="5">

                <el-col :span="16">
                    <div class="handle-box">
                        <div class="drag-box-item">
                            <div class="item-title">App页面预览</div>

                            <div class="block">
                                <!--图片滚动显示-->
                                <el-carousel trigger="click" height="150px">
                                    <el-carousel-item v-for="(item,index) in sourcejson.head" :key="index">
                                        <a :href=item.headurl target="view_window"><img class="img" :src=item.headicon></a>
                                    </el-carousel-item>
                                </el-carousel>

                                <br/>
                                <div>
                                    <el-card class="box-card">
                                        <div slot="header" class="clearfix">
                                            <span>简家新闻</span>
                                            <el-button style="float: right; padding: 3px 0" type="text">更多></el-button>
                                        </div>
                                        <NewsPreviewItem v-for="(news,index) in previewLitehomenews" :key="index"
                                                         class="text item" :news="news"/>
                                    </el-card>
                                </div>
                                <br/>
                                <div>
                                    <el-card class="box-card">
                                        <div slot="header" class="clearfix">
                                            <span>智能家居新闻</span>
                                            <el-button style="float: right; padding: 3px 0" type="text">更多></el-button>
                                        </div>
                                        <NewsPreviewItem v-for="(news,index) in previewSmarthomenews" :key="index"
                                                         class="text item" :news="news"/>
                                    </el-card>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>

                <el-col :span="8">
                    <el-button type="success" plain size="large " @click="effectiveVisible = true">保存所有修改的配置</el-button>
                </el-col>

            </el-row>

        </div>


        <!-- 编辑弹出框 -->
        <el-dialog :title="edittitle" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="标题">
                    <el-input v-model="form.title"
                    ></el-input>
                </el-form-item>
                <el-form-item label="url">
                    <el-input
                            v-model="form.url"
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 5}"
                    ></el-input>
                </el-form-item>
                <el-form-item label="图片链接">
                    <el-input
                            v-model="form.pic"
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 5}"
                    ></el-input>
                </el-form-item>
                <el-form-item label="日期">
                    <el-date-picker
                            v-model="form.timestr"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                    </el-date-picker>
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
                <el-button type="primary" @click="deleteNewsConfirm">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 保存提示框 -->
        <el-dialog title="提示" :visible.sync="effectiveVisible" width="300px" center>
            <div class="del-dialog-cnt">确认保存吗？如果保存会马上生效！请考虑清楚！</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="effectiveVisible = false">取 消</el-button>
                <el-button type="primary" @click="effectiveData">确 定</el-button>
            </span>
        </el-dialog>
    </section>

</template>

<script>
    import NewsPreviewItem from './NewsPreviewItem.vue'

    export default {
        data() {
            return {
                readurl: "http://localhost:8201/litehouse/news/readjson",
                writeurl: "http://localhost:8201/litehouse/news/updatejson",
                psize:3,
                sourcejson: [],
                activeTag: "litehomenews",
                effectiveVisible: false,
                selectlitehomenews: true,
                editVisible: false,
                delVisible: false,
                form: {
                    title: "",
                    url: "",
                    pic: "",
                    timestr: ""
                },
                idx: -1,
                edittitle: "",
                editdialogtype: 1,
                cur_page: 1,
                debug:[]
            }
        },
        created() {
            this.initData()
        },
        computed: {
            //----------------------------------头部新闻处理--------------------------------------

            //----------------------------------中间新闻管理---------------------------------------
            // 显示的当前页面的新闻数组
            shownewsdata() {
                if (this.selectlitehomenews) {
                    return this.sourcejson.litehomenews.filter((value, position) => {
                        if (parseInt(position/this.psize) === (this.cur_page - 1)) {
                            return value;
                        }
                    })
                } else {
                    return this.sourcejson.globalnews.filter((value, position) => {
                        if (parseInt(position / this.psize) === (this.cur_page - 1)) {
                            return value;
                        }
                    })
                }
            },
            // 显示的新闻的数组,用来进行修改或者删除
            selectedDataGroup() {
                if (this.selectlitehomenews) {
                    return this.sourcejson.litehomenews
                } else {
                    return this.sourcejson.globalnews
                }
            },
            //---------------------------------预览处理-------------------------------------------
            // 预览头最新的2个新闻的内容
            previewLitehomenews() {
                let sorelist = this.sourcejson.litehomenews.sort(this.compareDate());
                return [sorelist[0],sorelist[1]]
            },
            // 预览头最新的2个新闻的内容
            previewSmarthomenews() {
                let sorelist = this.sourcejson.globalnews.sort(this.compareDate());
                return [sorelist[0],sorelist[1]]
            },
            // 显示新闻长度
            newsdatasize() {
                return this.selectedDataGroup.length
            },

            //---------------------------------保存效果处理----------------------------------------



        },
        methods: {
            compareDate() {
                return function(a,b){
                    let alist=a.timestr.split("-");
                    let blist=b.timestr.split("-");
                    if (alist[0]>blist[0]){
                        return -1
                    }else if(alist[0]===blist[0]){
                        if (alist[1]>blist[1]){
                            return -1
                        } else if(alist[1]===blist[1]){
                            if (alist[2]>blist[2]){
                                return -1
                            } else if(alist[2]===blist[2]){
                                return -1
                            }else{
                                return 1
                            }
                        }else{
                            return 1
                        }
                    }else{
                        return 1
                    }
                }
            },
            initData() {
                this.getData()
            },
            getData() {
                this.$axios.post(this.readurl).then((response) => {
                    this.sourcejson = response.data;
                });
            },
            //----------------------------------头部新闻处理--------------------------------------

            //----------------------------------中间新闻管理---------------------------------------
            // 添加新闻
            addNews() {
                this.editdialogtype = 1;
                this.edittitle = "添加新闻";
                this.editVisible = true;
                this.form = {
                    head: "",
                    content: "",
                    url: ""
                };
            },
            // 点击新闻标签
            handleTagClick(tab, event) {
                this.activeTag = tab.name;
                switch (tab.name) {
                    case "litehomenews":
                        this.selectlitehomenews = true;
                        break;
                    case "smarthomenews":
                        this.selectlitehomenews = false;
                        break;
                }
                this.cur_page = 1; // 切换的时候回到第1页
            },
            // 新闻页面切换
            handlePageChange(val) {
                this.cur_page = val;
            },
            // 编辑新闻
            editNews(index, itemObject) {
                this.debug=itemObject;
                this.editdialogtype = 2;
                this.edittitle = "编辑新闻";
                this.idx = this.selectedDataGroup.indexOf(itemObject);
                const item = this.shownewsdata[this.idx];
                this.form = {
                    title: item.title,
                    url: item.url,
                    pic: item.pic,
                    timestr: item.timestr
                };
                this.editVisible = true;
            },
            // ---------------------保存修改的或者添加的新闻-----------------------
            saveEdit() {
                switch (this.editdialogtype) {
                    case 1:// add
                        if (this.selectlitehomenews) {
                            this.sourcejson.litehomenews.unshift(this.form);
                        } else {
                            this.sourcejson.globalnews.unshift(this.form);
                        }
                        this.$message.success(`添加新闻成功`);
                        this.editVisible = false;
                        break;
                    case 2: // edit
                        if (this.selectlitehomenews) {
                            this.$set(this.sourcejson.litehomenews, this.idx, this.form);
                        } else {
                            this.$set(this.sourcejson.globalnews, this.idx, this.form);
                        }
                        this.editVisible = false;
                        this.$message.success(`修改第 ${this.idx + 1} 行成功`);
                        break;
                }
            },


            // 删除新闻
            deleteNews(index, itemObject) {
                this.idx = this.selectedDataGroup.indexOf(itemObject);
                console.log("delete index:" + this.idx);
                this.delVisible = true;
            },
            deleteNewsConfirm() {
                if (this.selectlitehomenews) {
                    this.sourcejson.litehomenews.splice(this.idx, 1);
                } else {
                    this.sourcejson.globalnews.splice(this.idx, 1);
                }
                this.$message.success('删除成功');
                this.delVisible = false;
            },

            //---------------------------------预览处理-------------------------------------------


            //---------------------------------保存效果处理----------------------------------------

            // 保存配置信息
            effectiveData() {
                this.$axios.post(this.writeurl,{
                    updatejson:JSON.stringify(this.sourcejson)
                }).then((response) => {
                    this.getData();
                    this.$message.success('保存成功');
                });
                this.effectiveVisible = false;
            },
            // 预览界面
            preview() {
                this.$message({
                    message: '已刷新界面！',
                    type: 'success'
                });
            }
        },
        components: {
            NewsPreviewItem
        }
    }

</script>

<style scoped>
    .el-row {
        width: 100%;
        margin-bottom: 20px;
    }

    .img {
        width: 100%;
        height: auto;
    }

    .drag-box {
        display: flex;
        user-select: none;
    }

    .drag-box-item {
        flex: 1;
        max-width: 330px;
        min-width: 300px;
        background-color: #eff1f5;
        margin-right: 16px;
        border-radius: 6px;
        border: 1px #e1e4e8 solid;
    }

    .item-title {
        padding: 8px 8px 8px 12px;
        font-size: 14px;
        line-height: 1.5;
        color: #24292e;
        font-weight: 600;
    }

    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }

    .el-row {
        margin-bottom: 20px;
    }

    .el-col {
        border-radius: 4px;
    }

    .bg-purple-dark {
        background: #99a9bf;
    }

    .bg-purple {
        background: #d3dce6;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>
