'use strict';

import template from './<%= name %>.html!text';
import './<%= name %>.css!';

export default class {
  constructor($mdDialog) {
    'ngInject';

    this.$mdDialog = $mdDialog;
  }

  open(targetEvent) {
    return this.$mdDialog.show({
      controller($mdDialog) {

        this.close = () => {
          $mdDialog.cancel();
        };
      },
      controllerAs: 'vm',
      template,
      targetEvent,
      clickOutsideToClose: true
    });
  }
}
