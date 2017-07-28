import { h, render } from 'preact';

require('./styles/tachyons.css');

let root = document.getElementById('app');
function init() {
  let App = require('./components/app').default;
  root = render(<App />, document.body, root);
}

if (process.env.NODE_ENV === 'development' && module.hot) {
  require('preact/devtools');
  module.hot.accept('./components/app', () => requestAnimationFrame(init));
}

init();
