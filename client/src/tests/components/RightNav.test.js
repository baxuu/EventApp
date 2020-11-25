import React from 'react';

import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';

import RightNav from '../../components/Nav/RightNav';

Enzyme.configure({ adapter: new Adapter() });

describe('Navbar', () => {
  it('snapshot test', () => {
    const RightNavWrapper = shallow(<RightNav />);
    expect(RightNavWrapper).toMatchSnapshot();
  });
});
