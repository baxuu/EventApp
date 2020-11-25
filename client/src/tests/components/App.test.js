import React from 'react';

import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from '../../App';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('connect to react redux', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      shared: { isToasterVisible: false, isLoading: false },
      event: {
        events: [
          {
            _id: 'ajsd873734asdhfdnbd83d32',
            firstName: 'Karol',
            lastName: 'Karolowski',
            email: 'karolowskikarol@gmail.com',
            date: '2019-09-21',
          },
        ],

        event: {
          _id: 'ajsd873734asdhfdnbd83d32',
          firstName: 'Karol',
          lastName: 'Karolowski',
          email: 'karolowskikarol@gmail.com',
          date: '2019-09-21',
        },
        totalPages: 1,
        currentPage: 1,
      },
    });
  });
  it('snapshot test', () => {
    const appWrapper = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(appWrapper).toMatchSnapshot();
  });
});
