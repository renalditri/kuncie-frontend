import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';
import Home from './pages/Home.vue';
import Detail from './pages/Detail.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/detail/:id', name: 'Detail', component: Detail },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')
