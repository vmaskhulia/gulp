'use strict';

var router = require('express').Router();
var co = require('co');
var <%=nameC%> = require('./<%=name%>.dao');
var <%=name%>Parser = require('./<%=name%>.parser');
var auth = require('../../auth');


module.exports = router;


router.get('/', co.wrap(getAll));

router.post('/', auth.isAuthenticated(), <%=name%>Parser.parseCreateRequest, co.wrap(create));
router.post('/update', auth.isAuthenticated(), <%=name%>Parser.parseUpdateRequest, co.wrap(update));

router.delete('/:<%=name%>Id', auth.isAuthenticated(), <%=name%>Parser.parseDestroyRequest, co.wrap(destroy));


// =============== GET ===============

function* getAll(req, res, next) {
  try {
    var <%=name%>s = yield <%=nameC%>.getAll();

    res.json(<%=name%>s);
  } catch (e) {
    next(e);
  }
}

// =============== POST ===============

function* create(req, res, next) {
  try {
    var parsed<%=nameC%> = req.parsed;

    yield <%=nameC%>.create(parsed<%=nameC%>);

    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
}

function* update(req, res, next) {
  try {
    var parsed<%=nameC%> = req.parsed;

    yield <%=nameC%>.update(parsed<%=nameC%>._id, parsed<%=nameC%>);

    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

function* destroy(req, res, next) {
  try {
    var parsed<%=nameC%> = req.parsed;

    yield <%=nameC%>.destroy(parsed<%=nameC%>._id);

    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}
