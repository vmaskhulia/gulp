'use strict';

const Promise = require('bluebird');
const DBResultHandler = require('../../helpers/DBResultHandler');
const Model = require('./<%=nameLC%>.model');


module.exports = {
  getAll,
  getByQuery,
  getById,

  create,
  insertMany,
  update,

  destroy,
  destroyAll,
};


// =============== Getters ===============

function getAll() {
  return Model.find().lean();
}

function getByQuery({find = {}, or = [{}], sort = {_id: -1}, offset, limit}) {
  return Promise.all([
    Model.find(find).lean().or(or).sort(sort).skip(offset).limit(limit),
    Model.find(find).lean().or(or).count()
  ])
  .spread((items, numTotal) => ({items, numTotal}));
}

function getById(id) {
  return Model.findOne({_id: id}).lean()
    .then(DBResultHandler.assertFound(`<%=nameUC%> (id ${id}) was not found`));
}

// =============== Setters ===============

function create(data) {
  return Model.create(data);
}

function insertMany(data) {
  return Model.insertMany(data);
}

function update(id, data) {
  return Model.findOneAndUpdate({_id: id}, {$set: data})
    .then(DBResultHandler.assertFound(`Could not update <%=nameLC%> (id ${id})`));
}

function destroy(id) {
  return Model.findOneAndRemove({_id: id})
    .then(DBResultHandler.assertFound(`Could not destroy <%=nameLC%> (id ${id})`));
}

function destroyAll() {
  return Model.remove();
}
