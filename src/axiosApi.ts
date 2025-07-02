import axios from "axios";

const axiosApi = axios.create({
  baseURL: 'https://js-group-28-admin-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default axiosApi;