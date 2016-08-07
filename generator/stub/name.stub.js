'use strict';

const _ = require('lodash');
const helpers = require('../helpers/stubHelpers');

const <%=nameUC%>Stub = {
  <%=defField%>: '<%=defField%>'
};


module.exports = {
  getSingle,
  getMany
};


function getSingle() {
  const stub = helpers.cloneStub(<%=nameUC%>Stub);
  return stub;
}

function getMany(count) {
  return _.range(count)
    .map((i) => {
      const stub = getSingle();
      stub.<%=defField%> = `${stub.<%=defField%>}_${i}`;
      return stub;
    });
}
