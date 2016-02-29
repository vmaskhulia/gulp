'use strict';

import template from './<%=name%>.html!text';
import controller from './<%=name%>.controller';
import './<%=name%>.css!';

export default angular.module('admin.<%=name%>', [])
  .config($stateProvider => {
    $stateProvider
      .state('admin.<%=name%>', {
        url: '<%=name%>?page',
        template,
        controller,
        controllerAs: 'vm',
        resolve: {
          <%=name%>s: (<%=nameC%>) => <%=nameC%>.getAll()
        }
      });
  });
