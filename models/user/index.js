const methods = require('./methods');
const hooks = require('./hooks');
const statics = require('./statics');
const userSchema = require('./schemas');

hooks(userSchema);
methods(userSchema);
statics(userSchema);

module.exports = userSchema;
