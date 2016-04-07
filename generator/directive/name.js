'use strict';

import template from './<%=nameLC%>.html!text';
import controller from './<%=nameLC%>.controller';
import './<%=nameLC%>.css!';

export default angular.module('<%=nameLC%>', [])
  .component('<%=nameLC%>', {
    template,
    controller,
    controllerAs: 'vm',
    bindings: {}
  });
