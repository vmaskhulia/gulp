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

    this.showAll = query.limit === <%=namePlural%>Data.numTotal;
  }

  createCar(event) {
    this.<%=nameLC%>Modal.open(event, this.<%=nameUC%>.getSchema())
      .then((<%=nameLC%>) => {
        this.Request.send(
          this.<%=nameUC%>.create(<%=nameLC%>)
        );
      });
  }

  updateCar(event, <%=nameLC%>) {
    this.<%=nameLC%>Modal.open(event, <%=nameLC%>, true)
      .then((<%=nameLC%>) => {
        this.Request.send(
          this.<%=nameUC%>.update(<%=nameLC%>)
        );
      });
  }

  destroyCar(event, <%=nameLC%>) {
    this.confirmDestroyModal.open(event)
      .then(() =>
        this.Request.send(
          this.<%=nameUC%>.destroy(<%=nameLC%>._id)
        )
      );
  }

  searchByText() {
    delete this.query.page;
    delete this.query.limit;
    this.reloadPage();
  }

  toggleShowAllPages() {
    delete this.query.searchText;
    delete this.query.page;
    delete this.query.limit;
    if (!this.showAll) {
      this.query.limit = this.<%=namePlural%>Data.numTotal;
    }
    this.reloadPage();
  }

  reloadPage() {
    this.$state.go(this.$state.current, this.query, {inherit: false});
  }
}
