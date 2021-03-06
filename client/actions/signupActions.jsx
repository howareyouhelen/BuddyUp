import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken.jsx';
import jwt from 'jsonwebtoken';
import { set_current_user } from './types.jsx'

export function setCurrentUser(user) {
  return {
    type: set_current_user,
    user: user
  };
}

export function userSignupRequest(userData) {
  return dispatch => {
    return axios.post('/api/users', userData).then(res => {
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
    });
  }
}