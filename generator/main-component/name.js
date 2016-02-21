'use strict';

import template from './<%=nameL%>.html!text';
import controller from './<%=nameL%>.controller';
import './<%=nameL%>.css!';

export default angular.module('main.<%=nameL%>', [])
  .config($stateProvider => {
    $stateProvider
      .state('<%=nameL%>', {
        parent: 'main',
        url: '<%=nameL%>',
        template,
        controller,
        controllerAs: 'vm',
        resolve: {
          <%=nameL%>s: <%=nameC%> => <%=nameC%>.getAll()
        }
      });
  });
