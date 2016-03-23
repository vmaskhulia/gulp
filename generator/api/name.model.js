'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var <%=nameUC%>Schema = new Schema({
  <%=defField%>: String
});

module.exports = mongoose.model('<%=nameUC%>', <%=nameUC%>Schema);
