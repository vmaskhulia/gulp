'use strict';


module.exports = {
  parseCreateRequest,
  parseUpdateRequest,
  parseDestroyRequest
};


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
    _id: req.params.<%=nameLC%>Id
  };

  next();
}

function parse<%=nameUC%>(body) {
  return {
    myField: body.myField
  };
}
