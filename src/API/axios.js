import axios from 'axios'
const axiosInstance=axios.create({
   baseURL: 'http://localhost:3000',
    // Deployed version of amazon server on render.com
    baseURL:"https://amazon-api-deploy-c6p9.onrender.com"
});
export {axiosInstance}