'use strict';


module.exports = {
  parseGetByQueryRequest,
  parseCreateRequest,
  parseUpdateRequest,
  parseDestroyRequest
};


function parseGetByQueryRequest(req, res, next) {
  var query = req.query;

  var page = (Number(query.page) > 0) ? Number(query.page) : 1;
  var limit = (Number(query.limit) > 0) ? Number(query.limit) : 0;
  var offset = (page - 1) * limit;

  req.parsed = {
    findQuery: {},
    orQuery: [],
    sortBy: {},
    offset,
    limit
  };

  if (query.searchText) {
    req.parsed.orQuery.push({myField: {$regex: query.searchText, $options: 'gi'}});
  } else {
    req.parsed.orQuery.push({});
  }
  next();
}

function parseCreateRequest(req, res, next) {
  req.parsed = parse<%=nameUC%>(req.body);
  next();
}

function parseUpdateRequest(req, res, next) {
  req.parsed = parse<%=nameUC%>(req.body);
  req.parsed._id = req.body._id;
  next();
}

function parseDestroyRequest(req, res, next) {
  req.parsed = {
    <%=nameLC%>Id: req.params.<%=nameLC%>Id
  };
  next();
}

function parse<%=nameUC%>(body) {
  return {
    myField: body.myField
  };
}
