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
  destroyAll
};


// =============== getters ===============

function getAll() {
  return Model.find();
}

function getByQuery(findQuery, orQuery, sortBy, offset, limit) {
  return Promise.all([
    Model.find(findQuery).or(orQuery).sort(sortBy).skip(offset).limit(limit),
    Model.find(findQuery).or(orQuery).count()
  ]).spread((items, numTotal) => {
    return {
      items,
      numTotal
    };
  });
}

function getById(id) {
  return Model.findOne({_id: id})
    .then(DBResultHandler.assertFound(`<%=nameLC%> (id "${id}") was not found`));
}

// =============== setters ===============

function create(data) {
  return Model.create(data);
}

function insertMany(data) {
  return Model.insertMany(data);
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
