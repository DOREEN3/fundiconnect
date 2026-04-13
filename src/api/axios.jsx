import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs'; // npm install dayjs

const baseURL = 'http://127.0.0.1:8000/api/';

const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('authTokens'))?.access}` }
});

axiosInstance.interceptors.request.use(async req => {
    const authTokens = localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null;
    if (!authTokens) return req;

    const user = jwtDecode(authTokens.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) {
        req.headers.Authorization = `Bearer ${authTokens.access}`;
        return req;
    }

    // Token is expired, try to refresh
    const response = await axios.post(`${baseURL}token/refresh/`, {
        refresh: authTokens.refresh
    });

    localStorage.setItem('authTokens', JSON.stringify(response.data));
    req.headers.Authorization = `Bearer ${response.data.access}`;
    return req;
});

export default axiosInstance;