import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Landing from './components/Landing';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Landing/>, div);
  ReactDOM.unmountComponentAtNode(div);
});