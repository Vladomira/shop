import axios from "axios";

const $host = axios.create({
   baseURL: process.env.REACT_APP_API_URL,
});

const $authHost = axios.create({
   baseURL: process.env.REACT_APP_API_URL,
});
const authInterceptor = (config) => {
   try {
      const token = localStorage.getItem("token");
      if (!token) {
         config.headers.authorization = "";
         return;
      } else {
         config.headers.authorization = `Bearer ${token}`;
         return config;
      }
   } catch (error) {
      console.log(error.message);
   }
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };
