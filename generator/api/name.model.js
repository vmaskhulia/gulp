'use strict';

const mongoose = require('mongoose');
const {Schema} = mongoose;


const <%=nameUC%>Schema = new Schema({
  // Base Props
  <%=defField%>: String
});

module.exports = mongoose.model('<%=nameUC%>', <%=nameUC%>Schema);
