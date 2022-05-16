import axios from "axios";

const axiosApiIntances = axios.create({
  baseURL: process.env.REACT_APP_BACK_END,
});

// Add a request interceptor
axiosApiIntances.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    };
    return config;
  },
  function (error) {
    if (error.response.status === 403) {
    }
    if (error.response.status === 403) {
      if (error.response.data.msg !== "jwt expired") {
        // alert(error.response.data.msg);
        localStorage.clear();
        window.location.href = "/signin";
      } else if (error.response.data.msg === "only admin can access") {
        window.location.href = "/unauthorized";
      } else if (error.response.data.msg === "jwt expired") {
        const refreshToken = localStorage.getItem("refreshToken");
        // console.log(refreshToken);
        axiosApiIntances
          .post("auth/refresh", { refreshToken })
          .then((res) => {
            // res = {
            //   data: {
            //     data: {
            //       id: ...
            //       token: ...
            //       refreshToken: ...
            //     }
            //   }
            // }
            // console.log(res);
            // alert("token baru berhasil di dapatkan");
            localStorage.setItem("token", res.data.data.token);
            localStorage.setItem("refreshToken", res.data.data.refreshToken);
            window.location.reload();
          })
          .catch((err) => {
            // alert(error.response.data.msg);
            localStorage.clear();
            window.location.href = "/signin";
          });
      }
    }
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosApiIntances.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
export default axiosApiIntances;
