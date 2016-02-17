'use strict';

export default (Restangular) => {
  'ngInject';

  return {
    getAll: () =>
      resource('').get(),

    create: (data) =>
      resource('').post('', data),
    update: (data) =>
      resource('update').post('', data),

    destroy: (id) =>
      resource(id).remove(),

    getSchema
  };

  function resource(type) {
    return Restangular.one('<%=nameL%>', type);
  }

  function getSchema() {
    return {

    };
  }
};
