import { h } from 'preact';
import renderToString from 'preact-render-to-string';

let App = require('./components/app').default;

export default function render() {
  return renderToString(h(App));
}
