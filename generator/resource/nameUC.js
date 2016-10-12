'use strict';

export default (Restangular) => {
  'ngInject';

  const rest = Restangular.withConfig((configurer) => {
    configurer.setBaseUrl('api/<%=namePlural%>');
  });

  return {
    getByQuery: (query) => rest.one('').get(query)
      .then((result) => {
        result.items = result.items.map(format);
        return result;
      }),

    create: (data) => rest.one('').post('', data),
    update: (data) => rest.one('update').post('', data),

    destroy: (id) => rest.one(id).remove()
  };

  function format(item) {
    return Object.assign(item, {});
  }
};
