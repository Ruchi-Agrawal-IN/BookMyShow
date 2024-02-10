import axiosInstance from "./axiosInstance.js";
const MODEL = "movies";
export const GetAllMovies = async () => {
  try {
    const response = await axiosInstance().get(`${MODEL}/list`);
    return response;
  } catch (error) {
    return error;
  }
};

export const GetMovieById = async (movieId) => {
  try {
    // console.log({ payload })
    const response = await axiosInstance().get(`${MODEL}/get-by-id/${movieId}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const AddMovie = async (payload) => {
  try {
    const response = await axiosInstance().post(`${MODEL}/add-movie`, payload);
    return response;
  } catch (error) {
    return error;
  }
};

export const UpdateMovie = async (payload) => {
  try {
    const response = await axiosInstance().put(
      `${MODEL}/update-movie`,
      payload
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const DeleteMovie = async (payload) => {
  try {
    const response = await axiosInstance().delete(
      `${MODEL}/delete-movie`,
      payload
    );
    return response;
  } catch (error) {
    return error;
  }
};
