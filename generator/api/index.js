'use strict';

var router = require('express').Router();
var co = require('co');
var <%=nameUC%> = require('./<%=nameLC%>.dao');
var carParser = require('./<%=nameLC%>.parser');
var auth = require('../../auth');


module.exports = router;


router.get('/', carParser.parseGetByQueryRequest, co.wrap(getByQuery));

router.post('/', auth.isAdmin(), carParser.parseCreateRequest, co.wrap(create));
router.post('/update', auth.isAdmin(), carParser.parseUpdateRequest, co.wrap(update));

router.delete('/:carId', auth.isAdmin(), carParser.parseDestroyRequest, co.wrap(destroy));


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
    var parsedCar = req.parsed;

    yield <%=nameUC%>.create(parsedCar);

    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
}

function* update(req, res, next) {
  try {
    var parsedCar = req.parsed;

    yield <%=nameUC%>.update(parsedCar._id, parsedCar);

    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

function* destroy(req, res, next) {
  try {
    var parsedCar = req.parsed;

    yield <%=nameUC%>.destroy(parsedCar._id);

    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}
