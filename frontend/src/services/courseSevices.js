import { BASE_URL } from "../constants/appConstants";
import axios from "../utils/axios";

const addNewCourse = async (payload) => {
  const response = await axios.post(`${BASE_URL}/course/addNewCourse`, payload);
  return response;
};
const getAllCourses = async () => {
  const response = await axios.get(`${BASE_URL}/course/getAllCourses`);
  return response;
};
const deleteCourseById = async (id) => {
  const response = await axios.delete(
    `${BASE_URL}/course/deleteCourseById/${id}`
  );
  return response;
};
const getCourseById = async (id) => {
  const response = await axios.get(`${BASE_URL}/course/getCourseById/${id}`);
  return response;
};
const editCourseById = async (payload, id) => {
  const response = await axios.put(
    `${BASE_URL}/course/editCourseById/${id}`,
    payload
  );
  return response;
};
const addCLOs = async (payload, id) => {
  const response = await axios.post(
    `${BASE_URL}/course/addCLOs/${id}`,
    payload
  );
  return response;
};
const addPLOs = async (payload, id) => {
  const response = await axios.post(
    `${BASE_URL}/course/addPLOs/${id}`,
    payload
  );
  return response;
};
const getClosAndPlos = async (id) => {
  const response = await axios.get(`${BASE_URL}/course/getClosAndPlos/${id}`);
  return response;
};

const cloToPloMapping = async (payload, id) => {
  const response = await axios.post(
    `${BASE_URL}/course/cloToPloMapping/${id}`,
    payload
  );
  return response;
};

const getMappingByCourse = async (id) => {
  const response = await axios.get(
    `${BASE_URL}/course/getMappingByCourse/${id}`
  );
  return response;
};
const addNewAssessment = async (payload, id) => {
  const response = await axios.post(
    `${BASE_URL}/course/addNewAssessment/${id}`,
    payload
  );
  return response;
};
const getAllAssessments = async (id) => {
  const response = await axios.get(
    `${BASE_URL}/course/getAllAssessments/${id}`
  );
  return response;
};
const getAllAssessmentsForMarks = async (id) => {
  const response = await axios.get(
    `${BASE_URL}/course/getAllAssessmentsForMarks/${id}`
  );
  return response;
};
const getAllAssessmentsForMarksWithClo = async (id) => {
  const response = await axios.get(
    `${BASE_URL}/course/getAllAssessmentsForMarksWithClo/${id}`
  );
  return response;
};

export {
  addNewCourse,
  getAllCourses,
  deleteCourseById,
  getCourseById,
  editCourseById,
  addCLOs,
  addPLOs,
  getClosAndPlos,
  cloToPloMapping,
  getMappingByCourse,
  getAllAssessments,
  addNewAssessment,
  getAllAssessmentsForMarks,
  getAllAssessmentsForMarksWithClo,
};
