import axios from "../../utils/axios";

export const dataUser = (id) => {
  return {
    type: "DATA_USER",
    payload: axios.get(`user/${id}`),
  };
};
