'use strict';

export default class {
  constructor(Request, <%=nameC%>, <%=name%>Modal, <%=name%>s) {
    'ngInject';

    this.Request = Request;
    this.<%=nameC%> = <%=nameC%>;
    this.<%=name%>Modal = <%=name%>Modal;
    this.<%=name%>s = <%=name%>s;
    this.<%=name%>sPerPage = 4;
  }

  createPost(event) {
    this.<%=name%>Modal.open(event, this.<%=nameC%>.getSchema())
      .then((<%=name%>) => {
        this.Request.send(
          this.<%=nameC%>.create(<%=name%>)
        );
      });
  }

  updatePost(event, <%=name%>) {
    this.<%=name%>Modal.open(event, <%=name%>)
      .then((<%=name%>) => {
        this.Request.send(
          this.<%=nameC%>.update(<%=name%>)
        );
      });
  }

  destroyPost(<%=name%>) {
    this.Request.send(
      this.<%=nameC%>.destroy(<%=name%>._id)
    );
  }
}
