'use strict';

export default (Restangular) => {
  'ngInject';

  return {
    getByQuery: (query) =>
      resource('').get(query)
        .then((result) => {
          result.items = result.items.map(format);
          return result;
        }),

    create: (data) =>
      resource('').post('', data),
    update: (data) =>
      resource('update').post('', data),

    destroy: (id) =>
      resource(id).remove(),

    getSchema
  };

  function resource(type) {
    return Restangular.one('<%=namePlural%>', type);
  }

  function getSchema() {
    return {
      <%=defField%>: ''
    };
  }

  function format(item) {
    return item;
  }
};
