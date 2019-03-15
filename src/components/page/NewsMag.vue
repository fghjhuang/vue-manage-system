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
                <div >
                    <el-input v-model="sourcejson.head[0].headurl"></el-input>
                    <br/>
                    <el-input></el-input>
                    <br/>
                    <el-input></el-input>
                </div>

                <!--简家新闻信息配置-->
                <div >

                </div>

                <!--智能家居新闻配置-->
                <div>

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
        name: 'draglist',
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
                        "type": "global",
                        "timestr": "2018-05-30"
                    }, {
                        "title": "小米智能家居产品进军美国 全面采用Google语音助手",
                        "url": "http://news.jstv.com/a/20180515/152636512059.shtml",
                        "pic": "",
                        "type": "global",
                        "timestr": "2018-05-23"
                    }]
                },
                effectiveVisible:false
            }
        },
        components:{

        },
        methods: {
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
    .white{
        background-color: white;
        text-align: center;
    }
    .red{
        background-color: red;
        height: 30px;
        text-align: center;
    }
    .blue{
        background-color: blue;
    }
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
