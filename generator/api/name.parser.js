'use strict';

const _ = require('lodash');
const utils = require('../../helpers/parserUtils');


module.exports = {
  parseGetByQuery,

  parseCreate,
  parseUpdate
};


// =============== GET ===============

function parseGetByQuery(req, res, next) {
  const query = req.query;
  req.parsed = utils.parseQuery(query);
  if (query.searchText) {
    req.parsed.or = [
      {<%=defField%>: {$regex: query.searchText, $options: 'i'}}
    ];
  }
  next();
}

// =============== POST ===============

function parseCreate(req, res, next) {
  req.parsed = parseBaseProps(req.body);
  next();
}

function parseUpdate(req, res, next) {
  req.parsed = parseBaseProps(req.body);
  req.parsed._id = req.body._id;
  next();
}

function parseBaseProps(body) {
  return _.pick(body, ['<%=defField%>']);
}
