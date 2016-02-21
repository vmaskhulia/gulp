'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var <%=nameC%>Schema = new Schema({
  myField: String
});

module.exports = mongoose.model('<%=nameC%>', <%=nameC%>Schema);
