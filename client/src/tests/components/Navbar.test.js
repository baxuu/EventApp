import React from 'react';

import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import 'jest-styled-components';

import { BrowserRouter as Router } from 'react-router-dom';
import { appMainColor } from '../../helpers/colors';
import Navbar from '../../components/Nav/Navbar';

Enzyme.configure({ adapter: new Adapter() });
const tree = renderer
  .create(
    <Router>
      <Navbar background-color={appMainColor}></Navbar>
    </Router>
  )
  .toJSON();
expect(tree).toHaveStyleRule('background-color', '#4aa3b5');
describe('Navbar', () => {
  it('snapshot test', () => {
    const navWrapper = shallow(<Navbar />);
    expect(navWrapper).toMatchSnapshot();
  });
});
