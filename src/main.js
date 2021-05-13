import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'vant/lib/index.css'
//导入vant轮播图
import { Swipe, SwipeItem,Form,Field,Button,Notify,Toast,Sidebar, SidebarItem,Collapse, CollapseItem} from 'vant'
import { Image as VanImage } from 'vant'
createApp(App)
    .use(Swipe).use(SwipeItem).use(VanImage).use(Form).use(Field).use(Button).use(Notify).use(Toast).use(Sidebar).use(SidebarItem).use(Collapse).use(CollapseItem)
    .use(store).use(router).mount('#app')
