'use strict';

import _ from 'lodash';
import template from './<%=nameLC%>.html!text';
import './<%=nameLC%>.css!';

export default class {
  constructor($mdDialog) {
    'ngInject';

    this.$mdDialog = $mdDialog;
  }

  open(targetEvent, <%=nameLC%>) {
    return this.$mdDialog.show({
      controller($mdDialog) {
        'ngInject';

        this.<%=nameLC%> = _.cloneDeep(<%=nameLC%>);

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
