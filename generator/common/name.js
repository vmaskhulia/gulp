'use strict';

import <%= name %>Component from './<%= name %>.component';

export default angular.module('<%= name %>', [])
  .directive('<%= name %>', <%= name %>Component);
