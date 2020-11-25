import * as types from '../actiontypes/eventActionTypes';

const initialState = {
  events: [],
  event: {},
  currentPage: 1,
  totalPages: 1,
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_EVENTS:
      return {
        ...state,
        events: action.payload.events,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      };
    case types.FETCH_EVENT:
      return {
        ...state,
        event: action.payload.event,
      };
    case types.DELETE_EVENT:
      return {
        ...state,
        events: state.events.filter((event) => event._id !== action.payload),
      };
    case types.UPDATE_EVENT:
      return {
        ...state,
        event: action.payload,
      };
    default:
      return state;
  }
};
export default eventReducer;
