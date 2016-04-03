'use strict';

var _ = require('lodash');


module.exports = {
  parseGetByQuery,

  parseCreate,
  parseUpdate,

  parseDestroy
};


// =============== GET ===============

function parseGetByQuery(req, res, next) {
  var query = req.query;

  var page = (Number(query.page) > 0) ? Number(query.page) : 1;
  var limit = (Number(query.limit) > 0) ? Number(query.limit) : 0;
  var offset = (page - 1) * limit;

  req.parsed = {
    findQuery: {},
    orQuery: [],
    sortBy: { '_id': -1 },
    offset,
    limit
  };

  if (query.all === 'true') {
    req.parsed.offset = 0;
    req.parsed.limit = 'all';
    req.parsed.orQuery.push({});
    return next();
  }

  if (query.searchText) {
    req.parsed.orQuery.push({<%=defField%>: {$regex: query.searchText, $options: 'gi'}});
  } else {
    req.parsed.orQuery.push({});
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
