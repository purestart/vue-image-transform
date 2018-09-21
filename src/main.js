import Vue from 'vue';
import App from './App';
import router from './router';

import  {SearchBar,ImageTransform}  from '@/components';
// import '../dist/vue-search-bar.min.css';

Vue.use(SearchBar);
Vue.use(ImageTransform);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});