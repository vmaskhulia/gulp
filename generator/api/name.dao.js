'use strict';

var DBResultHandler = require('../../helpers/DBResultHandler');
var Model = require('./<%=nameLC%>.model');


module.exports = {
  getAll,
  getById,

  create,
  update,

  destroy,
  destroyAll
};


// =============== getters ===============

function getAll() {
  return Model.find();
}

function getById(id) {
  return Model.findOne({_id: id})
    .then(DBResultHandler.assertFound(`<%=nameLC%> (id "${id}") was not found`));
}

// =============== setters ===============

function create(data) {
  return Model.create(data);
}

function update(id, data) {
  return Model.findOneAndUpdate({_id: id}, {$set: data})
    .then(DBResultHandler.assertFound(`could not update <%=nameLC%> (id "${id}")`));
}

function destroy(id) {
  return Model.findOneAndRemove({_id: id})
    .then(DBResultHandler.assertFound(`could not destroy <%=nameLC%> (id "${id}")`));
}

function destroyAll() {
  return Model.remove();
}
