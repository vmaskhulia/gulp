'use strict';

export default (Restangular) => {
  'ngInject';

  const rest = Restangular.withConfig(configurer => {
    configurer.setBaseUrl('api/<%=namePlural%>');
  });

  return {
    getByQuery: (query) => rest.one('').get(query).then(formatMany),

    create: (data) => rest.one('').post('', data),
    update: (data) => rest.one('update').post('', data),

    destroy: (id) => rest.one(id).remove(),
  };

  function formatMany({items, numTotal}) {
    return {
      items: items.map(format),
      numTotal,
    };
  }

  function format(item) {
    return {
      ...item.plain ? item.plain() : item,
    };
  }
};
