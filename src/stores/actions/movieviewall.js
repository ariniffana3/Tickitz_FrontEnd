import axios from "../../utils/axios";

export const getDataMovie = (page, limit, sort, dataRelease, search) => {
  return {
    type: "GET_DATA_MOVIE",
    payload: axios.get(
      `movie?page=${page}&limit=${limit}&sort=${sort}&searchRelease=${dataRelease}&searchName=${search}`
    ),
  };
};
export const postMovie = (form) => {
  return {
    type: "POST_MOVIE",
    payload: axios.post(`movie`, form),
  };
};
export const updateMovie = (idMovie, form) => {
  return {
    type: "UPDATE_MOVIE",
    payload: axios.patch(`movie/${idMovie}`, form),
  };
};
export const deleteMovie = (id) => {
  return {
    type: "DELETE_MOVIE",
    payload: axios.delete(`movie/${id}`),
  };
};
