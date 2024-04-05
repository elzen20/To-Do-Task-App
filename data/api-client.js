import axios from "axios";


const api = axios.create({
    baseURL: `${process.env.BASE_URL}`,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.BAP_TOKEN}` 
    },
  });
  api.interceptors.response.use(function (response) {
    
    
    return response.data;
  });
  export {api}
  