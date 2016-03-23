'use strict';

var _ = require('lodash');
var helpers = require('../helpers/stubHelpers');

var <%=nameUC%>Stub = {
  <%=defField%>: '<%=defField%>'
};


module.exports = {
  getSingle,
  getMany
};


function getSingle() {
  var stub = helpers.cloneStub(<%=nameUC%>Stub);
  return stub;
}

function getMany(count) {
  return _.range(count)
    .map((i) => {
      var stub = getSingle();
      stub.<%=defField%> = `${stub.<%=defField%>}_${i}`;
      return stub;
    });
}
