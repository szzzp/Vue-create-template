// 普通加载路由
// import Home from './Home.vue'
// 懒加载路由
const index = () => import('./index.vue')
export default {
    path: '/',
    name: '/',
    component: index,
    children: [
    ]
}
