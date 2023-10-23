import { createApp } from 'vue';
import App from "@/App";
import router from '@/router/router';
import vuex from '@/store';
// 引入Elmessage和Elloading的css样式文件
import "element-plus/es/components/message/style/css";
import "element-plus/es/components/message-box/style/css";
import 'element-plus/theme-chalk/el-loading.css';
import 'element-plus/theme-chalk/el-message.css';
import 'element-plus/theme-chalk/base.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
// collapse
import { ElCollapseTransition } from 'element-plus';
// fade/zoom
const app = createApp(App);
app.use(router);
app.use(vuex);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
import loading from '@/network/loading';

app.config.globalProperties.$loading = loading;
app.component(ElCollapseTransition.name, ElCollapseTransition);
app.use(ElementPlusIconsVue);
app.mount('#app')

