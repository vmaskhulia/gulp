'use strict';


module.exports = {
  parseCreateRequest,
  parseUpdateRequest,
  parseDestroyRequest
};


function parseCreateRequest(req, res, next) {
  req.parsed = {
  };

  next();
}

function parseUpdateRequest(req, res, next) {
  req.parsed = {
    _id: req.body._id
  };

  next();
}

function parseDestroyRequest(req, res, next) {
  req.parsed = {
    _id: req.params.<%=name%>Id
  };

  next();
}
