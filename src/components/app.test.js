import { h, render } from 'preact';
import { shallow } from 'preact-render-spy';
import App from './app';

it('renders without crashing', () => {
  const div = document.createElement('div');
  render(<App />, div);
});

it('can do more interesting stuff with preact-render-spy', () => {
  const context = shallow(<App />);
  expect(context.find('div').contains('App')).toBeTruthy();
});
