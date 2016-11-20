'use strict';

export default (Restangular) => {
  'ngInject';

  const rest = Restangular.withConfig(configurer => {
    configurer.setBaseUrl('api/<%=namePlural%>');
  });

  return {
    getByQuery: (query) => rest.one('').get(query)
      .then(({items, numTotal}) => ({
        items: items.map(format),
        numTotal
      })),

    create: (data) => rest.one('').post('', data),
    update: (data) => rest.one('update').post('', data),

    destroy: (id) => rest.one(id).remove()
  };

  function format(item) {
    return {
      ...item,
    };
  }
};
