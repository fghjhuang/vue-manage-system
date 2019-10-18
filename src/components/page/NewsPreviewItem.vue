<template>
    <el-row :gutter="10" @click.native="gowebsite"
            @mouseenter.native="handleEnter(true)"
            @mouseleave.native="handleEnter(false)"
            :style="{backgroundColor:bgColor}">

        <el-col  :xs="titlespace" :sm="titlespace" :md="titlespace" :lg="titlespace" :xl="titlespace">
            <p class="titlecss">{{news.title}}</p>
        </el-col>

        <el-col  :xs="picspace" :sm="picspace" :md="picspace" :lg="picspace" :xl="picspace">
            <img class="img" :src="news.pic" v-if="showpic"/>
        </el-col>

    </el-row>
</template>

<script>
    export default {
        name: "NewsPreviewItem",
        data(){
            return{
                titlespace:15,
                picspace:9,
                bgColor:'white'
            }
        },
        props:{
            news:Object
        },
        methods:{
            // 鼠标移动进去显示的效果
            handleEnter (isEnter) {
                console.log("mouse:"+isEnter);
                if(isEnter) { // 进入
                    this.bgColor = 'lightgrey'
                } else { // 离开
                    this.bgColor = 'white'
                }
            },
            // 打开新窗口
            gowebsite(){
                window.open(this.news.url,"_blank");
          }
        },
        computed:{
            showpic(){
                if ((this.news.pic==="")) {
                    this.titlespace=24;
                    this.picspace=0;
                    return false
                }else{
                    this.titlespace=15;
                    this.picspace=9;
                    return true
                }
            }
        }
    }
</script>

<style>
    .img{
        width:100%;
        height:auto;
    }
    .titlecss{
        font-size: 14px;
        height: 100%;
    }
</style>