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
      console.log(action.data);

      return { ...state };
    }
    case "DATA_USER_FULFILLED": {
      //   console.log(action.payload);
      //   let role = "";
      //   if (action.payload.data.data[0].firstName === "arin") {
      //     role = "admin";
      //   } else {
      //     role = "user";
      //     console.log(role);
      //   }
      return { data: action.payload.data.data[0] };
    }
    case "DATA_USER_REJECT": {
      console.log(action.data);

      return { ...state, isLoading: false, isError: true, data: [] };
    }
    default: {
      return state;
    }
  }
};
export default user;
