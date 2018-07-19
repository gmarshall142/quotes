import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Contact from '@/components/Contact';
//import EditQuote from '@/components/EditQuote';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact,
    },
    // {
    //   path: '/quotes/add',
    //   name: 'AddQuote',
    //   component: AddQuote,
    // },
  ],
});
