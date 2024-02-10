import axiosInstance from "./axiosInstance";
const MODEL = "theatres";
export const GetTheatresByUserId = async (payload) => {
  try {
    const response = await axiosInstance().get(
      `${MODEL}/get-all-theatres-by-user-id`,
      payload
    );
    return response;
  } catch (error) {
    return error;
  }
};
export const GetAllTheatres = async () => {
  try {
    const response = await axiosInstance().get(`theatres/get-all-theatres`);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const GetAllTheatresForMovie = async (movieId) => {
  try {
    const response = await axiosInstance().get(
      `${MODEL}/get-theatres-for-movie/${movieId}`
    );
    console.log({ GetAllTheatresForMovie: response.data });
    return response;
  } catch (error) {
    return error;
  }
};

export const AddTheatre = async (payload) => {
  try {
    const response = await axiosInstance().post(
      `${MODEL}/add-theatre`,
      payload
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const UpdateTheatre = async (payload) => {
  try {
    const response = await axiosInstance().post(
      `${MODEL}/update-theatre`,
      payload
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const DeleteTheatre = async (payload) => {
  try {
    const response = await axiosInstance().post(
      `${MODEL}/delete-theatre`,
      payload
    );
    return response;
  } catch (error) {
    return error;
  }
};
