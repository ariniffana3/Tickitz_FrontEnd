const initialState = {
  isLoading: false,
  isError: false,
  data: [],
  pageInfo: {},
  msg: "",
};
const user = (state = initialState, action) => {
  switch (action.type) {
    case "DATA_USER_PENDING": {
      return { ...state };
    }
    case "DATA_USER_FULFILLED": {
      return { data: action.payload.data.data[0] };
    }
    case "DATA_USER_REJECT": {
      return { ...state, isLoading: false, isError: true, data: [] };
    }
    default: {
      return state;
    }
  }
};
export default user;
