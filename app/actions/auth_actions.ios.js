import * as types from './action_types';
import { appError, appReceive } from './app_actions';
import { request } from './network_actions';
import CookieManager from 'react-native-cookies';
import { AsyncStorage } from 'react-native';
import { check, loginEmail } from '../api/auth';
const STORAGE_KEY = '@Fitbird:authCookie';

function send(email, password) {
  return {
    type: types.AUTH_SEND,
    email,
    password
  };
}

export function checkCookie() {
  return (dispatch) => {
    return request(check())(dispatch)
      .then(response => response.json())
      .then(json => {
        dispatch(appReceive(json, types.AUTH_BY_COOKIE_SUCCESS, types.AUTH_BY_COOKIE_FAIL));
      })
      .catch(error => appError(error));
  };
}

export function authByCookie() {
  return (dispatch) => {
    dispatch({ type: types.AUTH_BY_COOKIE });

    AsyncStorage.getItem(STORAGE_KEY, (err, res) => {
      if (res) {
        const cookie = JSON.parse(res);

        CookieManager.set({
          origin: '',
          version: '1',
          expiration: '3015-05-30T12:30:00.00-05:00', // Some ridiculous time in future
          ...cookie
        }, () => {
          dispatch(checkCookie());
        });
      } else {
        dispatch({ type: types.AUTH_BY_COOKIE_FAIL });
      }
    });
  };
}

export function storeCookie() {
  return (dispatch) => {
    dispatch({ type: types.AUTH_STORE_COOKIE, key: STORAGE_KEY });

    CookieManager.getAll((cookie) => {
      if (!cookie || !cookie.SS) {
        dispatch({ type: types.AUTH_STORE_COOKIE_FAIL, key: STORAGE_KEY });
        return;
      }

      try {
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cookie.SS), () => {
          dispatch({ type: types.AUTH_STORE_COOKIE_SUCCESS, key: STORAGE_KEY, cookie: JSON.stringify(cookie.SS) });
        });
      } catch (error) {
        dispatch({ type: types.AUTH_STORE_COOKIE_FAIL, error: error });
      }
    });
  };
}

export function clear() {
  return (dispatch) => {
    AsyncStorage.removeItem(STORAGE_KEY)
      .then(() => {
        CookieManager.clearAll((err, res) => {
          dispatch({
            err: err,
            res: res,
            type: types.AUTH_CLEAR
          });
        });
      });
  };
}

export function logout() {
  return (dispatch) => {
    dispatch({ type: types.AUTH_LOGOUT });
    dispatch(clear());
  }
}

export function login(email, password) {
  return (dispatch) => {
    dispatch(send(email, password));

    return request(loginEmail(email, password))(dispatch)
      .then(response => response.json())
      .then(json => {
        dispatch(storeCookie());
        dispatch(appReceive(
          json,
          types.AUTH_SUCCESS,
          types.AUTH_FAIL
        ));
      })
      .catch(error => appError(error));
  };
}
