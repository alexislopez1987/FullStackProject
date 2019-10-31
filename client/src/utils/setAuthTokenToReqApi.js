import API from './API';

const setAuthTokenToReqApi = token => {
  if (token) {
    API.defaults.headers.common['auth-token'] = token;
  } else {
    delete API.defaults.headers.common['auth-token'];
  }
};

export default setAuthTokenToReqApi;
