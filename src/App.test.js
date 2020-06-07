import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure, shallow } from 'enzyme';
import { expect } from 'chai';

import AppContent from './components';

import Paginations from './components/Paginations';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});


it('should change the pageNumber', () => {
  const app = shallow(<AppContent />);
  expect(app.state().pageNumber).equal(1);
  const pagination =app.find(Paginations).get(0);
  pagination.props.setPage(2);
  expect(app.state().pageNumber).equal(2);

});


jest.mock('react-chartjs-2', () => ({
  Bar: () => null, // add any additional chart types here
  Line: () => null
}))