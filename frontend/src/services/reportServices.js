import { BASE_URL } from "../constants/appConstants";
import axios from "../utils/axios";
const generateReport = async (id) => {
  const response = await axios.get(`${BASE_URL}/report/generateReport/${id}`);
  return response;
};

export { generateReport };
