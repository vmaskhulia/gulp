'use strict';

import template from './<%= name %>.html!text';
import controller from './<%= name %>.controller';
import './<%= name %>.css!';

export default angular.module('admin.<%= name %>', [])
  .config($stateProvider => {
    $stateProvider
      .state('<%= name %>', {
        parent: 'admin',
        url: '<%= name %>',
        template,
        controller,
        controllerAs: 'vm'
      });
  });
