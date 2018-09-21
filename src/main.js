import Vue from 'vue';
import App from './App';
import router from './router';

import  {ImageTransform}  from '@/components';
// import '../dist/vue-search-bar.min.css';


Vue.use(ImageTransform);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});