'use strict';

const router = require('express').Router();
const co = require('co');
const <%=nameUC%> = require('./<%=nameLC%>.dao');
const parser = require('./<%=nameLC%>.parser');
const auth = require('../../auth');


module.exports = router;


router.get('/', parser.parseGetByQuery, getByQuery);

router.post('/', auth.isAdmin, parser.parseCreate, create);
router.post('/update', auth.isAdmin, parser.parseUpdate, update);

router.delete('/:<%=nameLC%>Id', auth.isAdmin, destroy);


// =============== GET ===============

function getByQuery(req, res, next) {
  co(function* () {
    const <%=namePlural%>Data = yield <%=nameUC%>.getByQuery(req.parsed);
    res.json(<%=namePlural%>Data);
  })
  .catch(next);
}

// =============== POST ===============

function create(req, res, next) {
  co(function* () {
    const payload = req.parsed;
    yield <%=nameUC%>.create(payload);
    res.sendStatus(201);
  })
  .catch(next);
}

function update(req, res, next) {
  co(function* () {
    const payload = req.parsed;
    yield <%=nameUC%>.update(payload._id, payload);
    res.sendStatus(200);
  })
  .catch(next);
}

function destroy(req, res, next) {
  co(function* () {
    const {<%=nameLC%>Id} = req.params;
    yield <%=nameUC%>.destroy(<%=nameLC%>Id);
    res.sendStatus(200);
  })
  .catch(next);
}
