'use strict';

var router = require('express').Router();
var co = require('co');
var <%=nameUC%> = require('./<%=nameLC%>.dao');
var parser = require('./<%=nameLC%>.parser');
var auth = require('../../auth');

var isAdmin = auth.isAdmin();


module.exports = router;


router.get('/', parser.parseGetByQuery, getByQuery);

router.post('/', isAdmin, parser.parseCreate, create);
router.post('/update', isAdmin, parser.parseUpdate, update);

router.delete('/:<%=nameLC%>Id', isAdmin, parser.parseDestroy, destroy);


// =============== GET ===============

function getByQuery(req, res, next) {
  co(function* () {
    var q = req.parsed;
    var <%=namePlural%>Data = yield <%=nameUC%>.getByQuery(q.findQuery, q.orQuery, q.sortBy, q.offset, q.limit);
    res.json(<%=namePlural%>Data);
  })
  .catch(next);
}

// =============== POST ===============

function create(req, res, next) {
  co(function* () {
    var parsed<%=nameUC%> = req.parsed;
    yield <%=nameUC%>.create(parsed<%=nameUC%>);
    res.sendStatus(201);
  })
  .catch(next);
}

function update(req, res, next) {
  co(function* () {
    var parsed<%=nameUC%> = req.parsed;
    yield <%=nameUC%>.update(parsed<%=nameUC%>._id, parsed<%=nameUC%>);
    res.sendStatus(200);
  })
  .catch(next);
}

function destroy(req, res, next) {
  co(function* () {
    var <%=nameLC%>Id = req.parsed.<%=nameLC%>Id;
    yield <%=nameUC%>.destroy(<%=nameLC%>Id);
    res.sendStatus(200);
  })
  .catch(next);
}
