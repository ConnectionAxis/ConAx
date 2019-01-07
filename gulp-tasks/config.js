exports.ENV = process.env.NODE_ENV || 'development';
exports.IS_PROD = exports.ENV === 'production';
exports.IS_DEV = !exports.IS_PROD;

exports.paths = {
  src: './src/',
  pug: `./src/pages/*.pug`,
  pugGlob: `./src/**/*.pug`,
  css: './src/index.css',
  cssStyles: './src/styles/*.css',
  cssGlob: './src/**/*.css',
  images: './src/images/**',
  js: './src/index.js',
  jsGlob: './src/**/*.js',
  dest: './dist',
  destHtml: './dist/*.html',
  destJs: './dist/*.js',
  destImages: './dist/images',
};
