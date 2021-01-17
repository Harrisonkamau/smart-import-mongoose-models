const hooks = require('./hooks');
const clubSchema = require('./schemas');

hooks(clubSchema);

module.exports = clubSchema;
