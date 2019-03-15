<template>
    <section class="main">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-rank"></i> App新闻管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="drag-box">
                <div class="drag-box-item">
                    <div class="item-title">App页面预览</div>
                    <div class="block">
                        <el-carousel trigger="click" height="150px">
                            <el-carousel-item v-for="(item,index) in sourcejson.head" :key="index">
                                <a :href=item.headurl target="view_window"><img class="img" :src=item.headicon /></a>
                            </el-carousel-item>
                        </el-carousel>
                        <br/>
                        <div>
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>简家新闻</span>
                                    <el-button style="float: right; padding: 3px 0" type="text">更多></el-button>
                                </div>
                                <div v-for="o in 2" :key="o" class="text item">
                                    {{'简家新闻 ' + o }}
                                </div>
                            </el-card>
                        </div>
                        <br/>
                        <div>
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>智能家居新闻</span>
                                    <el-button style="float: right; padding: 3px 0" type="text">更多></el-button>
                                </div>
                                <div v-for="o in 2" :key="o" class="text item">
                                    {{'智能家居新闻 ' + o }}
                                </div>
                            </el-card>
                        </div>
                    </div>
                </div>

                <!--头部信息配置-->
                <div style="min-width: 350px; margin-right: 16px;">
                    <el-card >
                        <div slot="header" >
                            <span>头部图片1</span>
                        </div>
                        <el-row :gutter="10">
                            <el-col :span="6">
                                <p>图片url</p>
                            </el-col>
                            <el-col :span="15">
                                <el-input v-model="sourcejson.head[0].headicon"></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="10">
                            <el-col :span="6">
                                <p>跳转url</p>
                            </el-col>
                            <el-col :span="15">
                                <el-input v-model="sourcejson.head[0].headurl"></el-input>
                            </el-col>
                        </el-row>
                    </el-card>
                    <el-card >
                        <div slot="header">
                            <span>头部图片2</span>
                        </div>
                        <el-row :gutter="10">
                            <el-col :span="6">
                                <p>图片url</p>
                            </el-col>
                            <el-col :span="15">
                                <el-input v-model="sourcejson.head[1].headicon"></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="6">
                                <p>跳转url</p>
                            </el-col>
                            <el-col :span="15">
                                <el-input v-model="sourcejson.head[1].headurl"></el-input>
                            </el-col>
                        </el-row>
                    </el-card>
                    <el-card >
                        <div slot="header">
                            <span>头部图片3</span>
                        </div>
                        <el-row :gutter="20">
                            <el-col :span="6">
                                <p>图片url</p>
                            </el-col>
                            <el-col :span="15">
                                <el-input v-model="sourcejson.head[2].headicon"></el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span="6">
                                <p>跳转url</p>
                            </el-col>
                            <el-col :span="15">
                                <el-input v-model="sourcejson.head[2].headurl"></el-input>
                            </el-col>
                        </el-row>
                    </el-card>
                </div>

                <!--简家新闻信息配置-->
                <div style="min-width: 800px; margin-left: 16px;">
                    <el-card>
                        <el-button type="primary">添加新闻</el-button>
                        <br/>
                        <br/>
                        <el-tabs  type="card" @tab-click="handleTagClick">
                            <el-tab-pane label="简家新闻" name="litehomenews"></el-tab-pane>
                            <el-tab-pane label="智能家居新闻" name="smarthomenews" ></el-tab-pane>
                        </el-tabs>
                        <el-table
                                :data="newsdata"
                                border
                                style="width: 100%">
                            <el-table-column
                                    prop="title"
                                    label="标题"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="url"
                                    label="姓名"
                                    width="180">
                            </el-table-column>
                            <el-table-column
                                    prop="pic"
                                    label="图片地址">
                            </el-table-column>
                            <el-table-column
                                    prop="timestr"
                                    label="日期">
                            </el-table-column>
                            <el-table-column label="操作" width="120" align="center">
                                <template slot-scope="scope">
                                    <el-button type="primary" icon="el-icon-edit" circle></el-button>
                                    <el-button type="danger" icon="el-icon-delete" circle></el-button>
                                </template>
                            </el-table-column>
                        </el-table>

                        <div class="pagination">
                            <el-pagination background @current-change="handlePageChange" layout="prev, pager, next" :total="newsdatasize">
                            </el-pagination>
                        </div>
                    </el-card>

                </div>
            </div>

            <br/>
            <el-button type="primary" plain size="medium " @click="preview">预览</el-button>
            <el-button type="success" plain size="medium " @click="effectiveVisible = true">保存</el-button>
        </div>
        <!-- 删除提示框 -->
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
    export default {
        data() {
            return {
                sourcejson:{
                    "head": [{
                        "headicon": "http://www.smartlitehome.top/litehouse/news/raw/roll1.jpg",
                        "headurl": "http://103.55.30.236/blog/index.php/archives/52/"
                    }, {
                        "headicon": "http://www.smartlitehome.top/litehouse/news/raw/roll2.jpg",
                        "headurl": "http://www.baidu.com"
                    }, {
                        "headicon": "http://www.smartlitehome.top/litehouse/news/raw/roll3.jpg",
                        "headurl": "http://www.w3school.com.cn"
                    }],
                    "litehomenews": [{
                        "title": "简家智能正式成立！欢迎关注简家智能！",
                        "url": "http://www.smartlitehome.top/blog/index.php/archives/52/",
                        "pic": "http://www.smartlitehome.top/litehouse/news/raw/litehouse1.jpg",
                        "timestr": "2018-05-30"
                    }, {
                        "title": "简家智能推出基于EspNow的智能家居系统",
                        "url": "http://www.smartlitehome.top/blog/index.php/archives/53/",
                        "pic": "http://www.smartlitehome.top/litehouse/news/raw/litehouse2.jpg",
                        "timestr": "2018-05-30"
                    }],
                    "globalnews":[{
                        "title": "苹果HomeKit再起风：年增百款新品 一大波厂商涌入",
                        "url": "http://www.techweb.com.cn/viewpoint/2018-05-30/2669947.shtml",
                        "pic": "http://upload.techweb.com.cn/s/640/2018/0530/1527645263927.jpg",
                        "timestr": "2018-05-30"
                    }, {
                        "title": "小米智能家居产品进军美国 全面采用Google语音助手",
                        "url": "http://news.jstv.com/a/20180515/152636512059.shtml",
                        "pic": "",
                        "timestr": "2018-05-23"
                    }]
                },
                effectiveVisible:false,
                selectlitehomenews:false
            }
        },
        computed:{
            newsdatasize(){
                return this.newsdata.length
            },
            newsdata(){
                if (this.selectlitehomenews) {
                    return this.sourcejson.litehomenews
                }else{
                    return this.sourcejson.globalnews
                }
            }
        },
        methods: {
            // 新闻页面切换
            handlePageChange(val){

            },
            // 点击新闻标签
            handleTagClick(tab, event) {
                switch (tab.name) {
                    case "litehomenews":
                        this.selectlitehomenews=true;
                        break;
                    case "smarthomenews":
                        this.selectlitehomenews=false;
                        break;
                }
            },
            // 保存配置信息
            effectiveData(){
                this.effectiveVisible=false;
            },
            // 预览界面
            preview(){
                this.$message({
                    message: '已刷新界面！',
                    type: 'success'
                });
            }
        },
        // 初始化请求图片
        mounted() {

        }
    }

</script>

<style scoped>

    .img{
        width:100%;
        height:auto;
    }
    .drag-box{
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
    .item-title{
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
