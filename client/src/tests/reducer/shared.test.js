import * as Actions from '../../store/actiontypes/sharedActionTypes';
import sharedReducer from '../../store/reducers/SharedReducer';

const message = 'events fetched';
const status = '200';

describe('toaster reducer', () => {
  it('should return the initial state', () => {
    expect(sharedReducer(undefined, {})).toEqual({
      isLoading: false,
      isToasterVisible: false,
      message: [],
      status: '',
    });
  });
  it('should handle LOADER_ON', () => {
    const loaderOnAction = {
      type: Actions.LOADER_ON,
    };
    expect(sharedReducer({}, loaderOnAction)).toEqual({
      isLoading: true,
    });
  });
  it('should handle LOADER_OFF', () => {
    const loaderOffAction = {
      type: Actions.LOADER_OFF,
    };
    expect(sharedReducer({}, loaderOffAction)).toEqual({
      isLoading: false,
    });
  });
  it('should handle TOASTER_ON', () => {
    const toasterOnAction = {
      type: Actions.TOASTER_ON,
      payload: { message, status },
    };
    expect(sharedReducer({}, toasterOnAction)).toEqual({
      isToasterVisible: true,
      message: message,
      status: status,
    });
  });
  it('should handle TOASTER_OFF', () => {
    const toasterOffAction = {
      type: Actions.TOASTER_OFF,
      payload: { message, status },
    };
    expect(sharedReducer({}, toasterOffAction)).toEqual({
      isToasterVisible: false,
      message: message,
      status: status,
    });
  });
});
