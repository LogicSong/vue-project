import { createApp } from 'vue';
import { setupStore } from '@/store';
import App from './App.vue';
import { setupRouter } from './router';
import { setupAntd, setupDirectives } from '@/plugins';
import 'uno.css';

const app = createApp(App);

setupStore(app);
await setupRouter(app);
setupAntd(app);
setupDirectives(app);

app.mount('#app');
