import axiosInstance from "./AxiosInstance";
const MODEL = "bookings";
export const MakePayment = async (payload) => {
  try {
    console.log({ makePaymentPayload: payload });
    const response = await axiosInstance().post(
      `${MODEL}/make-payment`,
      payload
    );
    return response;
  } catch (error) {
    return error;
  }
};

// book shows
export const BookShowTickets = async (payload) => {
  try {
    const response = await axiosInstance().post(`${MODEL}/book-show`, payload);
    return response;
  } catch (error) {
    return error;
  }
};

// get bookings of a user
export const GetBookingsOfUser = async () => {
  try {
    const response = await axiosInstance().get(`${MODEL}/get-bookings`);
    return response;
  } catch (error) {
    return error;
  }
};
