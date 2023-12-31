import React, { useState } from "react";
import axios from "../../utils/axios";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./index.module.css";
import { useSelector, useDispatch } from "react-redux";
import { dataUser } from "../../stores/actions/user";

function SignIn() {
  document.title = "SignIn";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChangeForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const resultLogin = await axios.post("auth/login", form);

      let role = "";
      if (resultLogin.data.data.id === "2") {
        role = "admin";
      } else {
        role = "user";
      }
      console.log(resultLogin.data.data);
      resultLogin.data.data = { ...resultLogin.data.data, role: role };
      setIsError(false);
      setMessage(resultLogin.data.msg);
      localStorage.setItem("token", resultLogin.data.data.token);
      localStorage.setItem("refreshToken", resultLogin.data.data.refreshToken);
      localStorage.setItem("dataUser", JSON.stringify(resultLogin.data.data));
      dispatch(dataUser(resultLogin.data.data.id));
      navigate("/");
    } catch (error) {
      setIsError(true);
      setMessage(error.response.data.msg);
    }
  };
  const myFunction = () => {
    var control = document.getElementById("exampleInputPassword1");
    let image = document.getElementById("image");
    if (control.type === "password") {
      control.type = "text";
      image.src = "/img/signUp/eye 2.png";
    } else {
      control.type = "password";
      image.src = "/img/signUp/eye 1.png";
    }
  };
  const signUp = () => {
    navigate("/signup");
  };
  return (
    <>
      <body className={styles.body}>
        <main className={styles.main}>
          <div className={styles.main__container}>
            <div className={styles.main__container__img}>
              <img
                src="/img/signUp/Mask Group.png"
                className={styles.main__container__img__background}
                alt="images"
              />
              <div className={styles.main__container__img__overlay}>
                <img
                  src="/img/signUp/tickitz 1.png"
                  alt="tickitz"
                  className={styles.main__container__img__title}
                />
                <p className={styles.main__container__img__desc}>
                  wait, watch, wow!
                </p>
              </div>
            </div>
            <div className={styles.main__container__form}>
              <div className={`container-fluid`}>
                <img
                  src="/img/Home/vector tickitz 2.png"
                  alt="tickitz"
                  className={styles.main__container__form__title__mobile}
                />
                <h1>Sign In</h1>
                <h2>
                  Sign in with your data that you entered during your
                  registration
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className={`mb-3`}>
                    <label for="exampleInputEmail1" className={`form-label`}>
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChangeForm}
                      className={`form-control ${styles.form__control}`}
                      id="exampleInputEmail1"
                      placeholder="Write your email"
                      required
                    />
                  </div>
                  <div className={`mb-3`}>
                    <label for="exampleInputPassword1" className={`form-label`}>
                      Password
                    </label>
                    <div className={styles.form__control__container__password}>
                      <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChangeForm}
                        className={`form-control ${styles.form__control} ${styles.form__control__password}`}
                        id="exampleInputPassword1"
                        placeholder="Write your password"
                        required
                      />
                      <div className={styles.form__img}>
                        <img
                          src="/img/signUp/eye 1.png"
                          alt="show"
                          id="image"
                          onClick={myFunction}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={`btn btn-primary ${styles.form__control__button}`}
                  >
                    Sign In
                  </button>
                  <p>
                    Forgot your password ?{" "}
                    <a href="../signIn/index.jsx">Reset now</a>
                  </p>
                  <p>
                    Don't have an account ?{" "}
                    <a href="" onClick={signUp}>
                      Sign Up
                    </a>
                  </p>
                </form>
                {!message ? null : isError ? (
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                ) : (
                  <div className="alert alert-primary" role="alert">
                    {message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </body>
    </>
  );
}

export default SignIn;
