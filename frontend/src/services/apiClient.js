import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';

const baseURL = import.meta.env.VITE_REACT_BASE_URL;
let accessToken = localStorage.getItem('access_token')
  ? localStorage.getItem('access_token')
  : null;

export const axiosLog = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use(async (req) => {
  if (!accessToken) {
    let authTokens = localStorage.getItem('access_token')
      ? localStorage.getItem('access_token')
      : null;
    req.headers.Authorization = `Bearer ${authTokens}`;
  } else {
    const user = jwtDecode(accessToken);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    console.log('isExpired', isExpired);

    if (!isExpired) return req;
    let refreshToken = localStorage.getItem('refresh_token');
    const response = await axios.post(`${baseURL}token/refresh/`, {
      refresh: refreshToken,
    });
    console.log(`old token: access: ${accessToken} refresh: ${refreshToken}`);
    console.log('new token:', response.data);

    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    req.headers.Authorization = `Bearer ${response.data.access}`;
  }

  return req;
});

export default axiosInstance;
