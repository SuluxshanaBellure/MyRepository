// src/plugins/font-awesome.js
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

library.add(faUser, faShoppingCart);

export default (app) => {
  app.component('font-awesome-icon', FontAwesomeIcon);
};
