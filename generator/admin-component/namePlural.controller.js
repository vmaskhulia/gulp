'use strict';

import AdminBaseController from '../AdminBaseController';

class <%=namePlural%>Controller extends AdminBaseController {
  constructor($state, Request, <%=nameUC%>, <%=nameLC%>Modal, confirmDestroyModal, query, data) {
    'ngInject';
    super();

    this.$state = $state;
    this.Request = Request;
    this.Model = <%=nameUC%>;
    this.modal = <%=nameLC%>Modal;
    this.confirmDestroyModal = confirmDestroyModal;

    Object.assign(this, {query}, data);
  }

}

export default <%=namePlural%>Controller;
