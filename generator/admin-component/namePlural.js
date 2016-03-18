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
          query: ($stateParams, Constants) =>
            getQuery($stateParams, Constants),

          <%=namePlural%>Data: (query, <%=nameUC%>) =>
            <%=nameUC%>.getByQuery(query)
        }
      });
  });

function getQuery($stateParams, Constants) {
  return {
    searchText: $stateParams.searchText,
    page: Number($stateParams.page) || 1,
    limit: Number($stateParams.limit) || Constants.query.limit,
    all: $stateParams.all === 'true'
  };
}
