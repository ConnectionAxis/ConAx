const del = require('del');
const mkdirp = require('mkdirp-promise');
const { paths } = require('./config');

const cleanTask = () => (
  del(`${paths.dest}/**`).then(() => mkdirp(paths.destImages))
);

module.exports = cleanTask;
