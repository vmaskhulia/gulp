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


function getSingle(fields) {
  return Object.assign(helpers.cloneStub(<%=nameUC%>Stub), fields);
}

function getMany(count, fields) {
  return _.range(count).map(i => Object.assign(
    getSingle(), {<%=defField%>: `<%=defField%>_${i}`}, fields)
  );
}
