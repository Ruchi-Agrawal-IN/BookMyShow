import axiosInstance from "./axiosInstance";
const MODEL = "shows";

export const GetShowsByTheatreId = async (theatreId) => {
  try {
    const response = await axiosInstance().get(
      `${MODEL}/get-all-shows-by-theatre-id/${theatreId}`
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const GetShowById = async (showId) => {
  try {
    const response = await axiosInstance().get(`/get-show-by-id/${showId}`);
    return response;
  } catch (error) {
    return error;
  }
};

export const AddShow = async (payload) => {
  try {
    const response = await axiosInstance().post(`${MODEL}/add-show`, payload);
    return response;
  } catch (error) {
    return error;
  }
};

export const DeleteShow = async (payload) => {
  try {
    const response = await axiosInstance().post(
      `${MODEL}/delete-show`,
      payload
    );
    return response;
  } catch (error) {
    return error;
  }
};

// export const UpdateTheatre = async (payload)=>{
//     try {
//         const response = await axiosInstance().post("http://localhost:8080/api/theatres/update-theatre", payload)
//         return response
//     } catch (error) {
//         return error
//     }
// }

// export const DeleteTheatre = async (payload)=>{
//     try {
//         const response = await axiosInstance().post("http://localhost:8080/api/theatres/delete-theatre", payload)
//         return response
//     } catch (error) {
//         return error
//     }
// }
