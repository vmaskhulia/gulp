'use strict';

import AdminBaseController from '../AdminBaseController';

class <%=namePlural%>Controller extends AdminBaseController {
  constructor($state, Request, <%=nameUC%>, <%=nameLC%>Modal, confirmDestroyModal, query, <%=namePlural%>Data) {
    'ngInject';
    super();

    this.$state = $state;
    this.Request = Request;
    this.Model = <%=nameUC%>;
    this.modal = <%=nameLC%>Modal;
    this.confirmDestroyModal = confirmDestroyModal;

    this.query = query;
    this.<%=namePlural%>Data = <%=namePlural%>Data;
  }

}

export default <%=namePlural%>Controller;
