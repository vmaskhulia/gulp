'use strict';

export default class {
  constructor($state, Request, <%=nameC%>, <%=nameL%>Modal, <%=nameL%>s) {
    'ngInject';

    this.$state = $state;
    this.Request = Request;
    this.<%=nameC%> = <%=nameC%>;
    this.<%=nameL%>Modal = <%=nameL%>Modal;
    this.<%=nameL%>s = <%=nameL%>s;
    this.perPageCount = {
      DEFAULT: 4,
      ALL: this.<%=nameL%>s.length
    };
    this.itemsPerPage = this.perPageCount.DEFAULT;
    this.currentPage = $state.params.page || 1;
  }

  create<%=nameC%>(event) {
    this.<%=nameL%>Modal.open(event, this.<%=nameC%>.getSchema())
      .then((<%=nameL%>) => {
        this.Request.send(
          this.<%=nameC%>.create(<%=nameL%>)
        );
      });
  }

  update<%=nameC%>(event, <%=nameL%>) {
    this.<%=nameL%>Modal.open(event, <%=nameL%>)
      .then((<%=nameL%>) => {
        this.Request.send(
          this.<%=nameC%>.update(<%=nameL%>)
        );
      });
  }

  destroy<%=nameC%>(<%=nameL%>) {
    this.Request.send(
      this.<%=nameC%>.destroy(<%=nameL%>._id)
    );
  }

  onPageChange(newPageNumber) {
    this.currentPage = newPageNumber;
    this.$state.params.page = newPageNumber;
  }

  setItemsPerPage(count) {
    this.itemsPerPage = count;
  }
}
