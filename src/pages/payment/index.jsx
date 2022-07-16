import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../utils/axios";
import { useSelector, useDispatch } from "react-redux";

function Payment() {
  document.title = "Payment";
  const { state } = useLocation();
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState([]);
  let [dataUserStorage, setDataUserStorage] = useState([]);
  console.log(state.userId);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    getdataUser();
  }, []);
  // useEffect(() => {
  //   getdataUser();
  // }, [state.userId]);
  // useEffect(() => {
  //   console.log("useEffect")
  // },[]);
  const getdata = async () => {
    try {
      // console.log('tess')
      // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      // const resultSchedule = await axios.get(`user/4`);
      // setDataUser(resultSchedule.data.data);
      console.log("error");
    } catch (error) {
      console.log(error.response);
    }
  };

  // const token = localStorage.getItem("token");
  dataUserStorage = JSON.parse(localStorage.getItem("dataUser"));
  console.log(typeof dataUserStorage);
  console.log(dataUserStorage.id);
  const getdataUser = async () => {
    try {
      // console.log('tess')
      // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      // const resultSchedule = await axios.get(`user/${dataUserStorage.id}`);
      // setDataUser(resultSchedule.data.data);
      //  console.log("error")
      // const resultSchedule = user;
      setDataUser(user.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleOrder = () => {
    // await axios.
  };

  console.log(dataUser);

  const Home = () => {
    navigate("/home");
  };
  return (
    <>
      <header className={styles.payment__order}>
        <div className={styles.header} id="header">
          <div className={styles.header__left}>
            <ul>
              <li className={styles.header__li}>
                <a href="" className={styles.header__li__link}>
                  <img
                    src="/img/Home/vector tickitz 2.png"
                    alt="tickitz"
                    className={styles.header__img}
                  />
                </a>
              </li>
              <li className={styles.header__li}>
                <a
                  href=""
                  className={`${styles.header__li__link} ${styles.mobile__header__li}`}
                  onClick={Home}
                >
                  Home
                </a>
              </li>
              <li className={styles.header__li}>
                <a
                  href=""
                  className={`${styles.header__li__link} ${styles.mobile__header__li}`}
                >
                  List Movie
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.header__right}>
            <div className={styles.header__hamburger} onclick="showMenu()">
              <div className={styles.header__hamburger__line}></div>
              <div className={styles.header__hamburger__line}></div>
              <div className={styles.header__hamburger__line}></div>
            </div>
            <div>
              <img
                src="/img/Vector.png"
                alt=""
                className={styles.header__right__desktop}
              />
            </div>

            <div
              className={`${styles.header__profile} ${styles.header__right__desktop}`}
            >
              <img src="/img/Ellipse 11.png" alt="" />
            </div>
          </div>
        </div>
        <div
          className={styles.header__menu}
          id="header__menu"
          style={{ display: "none" }}
        >
          <div className={styles.header__menu__home}>Home</div>
          <div className={styles.header__menu__listMovie}>List Movie</div>
          <div className={styles.header__menu__signIn}>Sign In</div>
          <div className={styles.header__menu__copyright}>
            © 2020 Tickitz. All Rights Reserved
          </div>

          <script>
            {/* function showMenu() {
            let display = document.getElementById("header__menu");
            let header = document.getElementById("header");
            // if (display.style === "display: none") {
            display.style = "display: block";
            // header.style = "position: fixed";
            // console.log("oke");
            // } else
            // if (display.style === "display: block") {
            // display.style = "display: none";
            // header.style = "position: static";
            // console.log("okee");
            // }
            // console.log("oke");
          } */}
          </script>
        </div>
      </header>
      {/* //     dateBooking: "Apr 27th 22"
// idOrder: "8194a9ae-3e65-4680-b41e-cccdc9bfb781"
// movieId: "51bcd5ef-962d-4c7f-93ac-8ee6a9801307"
// movieName: "Choose or Die"
// premiere: "Hiflix"
// price: 45000
// time: "08:30am" 
dateBooking: "Apr 28th 22"
idOrder: "21b93576-420f-4aca-99a7-bfb4a0f3c6ab"
movieId: "1061a732-8197-4cd2-9aaa-ad2cfd04092f"
movieName: "Walking Dead - Tomate"
premiere: "Ebv.Id"
price: 50000
time: undefined
userId: "4"*/}
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
                <h4>3 pieces</h4>
              </div>
              <hr />
              <div
                className={`${styles.main__info__1} ${styles.main__info__price}`}
              >
                <h3>Total payment</h3>
                <h4>{state.price} IDR</h4>
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
        {/* 0: {id: '2', firstName: 'budi', lastName: 'doremi', email: 'doremi@gmail.com', image: '', …}
length: 1 */}
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
          <button onclick={handleOrder}>Pay your order</button>
        </div>
      </main>
      <footer>
        <div className={styles.footer__ending}>
          <div className={styles.footer__ending__tickitz}>
            <img src="/img/Home/vector tickitz 2.png" alt="" />
            <p>
              Stop waiting in line. Buy tickets <br />
              conveniently, watch movies quietly.
            </p>
          </div>
          <div className={styles.footer__ending__explore}>
            <h3>Explore</h3>
            <div className={styles.footer__ending__explore__list}>
              <a href="" className={styles.footer__ending__explore__list__1}>
                <p>Home</p>
              </a>
              <a href="" className={styles.footer__ending__explore__list__2}>
                List Movie
              </a>
            </div>
          </div>
          <div className={styles.footer__ending__sponsor}>
            <h3>Our Sponsor</h3>
            <div className={styles.footer__ending__sponsor__list}>
              <div>
                <img src="/img/Home/Vector.png" alt="" />
              </div>
              <div>
                <img src="/img/Home/Vector-1.png" alt="" />
              </div>
              <div>
                <img src="/img/Home/Vector-2.png" alt="" />
              </div>
            </div>
          </div>
          <div className={styles.footer__ending__socialMedia}>
            <h3>Follow us</h3>
            <div className={styles.footer__ending__socialMedia__list}>
              <div>
                <img src="/img/Home/Vector-3.png" alt="" />
                <a href=""> Tickitz Cinema id</a>
              </div>
              <div>
                <img src="/img/Home/bx_bxl-instagram.png" alt="" />
                <a href="">tickitz.id</a>
              </div>
              <div>
                <img src="/img/Home/Vector-6.png" alt="" />
                <a href=""> tickitz.id</a>
              </div>
              <div>
                <img src="/img/Home/Group.png" alt="" />
                <a href="">Tickitz Cinema id</a>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footer__copyright}>
          © 2020 Tickitz. All Rights Reserved
        </div>
      </footer>
    </>
  );
}

export default Payment;
