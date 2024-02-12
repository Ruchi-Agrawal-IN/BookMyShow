//const { axiosInstance } = require("./axiosInstance");
import axiosInstance from "./AxiosInstance";

//Register a new User
const MODEL = "users";
export const RegisterUser = async (payload) => {
  try {
    const response = await axiosInstance().post(`${MODEL}/register`, payload);
    return response;
  } catch (error) {
    return error;
  }
};
//loginuser
export const LoginUser = async (payload) => {
  try {
    const response = await axiosInstance().post(`${MODEL}/login`, payload);
    console.log("Login API Response is ", response);
    return response;
  } catch (error) {
    return error;
  }
};

//get-current-user
export const GetCurrentUser = async () => {
  try {
    const response = await axiosInstance().get(`${MODEL}/get-current-user`);
    return response.data;
  } catch (error) {
    return error;
  }
};