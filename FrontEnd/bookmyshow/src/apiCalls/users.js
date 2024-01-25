//const { axiosInstance } = require("./axiosInstance");
import axiosInstance from "./axiosInstance";

//Register a new User

export const RegisterUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/register", payload);
    return response;
  } catch (error) {
    return error;
  }
};
//loginuser
export const LoginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/login", payload);
    return response;
  } catch (error) {
    return error;
  }
};
