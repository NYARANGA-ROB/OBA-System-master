import axios from "axios";
import { BASE_URL } from "../constants/appConstants";

const connection = axios.create({
  baseURL: BASE_URL,
  validateStatus: () => {
    return true;
  },
});

export default connection;
