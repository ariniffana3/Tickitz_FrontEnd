const initialState = {
  isLoading: false,
  isError: false,
  data: [],
  pageInfo: {},
  msg: "",
};

const movie = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DATA_MOVIE_PENDING": {
      //   console.log(action.data);
      return {
        ...state,
        isLoading: true,
      };
    }
    case "GET_DATA_MOVIE_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        pageInfo: action.payload.data.pagination,
        msg: action.payload.data.msg,
      };
    }
    case "GET_DATA_MOVIE_REJECT": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        pageInfo: {},
        msg: action.payload.response.data.msg,
      };
    }
    case "UPDATE_MOVIE_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case "UPDATE_MOVIE_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
      };
    }
    case "UPDATE_MOVIE_REJECT": {
      return {
        ...state,
        isLoading: true,
        isError: false,
        data: [],
        pageInfo: {},
        msg: action.payload.response.data.msg,
      };
    }
    case "POST_MOVIE_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case "POST_MOVIE_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
      };
    }
    case "POST_MOVIE_REJECT": {
      return {
        ...state,
        isLoading: true,
        isError: false,
        data: [],
        pageInfo: {},
        msg: action.payload.response.data.msg,
      };
    }
    case "DELETE_MOVIE_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case "DELETE_MOVIE_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
      };
    }
    case "DELETE_MOVIE_REJECT": {
      return {
        ...state,
        isLoading: true,
        isError: false,
        data: [],
        pageInfo: {},
        msg: action.payload.response.data.msg,
      };
    }
    default: {
      return state;
    }
  }
};

export default movie;
