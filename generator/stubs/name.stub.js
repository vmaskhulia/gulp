'use strict';

var _ = require('lodash');
var helpers = require('../helpers/stubHelpers');

var <%=nameC%>Stub = {
  myField: 'myField'
};


module.exports = {
  getSingle,
  getMany
};


function getSingle() {
  var stub = helpers.cloneStub(<%=nameC%>Stub);
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
