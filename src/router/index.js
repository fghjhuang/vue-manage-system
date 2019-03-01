import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/familymanagement',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve),
                    meta: { title: '家庭管理' }
                },
                {
                    path: '/devicemanagement',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: { title: '设备管理' }
                },
                {
                    path: '/feedbackinfo',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: { title: '反馈信息' }
                },
                {
                    // vue-schart组件
                    path: '/vercontrol',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                    meta: { title: '软件版本管理' }
                },
                {
                    // 拖拽列表组件
                    path: '/newsmanagement',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: { title: 'App新闻管理' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/normalmanagement',
                    component: resolve => require(['../components/page/DragDialog.vue'], resolve),
                    meta: { title: '常见问题管理' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '后台用户管理', permission: true }
                },
                {
                    path: '/serverlog',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: { title: '服务日志查看' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
