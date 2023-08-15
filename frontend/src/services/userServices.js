import { BASE_URL } from "../constants/appConstants";
import axios from "../utils/axios";
const userLogin = async (payload) => {
  const response = await axios.post(`${BASE_URL}/user/login`, payload);
  return response;
};
const userRegister = async (payload) => {
  const response = await axios.post(`${BASE_URL}/user/register`, payload);
  return response;
};
const getAllFeculty = async () => {
  const response = await axios.get(`${BASE_URL}/user/getAllFeculty`);
  return response;
};
const deleteFaculty = async (id) => {
  const response = await axios.delete(`${BASE_URL}/user/deleteFaculty/${id}`);
  return response;
};

const getUserProfile = async (id) => {
  const response = await axios.get(`${BASE_URL}/user/getUserProfile/${id}`);
  return response;
};
const addStudent = async (payload, id) => {
  const response = await axios.post(
    `${BASE_URL}/user/addStudent/${id}`,
    payload
  );
  return response;
};
const resetPasswordFaculty = async (payload, id) => {
  const response = await axios.post(
    `${BASE_URL}/user/resetPasswordFaculty/${id}`,
    payload
  );
  return response;
};

export {
  userLogin,
  getAllFeculty,
  deleteFaculty,
  userRegister,
  addStudent,
  getUserProfile,
  resetPasswordFaculty,
};
