import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../utils/axios";
import { useSelector, useDispatch } from "react-redux";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import moment from "moment";

function Payment() {
  document.title = "Payment";
  const { state } = useLocation();
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState([]);
  let [dataUserStorage, setDataUserStorage] = useState([]);
  // console.log(state.userId);
  const user = useSelector((state) => state.user);
  const navigation = useNavigate();

  useEffect(() => {
    getdataUser();
  }, []);

  const getdata = async () => {
    try {
      console.log("error");
    } catch (error) {
      console.log(error.response);
    }
  };

  dataUserStorage = JSON.parse(localStorage.getItem("dataUser"));
  console.log(typeof dataUserStorage);
  console.log(dataUserStorage.id);

  const getdataUser = async () => {
    try {
      setDataUser(user.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleOrder = async () => {
    try {
      // const idUser = await AsyncStorage.getItem("idUser");
      const data = {
        userId: dataUserStorage.id,
        scheduleId: state.idOrder,
        dateBooking: moment(state.dateBooking).format("MMM-DD-YY"),
        timeBooking: state.time,
        paymentMethod: "default",
        totalPayment: state.totalPayment,
        seat: state.seat,
      };
      console.log(data);
      const result = await axios.post("booking", data);
      window.location.href = `${result.data.data.redirectUrl}`;
      console.log(result);
    } catch (error) {
      console.log(error);
      alert("Failed to process");
    }
  };

  return (
    <>
      <Header />
      <main className={styles.payment__main}>
        <div className={styles.main__container1}>
          <div className={styles.main__info}>
            <h3 className={styles.main__info__h3}>Payment Info</h3>
            <div className={styles.main__info__container}>
              <div
                className={`${styles.main__info__1} ${styles.main__info__11}`}
              >
                <h3>Date & time</h3>
                <h4>
                  {state.dateBooking} at {state.time}
                </h4>
              </div>
              <hr />
              <div
                className={`${styles.main__info__1} ${styles.main__info__12}`}
              >
                <h3>Movie title</h3>
                <h4>{state.movieName}</h4>
              </div>
              <hr />
              <div
                className={`${styles.main__info__1} ${styles.main__info__13}`}
              >
                <h3>Cinema name</h3>
                <h4>{state.premiere} Cinema</h4>
              </div>
              <hr />
              <div
                className={`${styles.main__info__1} ${styles.main__info__14}`}
              >
                <h3>Number of tickets</h3>
                <h4>{state.totalPayment / state.price} pieces</h4>
              </div>
              <hr />
              <div
                className={`${styles.main__info__1} ${styles.main__info__price}`}
              >
                <h3>Total payment</h3>
                <h4>{state.totalPayment} IDR</h4>
              </div>
            </div>
          </div>
          <div className={styles.main__method}>
            <h3>Choose Your Payment Method</h3>
            <div className={styles.main__method__container}>
              <div className={styles.main__method__containerimg}>
                <div className={styles.main__method__img}>
                  <img
                    src="/img/Bank BCA Logo (SVG-240p) - FileVector69 1.png"
                    alt=""
                  />
                </div>
                <div className={styles.main__method__img}>
                  <img
                    src="/img/Bank BRI (Bank Rakyat Indonesia) Logo (SVG-240p) - FileVector69 1.png"
                    alt=""
                  />
                </div>
                <div className={styles.main__method__img}>
                  <img
                    src="/img/Logo DANA (PNG-240p) - FileVector69 1.png"
                    alt=""
                  />
                </div>
                <div className={styles.main__method__img}>
                  <img
                    src="/img/Logo GoPay (SVG-240p) - FileVector69 1.png"
                    alt=""
                  />
                </div>
                <div className={styles.main__method__img}>
                  <img src="/img/logos_ge-pay.png" alt="" />
                </div>
                <div className={styles.main__method__img}>
                  <img src="/img/Vecr.png" alt="" />
                </div>
                <div className={styles.main__method__img}>
                  <img src="/img/logos_paypal.png" alt="" />
                </div>
                <div className={styles.main__method__img}>
                  <img src="/img/Vector (2).png" alt="" />
                </div>
              </div>
              <div className={styles.main__method__or}>
                <div className={styles.main__method__or__line}></div>
                <p>or</p>
                <div className={styles.main__method__or__line}></div>
              </div>
              <div className={styles.main__method__text}>
                <p>Pay via cash.</p>
                <p>
                  <a href="">See how it work</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.main__personal}>
          <h3>Personal Info</h3>
          <div className={styles.main__personal__container}>
            <form action="">
              <div className={`mb-3 ${styles.mb_3}`}>
                <label for="exampleInputFirstName1" className={`form-label`}>
                  Full Name
                </label>
                <input
                  type="text"
                  className={`form-control ${styles.main__personal__input}`}
                  id="exampleInputFirstName1"
                  value={`${dataUser.firstName}  ${dataUser.lastName}`}
                  readOnly
                />
              </div>
              <div className={`mb-3 ${styles.mb_3}`}>
                <label for="exampleInputEmail1" className={`form-label`}>
                  Email address
                </label>
                <input
                  type="email"
                  className={`form-control ${styles.main__personal__input}`}
                  id="exampleInputEmail1"
                  value={`${dataUser.email}`}
                  readOnly
                />
              </div>
              <div className={`mb-3 ${styles.mb_3} `}>
                <label for="exampleInputPhone1" className={`form-label`}>
                  Phone Number
                </label>
                <div
                  className={`input-group ${styles.main__personal__input} ${styles.input_group}`}
                >
                  <span className={`input-group-text`} id="addon-wrapping">
                    +62{" "}
                  </span>
                  <input
                    type="tel"
                    className={`form-control ${styles.form__control__telp}`}
                    id="exampleInputPhone1"
                    value={`${dataUser.noTelp}`}
                    aria-describedby="addon-wrapping"
                    disabled
                  />
                </div>
              </div>
              <div
                className={`alert alert-warning ${styles.alert} ${styles.alert_warning}`}
              >
                <img src="/img/Vector (3).png" alt="" /> Fill your data
                correctly.
              </div>
            </form>
          </div>
        </div>
        <div className={styles.main__button}>
          <button>Previous step</button>
          <button onClick={handleOrder}>Pay your order</button>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Payment;
