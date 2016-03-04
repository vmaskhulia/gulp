'use strict';

import _ from 'lodash';
import template from './<%=nameLC%>.html!text';
import './<%=nameLC%>.css!';

export default class {
  constructor($mdDialog) {
    'ngInject';

    this.$mdDialog = $mdDialog;
  }

  open(targetEvent, <%=nameLC%>, isUpdate) {
    return this.$mdDialog.show({
      controller($mdDialog) {
        this.<%=nameLC%> = _.cloneDeep(<%=nameLC%>);
        this.isUpdate = isUpdate;

        this.submit = (form) => {
          if (form.$valid) {
            $mdDialog.hide(this.<%=nameLC%>);
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
