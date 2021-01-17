const { hashPassword } = require('../../lib/auth');

module.exports = (userSchema) => {
  userSchema.pre('save', async function preSave(next) {
    const user = this;
    const { password, name } = user;
    const hashedPassword = await hashPassword(password);
    user.set({
      name: name.toLowerCase(),
      password: hashedPassword,
      passwordConfirmation: hashedPassword,
    });
    await next();
  });
};
