'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const <%=nameUC%>Schema = new Schema({
  <%=defField%>: String
});

module.exports = mongoose.model('<%=nameUC%>', <%=nameUC%>Schema);
