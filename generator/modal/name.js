'use strict';

import template from './<%=nameL%>.html!text';
import './<%=nameL%>.css!';

export default class {
  constructor($mdDialog) {
    'ngInject';

    this.$mdDialog = $mdDialog;
  }

  open(targetEvent, <%=nameL%>, isUpdate) {
    return this.$mdDialog.show({
      controller($mdDialog) {
        this.<%=nameL%> = <%=nameL%>;
        this.isUpdate = isUpdate;

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
