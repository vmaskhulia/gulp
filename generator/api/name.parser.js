'use strict';

const _ = require('lodash');
const utils = require('../../helpers/parserUtils');


module.exports = {
  parseGetByQuery,

  parseCreate,
  parseUpdate,
};


// =============== GET ===============

function parseGetByQuery(req, res, next) {
  const query = req.query;
  req.parsed = Object.assign(
    utils.parseOffsetAndLimit(query),
    {
      find: Object.assign(
        parseId(query),
        {

        }
      )
    },
    parseSearch(query)
  );
  next();
}

function parseId({_id}) {
  return _id ? {_id} : {};
}

function parseSearch({searchText}) {
  return searchText ? {
    or: [
      {<%=defField%>: {$regex: searchText, $options: 'i'}},
    ]
  } : {};
}

// =============== POST ===============

function parseCreate(req, res, next) {
  req.parsed = parseBaseProps(req.body);
  next();
}

function parseUpdate(req, res, next) {
  req.parsed = Object.assign(
    parseBaseProps(req.body),
    {
      _id: req.body._id,
    }
  );
  next();
}

function parseBaseProps(body) {
  return _.pick(body, [
    '<%=defField%>',
  ]);
}
