import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('[REDUCER] Authentication, auth.js', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: '',
      userId: '',
      error: null,
      loading: false,
      redirect: '/'
    });
  });

  it('should store the token upon login', () => {
    expect(reducer(
      {
        token: '',
        userId: '',
        error: null,
        loading: false,
        redirect: '/'
      },
      {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
          token: 'random-token',
          userId: 'random-user-id'
        }
      }
    )).toEqual({
      token: 'random-token',
      userId: 'random-user-id',
      error: null,
      loading: false,
      redirect: '/'
    })
  });
});