import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap-icons/font/bootstrap-icons.css'
import "bootstrap"

const app = createApp(App);

app.provide("$filterController", "http://localhost:8080/filter");
app.provide("$notificationState", []);
app.mount('#app');