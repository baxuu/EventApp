import axios from 'axios';

import { loaderOff, loaderOn, toasterOn } from './SharedActions';
import * as types from '../actiontypes/eventActionTypes';

import { url } from '../../helpers/config';

export const eventsFetchSuccess = (payload) => {
  return {
    type: types.FETCH_EVENTS,
    payload,
  };
};

export const fetchEvents = (page = '1') => async (dispatch) => {
  try {
    dispatch(loaderOn());
    const response = await axios.get(`${url}/events?page=${page}`);
    dispatch(eventsFetchSuccess(response.data));
    dispatch(loaderOff());
  } catch (err) {
    dispatch(loaderOff());
  }
};

export const eventFetchSuccess = (payload) => {
  return {
    type: types.FETCH_EVENT,
    payload,
  };
};

export const fetchEvent = (eventId) => async (dispatch) => {
  try {
    dispatch(loaderOn());
    const response = await axios.get(`${url}/events/${eventId}`);
    dispatch(loaderOff());
    dispatch(eventFetchSuccess(response.data));
  } catch (err) {
    dispatch(loaderOff());
  }
};

export const createEvent = (data, history) => async (dispatch) => {
  try {
    dispatch(loaderOn());
    const response = await axios.post(`${url}/events/`, data);
    dispatch(loaderOff());
    history.push('/events/');
    dispatch(loaderOff());
    dispatch(toasterOn(response.data.message, response.status));
  } catch (err) {
    dispatch(loaderOff());
    if (err.response) {
      dispatch(toasterOn(err.response.data, err.response.status));
      return;
    }
    dispatch(toasterOn({ message: 'Problem with validation', status: 422 }));
  }
};

export const eventUpdateSuccess = (payload) => {
  return {
    type: types.UPDATE_EVENT,
    payload,
  };
};

export const editEvent = (eventId, eventData, history) => async (dispatch) => {
  try {
    dispatch(loaderOn());
    const response = await axios.put(`${url}/events/${eventId}`, eventData);
    dispatch(eventUpdateSuccess(response.data.event));
    history.push('/events/');
    dispatch(toasterOn(response.data.message, response.status));
    dispatch(loaderOff());
  } catch (err) {
    dispatch(loaderOff());
    if (err.response) {
      dispatch(toasterOn(err.response.data, err.response.status));
      return;
    }
    dispatch(toasterOn({ message: 'Problem with validation', status: 422 }));
  }
};

export const eventDeleteSuccess = (payload) => {
  return {
    type: types.DELETE_EVENT,
    payload,
  };
};

export const deleteEvent = (eventId, currentPage, eventsLength) => async (
  dispatch
) => {
  try {
    dispatch(loaderOn());
    const response = await axios.delete(`${url}/events/${eventId}`);
    dispatch(eventDeleteSuccess(eventId));
    dispatch(toasterOn(response.data.message, response.status));
    dispatch(loaderOff());
    if (eventsLength === 1 && currentPage > 1) {
      dispatch(fetchEvents(currentPage - 1));
      return;
    }
    dispatch(fetchEvents(currentPage));
  } catch (err) {
    dispatch(toasterOn(err.message));
    dispatch(loaderOff());
  }
};
