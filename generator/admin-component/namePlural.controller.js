'use strict';

export default class {
  constructor($state, Request, <%=nameUC%>, <%=nameLC%>Modal, confirmDestroyModal, query, <%=namePlural%>Data) {
    'ngInject';

    this.$state = $state;
    this.Request = Request;
    this.<%=nameUC%> = <%=nameUC%>;
    this.<%=nameLC%>Modal = <%=nameLC%>Modal;
    this.confirmDestroyModal = confirmDestroyModal;

    this.query = query;
    this.<%=namePlural%>Data = <%=namePlural%>Data;
  }

  create<%=nameUC%>(event) {
    this.<%=nameLC%>Modal.open(event, this.<%=nameUC%>.getSchema())
      .then((<%=nameLC%>) => {
        this.Request.send(
          this.<%=nameUC%>.create(<%=nameLC%>)
        );
      });
  }

  update<%=nameUC%>(event, <%=nameLC%>) {
    this.<%=nameLC%>Modal.open(event, <%=nameLC%>, true)
      .then((<%=nameLC%>) => {
        this.Request.send(
          this.<%=nameUC%>.update(<%=nameLC%>)
        );
      });
  }

  destroy<%=nameUC%>(event, <%=nameLC%>) {
    this.confirmDestroyModal.open(event)
      .then(() => {
        this.Request.send(
          this.<%=nameUC%>.destroy(<%=nameLC%>._id)
        );
      });
  }

  searchByText() {
    delete this.query.page;
    delete this.query.limit;
    delete this.query.all;
    this.reloadPage();
  }

  toggleShowAllPages() {
    this.query = {all: !this.query.all};
    this.reloadPage();
  }

  reloadPage() {
    this.$state.go(this.$state.current, this.query, {inherit: false});
  }
}
