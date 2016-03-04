'use strict';

var router = require('express').Router();
var co = require('co');
var <%=nameUC%> = require('./<%=nameLC%>.dao');
var <%=nameLC%>Parser = require('./<%=nameLC%>.parser');
var auth = require('../../auth');


module.exports = router;


router.get('/', co.wrap(getAll));

router.post('/', auth.isAdmin(), <%=nameLC%>Parser.parseCreateRequest, co.wrap(create));
router.post('/update', auth.isAdmin(), <%=nameLC%>Parser.parseUpdateRequest, co.wrap(update));

router.delete('/:<%=nameLC%>Id', auth.isAdmin(), <%=nameLC%>Parser.parseDestroyRequest, co.wrap(destroy));


// =============== GET ===============

function* getAll(req, res, next) {
  try {
    var <%=nameLC%>s = yield <%=nameUC%>.getAll();

    res.json(<%=nameLC%>s);
  } catch (e) {
    next(e);
  }
}

// =============== POST ===============

function* create(req, res, next) {
  try {
    var parsed<%=nameUC%> = req.parsed;

    yield <%=nameUC%>.create(parsed<%=nameUC%>);

    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
}

function* update(req, res, next) {
  try {
    var parsed<%=nameUC%> = req.parsed;

    yield <%=nameUC%>.update(parsed<%=nameUC%>._id, parsed<%=nameUC%>);

    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

function* destroy(req, res, next) {
  try {
    var parsed<%=nameUC%> = req.parsed;

    yield <%=nameUC%>.destroy(parsed<%=nameUC%>._id);

    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}
