import React, { useState } from "react";
import axios from "../../utils/axios";
import { useNavigate, useLocation } from "react-router-dom";
import  styles from "./index.module.css"

function SignIn() {
  document.title = "SignIn";
  const navigate = useNavigate();
  const { state } = useLocation();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChangeForm = (event) => {
    // console.log("User sedang mengetik");
    // console.log(event.target.name);
    // console.log(event.target.value);
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // console.log("Submit Login");
      // Input = email password di siapkan
      // console.log(form);
      // Proses = memanggil axios
      const resultLogin = await axios.post("auth/login", form);
      // proses get data user by id
      //   const resultUser = await axios.get(`user/${resultLogin.data.data.id}`)
      const resultUser = [
        {
          id: 1,
          name: "Bagus"
        }
      ];
      // Output = suatu keadaan yang dapat diinfokan ke user bahwa proses sudah selesai
      setIsError(false);
      setMessage(resultLogin.data.msg);
      localStorage.setItem("token", resultLogin.data.data.token);
      localStorage.setItem("refreshToken", resultLogin.data.data.refreshToken);
      localStorage.setItem("dataUser", JSON.stringify(resultLogin.data.data));
      navigate("/home");

      //   UNTUK GET DATA USER
      //   const dataUser = JSON.parse(localStorage.getItem(dataUser));
    } catch (error) {
      setIsError(true);
      setMessage(error.response.data.msg);
      setForm({
        email: "",
        password: ""
      });
    }
    };
    const myFunction = ()=> {
    var control = document.getElementById(
    "exampleInputPassword1"
    );
    let image = document.getElementById("image");
    if (control.type === "password") {
    control.type = "text";
    image.src = "/img/signUp/eye 2.png";
    } else {
    control.type = "password";
    image.src = "/img/signUp/eye 1.png";
    }
    }
    const signUp=()=>{
      navigate("/signup");
    }
    return (
        <>
         
        <body className={styles.body} >
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
                <p className={styles.main__container__img__desc}>wait, watch, wow!</p>
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
                <h2>Sign in with your data that you entered during
                your registration</h2>
                <form onSubmit={handleSubmit} >
                
                <div className={`mb-3`}>
                    <label for="exampleInputEmail1" className={`form-label`}
                    >Email address</label
                    >
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
                    <label for="exampleInputPassword1" className={`form-label`}
                    >Password</label
                    >
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

                <button type="submit" className={`btn btn-primary ${styles.form__control__button}`} >
                    Sign In
                </button>
                <p>Forgot your password ? <a href="../signIn/index.jsx">Reset now</a></p>
                <p>Don't have an account ? <a href="" onClick={signUp}>Sign Up</a></p>
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
    )
}


export default SignIn;
