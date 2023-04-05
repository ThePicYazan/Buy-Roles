const mongoose = require('mongoose');

const data = mongoose.Schema({
    invoiceNumber : String,
    server: String,
    id: String,
    endsAt: String,
    roleid: String
});

let Dataa = mongoose.model('Dataa', data);

module.exports = { Dataa }