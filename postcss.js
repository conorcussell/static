const postCssConfig = loader => [
  require('postcss-import')({ root: loader.resourcePath }),
  require('postcss-css-variables')(),
  require('postcss-conditionals')(),
  require('postcss-custom-media')(),
  require('css-mqpacker')(),
  require('autoprefixer')(),
  require('cssnano')()
];

export default postCssConfig;
