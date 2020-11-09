let categories = require('./categories.json');
let profiles = require('./profiles.json');

module.exports = () => {
  return {
    categories: categories,
    profiles: profiles,
  };
};
