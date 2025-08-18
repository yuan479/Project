import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:5173/api';

axios.interceptors.request.use((config) => {
    // token
    return config;
});
// 响应拦截
axios.interceptors.response.use((response) => {
    return response.data
})

export default axios
