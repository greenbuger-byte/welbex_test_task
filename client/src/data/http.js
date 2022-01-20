import axios from 'axios';
const getApiHttpBaseUrl = process.env.REACT_APP_URL || 'http://localhost:5000/';

const http = axios.create({
    baseURL: getApiHttpBaseUrl,
    timeout: 1000,
    headers: {
        "Content-type": "application/json"
    }
});

export default http;