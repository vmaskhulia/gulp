'use strict';

import template from './<%= name %>.html!text';
import './<%= name %>.css!';

export default class {
  constructor($mdDialog) {
    'ngInject';

    this.$mdDialog = $mdDialog;
  }

  open(targetEvent, <%=name%>) {
    return this.$mdDialog.show({
      controller($mdDialog) {
        this.<%=name%> = <%=name%>

        this.submit = (form) => {
          if (form.$valid) {
            $mdDialog.hide(this.<%=name%>);
          }
        };

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
