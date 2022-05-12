import axios from "../../utils/axios";

export const getDataMovie = (token, page, limit, sort, dataRelease, search) => {
  return {
    type: "GET_DATA_MOVIE",
    token: (axios.defaults.headers.common["Authorization"] = `Bearer ${token}`),
    payload: axios.get(
      `movie?page=${page}&limit=${limit}&sort=${sort}&searchRelease=${dataRelease}&searchName=${search}`
    ),
  };
};
