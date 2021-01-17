const _ = require('lodash');

// hide fields from non-admins and to hide sensitive fields
module.exports = (userSchema) => {
  userSchema.statics.sanitize = function sanitize(userDoc) { // eslint-disable-line
    const fieldsToPick = [
      '_id',
      'name',
      'email',
      'nationality',
      'isRetired',
      'age',
    ];

    const data = _.pick(userDoc, fieldsToPick);
    return data;
  };

  userSchema.statics.sanitizeAdmin = function sanitizeAdmin(userDoc) { // eslint-disable-line
    const fieldsToPick = [
      '_id',
      'name',
      'email',
      'nationality',
      'isRetired',
      'age',
      'role',
    ];

    const data = _.pick(userDoc, fieldsToPick);
    return data;
  };
};
