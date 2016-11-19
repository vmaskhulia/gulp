'use strict';

import template from './<%=namePlural%>.html!text';
import controller from './<%=namePlural%>.controller';
import './<%=namePlural%>.css!';

export default angular.module('admin.<%=namePlural%>', [])
  .config($stateProvider => {
    $stateProvider
      .state('admin.<%=namePlural%>', {
        url: '<%=namePlural%>?searchText&page&limit&all',
        template,
        controller,
        controllerAs: 'vm',
        resolve: {
          query: ($stateParams, QueryParser) => Object.assign(
            QueryParser.parseSearchPageAndLimit($stateParams)
          ),

          data: (<%=nameUC%>, query) => <%=nameUC%>.getByQuery(query)
        }
      });
  });
