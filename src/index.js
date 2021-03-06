import { h, render } from 'preact';

require('./styles/tachyons.css');

let root = document.getElementById('app');
function init() {
  let App = require('./components/app').default;
  root = render(<App />, document.body, root);
}

if (process.env.NODE_ENV === 'development' && module.hot) {
  require('preact/devtools');

  if (window.location.search.includes('a11y')) {
    require('a11y.css/css/a11y-en.css');
  }

  module.hot.accept('./components/app', () => requestAnimationFrame(init));
}

init();
