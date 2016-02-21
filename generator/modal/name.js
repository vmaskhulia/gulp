'use strict';

import template from './<%=nameL%>.html!text';
import './<%=nameL%>.css!';

export default class {
  constructor($mdDialog) {
    'ngInject';

    this.$mdDialog = $mdDialog;
  }

  open(targetEvent, <%=nameL%>) {
    return this.$mdDialog.show({
      controller($mdDialog) {
        this.<%=nameL%> = <%=nameL%>;

        this.submit = (form) => {
          if (form.$valid) {
            $mdDialog.hide(this.<%=nameL%>);
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
