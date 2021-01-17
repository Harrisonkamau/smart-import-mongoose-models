const slugify = require('slugify');

module.exports = (clubSchema) => {
  clubSchema.pre('save', async function preSave(next) {
    const club = this;
    const { name } = club;
    const newName = name.trim();
    const slug = slugify(newName, {
      lower: true,
      replacement: '-',
      remove: undefined,
      strict: false,
    });

    club.set('name', slug);
    await next();
  });
};
