import { jwtDecode } from 'jwt-decode';
import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance, { axiosLog } from '../services/apiClient';
import { useSnackbar } from 'notistack';

export const AuthContext = createContext();

export const AuthWrapper = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('access_token') &&
    localStorage.getItem('refresh_token')
      ? jwtDecode(localStorage.getItem('access_token'))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem('access_token') &&
    localStorage.getItem('refresh_token')
      ? jwtDecode(localStorage.getItem('access_token'))
      : null
  );

  const loginUser = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    if (!username || !password) {
      enqueueSnackbar('Please enter username and password!', {
        variant: 'error',
        autoHideDuration: 4000,
      });
      return;
    }

    await axiosLog
      .post(`token/`, {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log('res', res);
        console.log('res.data.access', res.data.access);
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        axiosLog.defaults.headers['Authorization'] =
          'Bearer ' + localStorage.getItem('access_token');
        navigate('/');

        setUser(jwtDecode(res.data.access));
        setAuthTokens(res.data);
      })
      .catch((error) => {
        e.target.username.value = '';
        e.target.password.value = '';
        if (error.response) {
          if (error.response.status === 401) {
            enqueueSnackbar('Incorrect username or password!', {
              variant: 'error',
              autoHideDuration: 4000,
            });
          }
        }
      });
  };

  const logoutUser = async () => {
    try {
      const response = await axiosInstance.post('inventory/logout/blacklist/', {
        refresh_token: localStorage.getItem('refresh_token'),
      });
      console.log('Response', response);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      navigate('/login');
      setUser('');
      setAuthTokens('');
    } catch (error) {
      console.log(error);
    }
  };

  const contextData = {
    user: user,
    authTokens: authTokens,
    setAuthTokens: setAuthTokens,
    setUser: setUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
