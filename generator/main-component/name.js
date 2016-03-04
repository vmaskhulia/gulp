'use strict';

import template from './<%=nameLC%>.html!text';
import controller from './<%=nameLC%>.controller';
import './<%=nameLC%>.css!';

export default angular.module('main.<%=nameLC%>', [])
  .config($stateProvider => {
    $stateProvider
      .state('<%=nameLC%>', {
        parent: 'main',
        url: '<%=nameLC%>',
        template,
        controller,
        controllerAs: 'vm',
        resolve: {}
      });
  });
