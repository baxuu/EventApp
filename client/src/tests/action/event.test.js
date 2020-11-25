import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import axios from 'axios';

import {
  createEvent,
  fetchEvents,
  deleteEvent,
  editEvent,
  fetchEvent,
} from '../../store/actions/EventActions';

import * as ActionsShared from '../../store/actiontypes/sharedActionTypes';
import * as ActionsEvent from '../../store/actiontypes/eventActionTypes';
import { eventData, newEvent } from '../mocks/mocks';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('event actions', () => {
  beforeEach(() => {
    moxios.install(axios);
  });

  afterEach(() => {
    moxios.uninstall(axios);
  });

  it('creates FETCH_EVENTS when fetching events has been done', async () => {
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: eventData,
      });
    });

    const expectedActions = [
      { type: ActionsShared.LOADER_ON },
      { type: ActionsEvent.FETCH_EVENTS, payload: eventData },
      { type: ActionsShared.LOADER_OFF },
    ];
    const store = mockStore();
    await store.dispatch(fetchEvents());
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('creates LOADER_ON, LOADER_OFF,FETCH_EVENT when fetching event has been done', async () => {
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: newEvent,
      });
    });

    const expectedActions = [
      { type: ActionsShared.LOADER_ON },
      { type: ActionsShared.LOADER_OFF },
      { type: ActionsEvent.FETCH_EVENT, payload: newEvent },
    ];
    const store = mockStore();
    await store.dispatch(fetchEvent());
    expect(store.getActions()).toEqual(expectedActions);
  });
  it('creates LOADER_ON, LOADER_OFF, TOASTER_ON when event has been added', async () => {
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
      });
    });
    const store = mockStore();
    const spy = jest.spyOn(axios, 'post');
    await store.dispatch(createEvent(newEvent));
    expect(spy).toHaveBeenCalledWith('http://localhost:8080/events/', newEvent);
    spy.mockRestore();
  });
  it('creates LOADER_ON, UPDATE_EVENT, TOASTER_ON, LOADER_OFF when event has been updated', async () => {
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
      });
    });
    const store = mockStore();
    const spy = jest.spyOn(axios, 'put');
    await store.dispatch(editEvent('3453k5h23423432fdjkh334', newEvent));
    expect(spy).toHaveBeenCalledWith(
      `http://localhost:8080/events/${newEvent._id}`,
      newEvent
    );
    spy.mockRestore();
  });
  it('creates LOADER_ON, DELETE_EVENT, TOASTER_ON, LOADER_OFF when event has been deleted', async () => {
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          message: 'Event deleted!',
        },
      });
    });
    const expectedActions = [
      { type: ActionsShared.LOADER_ON },
      { type: ActionsEvent.DELETE_EVENT, payload: 'ajsd873734asdhfdnbd83d32' },
      {
        type: ActionsShared.TOASTER_ON,
        payload: { message: 'Event deleted!', status: 200 },
      },
      { type: ActionsShared.LOADER_OFF },
      { type: ActionsShared.LOADER_ON },
    ];
    const store = mockStore();
    await store.dispatch(deleteEvent('ajsd873734asdhfdnbd83d32'));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
