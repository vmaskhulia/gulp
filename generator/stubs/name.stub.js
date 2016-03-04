'use strict';

var _ = require('lodash');
var helpers = require('../helpers/stubHelpers');

var <%=nameUC%>Stub = {
  myField: 'myField'
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
      stub.myField = `${stub.myField}-${i}`;
      return stub;
    });
}
