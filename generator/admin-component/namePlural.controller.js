'use strict';

import AdminBaseController from '../AdminBaseController';

class <%=namePlural%>Controller extends AdminBaseController {
  constructor($state, SpinnerRequest, confirmDestroyModal, FilesHandler, <%=nameUC%>, <%=nameLC%>Modal, query, data) {
    'ngInject';
    super({
      $state,
      SpinnerRequest,
      confirmDestroyModal,
      FilesHandler,
      resource: <%=nameUC%>,
      modal: <%=nameLC%>Modal,
      query,
      data,
    });
  }

}

export default <%=namePlural%>Controller;
