import { createApp } from 'vue';
import Dashboard from './components/Dashboard.vue';

// Mount function to start app
const mount = (el) => {
    const app = createApp(Dashboard);
    app.mount(el);
}

// If we are in dev and in isolattion call mount immediately
if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_dashboard-dev-root');
    if (devRoot) {
        mount(devRoot);
    }
}

// we are running through container and export mount function
export { mount };