import {createApp} from "vue";
import {createRouter, createWebHistory} from "vue-router";
import {createPinia} from "pinia";
import App from "./App.vue";
import Home from "./components/MenuHome.vue";
import DrinkMenu from "./components/DrinkMenu.vue";
import CoffeeAndEspressoMenu from "./components/CoffeeAndEspressoMenu.vue";
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, md } from 'vuetify/iconsets/md'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import VueCookies from "vue3-cookies";
const vuetify = createVuetify({
  components: components,
  directives,
  theme: {
    defaultTheme: 'dark'
  },
  icons: {
    defaultSet: 'md',
    aliases,
    sets: {
      md
    }
  },
});

const routes = [
  { path: "/", name: "Home", component: () => Home },
  { path: "/drink", name: "Drink", component: () => DrinkMenu },
  { path: "/coffeeAndEspresso", name: "CoffeeAndEspresso", component: () => CoffeeAndEspressoMenu },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(vuetify);
app.use(VueCookies, {
  expireTimes: "1d",
  path: "/",
  domain: "",
  secure: false,
  sameSite: "None"
});

app.mount("#app");
