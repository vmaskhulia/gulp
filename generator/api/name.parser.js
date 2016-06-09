'use strict';

var _ = require('lodash');
var utils = require('../../helpers/parserUtils');


module.exports = {
  parseGetByQuery,

  parseCreate,
  parseUpdate,

  parseDestroy
};


// =============== GET ===============

function parseGetByQuery(req, res, next) {
  var query = req.query;
  req.parsed = utils.parseQuery(query);
  if (query.searchText) {
    req.parsed.orQuery = [
      {myField: {$regex: query.searchText, $options: 'gi'}}
    ];
  }
  next();
}

// =============== POST ===============

function parseCreate(req, res, next) {
  req.parsed = parse<%=nameUC%>(req.body);
  next();
}

function parseUpdate(req, res, next) {
  req.parsed = parse<%=nameUC%>(req.body);
  req.parsed._id = req.body._id;
  next();
}

function parseDestroy(req, res, next) {
  req.parsed = _.pick(req.params, '<%=nameLC%>Id');
  next();
}

function parse<%=nameUC%>(body) {
  return _.pick(body, ['<%=defField%>']);
}
