import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Loader from '../../components/shared/loader/Loader';

Enzyme.configure({ adapter: new Adapter() });

describe('Loader', () => {
  it('snapshot test', () => {
    const loaderWrapper = shallow(<Loader />);
    expect(loaderWrapper).toMatchSnapshot();
  });
});
