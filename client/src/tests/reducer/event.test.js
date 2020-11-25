import * as Actions from '../../store/actiontypes/eventActionTypes';
import { eventData, events, newEvent } from '../mocks/mocks';
import EventReducer from '../../store/reducers/EventReducer';

export const eventoid = '5cdf57c7343fsdsdsdasd';

describe('event reducer', () => {
  it('should return the initial state', () => {
    expect(EventReducer(undefined, {})).toEqual({
      events: [],
      event: {},
      currentPage: 1,
      totalPages: 1,
    });
  });
  it('should handle FETCH_EVENTS', () => {
    const fetchEventsAction = {
      type: Actions.FETCH_EVENTS,
      payload: eventData,
    };
    expect(EventReducer({}, fetchEventsAction)).toEqual({
      events: eventData.events,
      currentPage: eventData.currentPage,
      totalPages: eventData.totalPages,
    });
  });
  it('should handle FETCH_EVENT', () => {
    const fetchEventAction = {
      type: Actions.FETCH_EVENT,
      payload: eventData,
    };
    expect(EventReducer({}, fetchEventAction)).toEqual({
      event: eventData.event,
    });
  });
  it('should handle DELETE_EVENT', () => {
    const deleteEventAction = {
      type: Actions.DELETE_EVENT,
      payload: '5cdf57c7343fd03fd654760asd',
    };
    expect(
      EventReducer(
        {
          events: events,
          event: {},
          currentPage: 1,
          totalPages: 1,
        },
        deleteEventAction
      )
    ).toEqual({
      event: {},
      currentPage: 1,
      totalPages: 1,
      events: events.filter(
        (event) => event._id !== '5cdf57c7343fd03fd654760asd'
      ),
    });
  });
  it('should handle UPDATE_EVENT', () => {
    const updateEventAction = {
      type: Actions.UPDATE_EVENT,
      payload: newEvent,
    };
    expect(
      EventReducer(
        {
          events: events,
          event: {},
          currentPage: 1,
          totalPages: 1,
        },
        updateEventAction
      )
    ).toEqual({
      events: events,
      currentPage: 1,
      totalPages: 1,
      event: newEvent,
    });
  });
});
