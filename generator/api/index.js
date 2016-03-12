'use strict';

var router = require('express').Router();
var co = require('co');
var <%=nameUC%> = require('./<%=nameLC%>.dao');
var parser = require('./<%=nameLC%>.parser');
var auth = require('../../auth');


module.exports = router;


router.get('/', parser.parseGetByQuery, co.wrap(getByQuery));

router.post('/', auth.isAdmin(), parser.parseCreate, co.wrap(create));
router.post('/update', auth.isAdmin(), parser.parseUpdate, co.wrap(update));

router.delete('/:<%=nameLC%>Id', auth.isAdmin(), parser.parseDestroy, co.wrap(destroy));


// =============== GET ===============

function* getByQuery(req, res, next) {
  try {
    var q = req.parsed;
    var <%=namePlural%>Data = yield <%=nameUC%>.getByQuery(q.findQuery, q.orQuery, q.sortBy, q.offset, q.limit);
    res.json(<%=namePlural%>Data);
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
    var <%=nameLC%>Id = req.parsed.<%=nameLC%>Id;
    yield <%=nameUC%>.destroy(<%=nameLC%>Id);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}
