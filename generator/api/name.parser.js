'use strict';


module.exports = {
  parseCreateRequest,
  parseUpdateRequest,
  parseDestroyRequest
};


function parseCreateRequest(req, res, next) {
  req.parsed = parse<%=nameC%>(req.body);

  next();
}

function parseUpdateRequest(req, res, next) {
  req.parsed = parse<%=nameC%>(req.body);
  req.parsed._id = req.body._id;

  next();
}

function parseDestroyRequest(req, res, next) {
  req.parsed = {
    _id: req.params.<%=name%>Id
  };

  next();
}

function parse<%=nameC%>(body) {
  return {
    myField: body.myField
  };
}
