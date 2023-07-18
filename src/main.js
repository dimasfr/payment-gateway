import { createApp } from 'vue'
import './assets/style/font.css'
import '@fortawesome/fontawesome-free/css/all.css';
import App from './App.vue'
import router from './router';
import store from './store';

const app = createApp(App);

app.use(router);
app.use(store);

store.dispatch('restoreStateFromLocalStorage');

app.mount('#app')
