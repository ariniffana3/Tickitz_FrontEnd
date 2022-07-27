import React, { useState } from "react";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";

function SignUp() {
  document.title = "SignUp";
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    noTelp: "",
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
      const resultLogin = await axios.post("auth/register", form);
      const resultUser = [
        {
          id: 1,
          name: "Bagus",
        },
      ];
      setIsError(false);
      setMessage(resultLogin.data.msg);
      localStorage.setItem("token", resultLogin.data.data.token);
      localStorage.setItem("refreshToken", resultLogin.data.data.refreshToken);
      localStorage.setItem("dataUser", JSON.stringify(resultUser[0]));
      navigate("/home");
    } catch (error) {
      setIsError(true);
      setMessage(error.response.data.msg);
    }
  };
  const handleReset = (event) => {
    event.preventDefault();
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
  const signIn = () => {
    navigate("/signin");
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
                <h1>Sign Up</h1>
                <h2>Fill your additonal details</h2>
                <form onSubmit={handleSubmit}>
                  <div className={`mb-3`}>
                    <label
                      for="exampleInputFirstName1"
                      className={`form-label`}
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      onChange={handleChangeForm}
                      className={`form-control ${styles.form__control}`}
                      id="exampleInputFirstName1"
                      placeholder="Write your first name"
                      required
                    />
                  </div>
                  <div className={`mb-3`}>
                    <label for="exampleInputLastName1" className={`form-label`}>
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      onChange={handleChangeForm}
                      className={`form-control ${styles.form__control}`}
                      id="exampleInputLastName1"
                      placeholder="Write your last name"
                    />
                  </div>
                  <div className={`mb-3`}>
                    <label for="exampleInputPhone1" className={`form-label`}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="noTelp"
                      onChange={handleChangeForm}
                      className={`form-control ${styles.form__control}`}
                      id="exampleInputPhone1"
                      placeholder="Write your phone number"
                    />
                  </div>
                  <div className={`mb-3`}>
                    <label for="exampleInputEmail1" className={`form-label`}>
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
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
                    Sign Up
                  </button>
                  <p>
                    Alredy have an account ?{" "}
                    <a href="" onClick={signIn}>
                      Sign In
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

export default SignUp;
