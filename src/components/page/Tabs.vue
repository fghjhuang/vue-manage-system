<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i>简家app反馈信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="message">
                <el-tab-pane :label="`未读消息(${unread.length})`" name="first">
                    <div class="handle-row">
                        <el-form>
                        <el-form-item label="">
                            <el-select v-model="listorder" placeholder="请选择" >
                                <el-option style="height:50px;" v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        </el-form>
                    </div>
                    <el-table :data="unread" :show-header="false" style="width: 100%">
                        <el-table-column>
                            <template slot-scope="scope">
                                <span class="message-title">{{scope.row.title}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="username" width="180"></el-table-column>
                        <el-table-column prop="date" width="180"></el-table-column>
                        <el-table-column width="120">
                            <template slot-scope="scope">
                                <el-button size="small" @click="handleRead(scope.$index)">标为已读</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="handle-row">
                        <el-button type="primary">全部标为已读</el-button>
                    </div>
                </el-tab-pane>

                <el-tab-pane :label="`已读消息(${read.length})`" name="second">
                    <div class="handle-row">
                        <el-form>
                            <el-form-item label="">
                                <el-select v-model="listorder" placeholder="请选择" >
                                    <el-option style="height:50px;" v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                    <template v-if="message === 'second'">
                        <el-table :data="read" :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template slot-scope="scope">
                                    <span class="message-title">{{scope.row.title}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="username" width="180"></el-table-column>
                            <el-table-column prop="date" width="150"></el-table-column>
                            <el-table-column width="120">
                                <template slot-scope="scope">
                                    <el-button type="danger" @click="handleDel(scope.$index)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button type="danger">删除全部</el-button>
                        </div>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'tabs',
        data() {
            return {
                message: 'first',
                showHeader: false,
                options: [{
                    value: '0',
                    label: '按用户名排序'
                }, {
                    value: '1',
                    label: '按提交时间排序'
                }],
                listorder: '',
                unread: [{
                    date: '2018-04-19 20:00:00',
                    username:'13728381263',
                    title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护',
                },{
                    date: '2018-04-19 21:00:00',
                    username:'13728381263',
                    title: '今晚12点整发大红包，先到先得',
                }],
                read: [{
                    date: '2018-04-19 20:00:00',
                    username:'13728355863',
                    title: '【系统通知】该系统将于今晚凌晨2点到5点进行升级维护'
                }]
            }
        },
        created(){
            // this.listorder = this.couponList[0].name;
        },
        methods: {
            handleRead(index) {
                const item = this.unread.splice(index, 1);
                console.log(item);
                this.read = item.concat(this.read);
            },
            handleDel(index) {
                const item = this.read.splice(index, 1);

            }
        },
        computed: {
            unreadNum(){
                return this.unread.length;
            }
        }
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

