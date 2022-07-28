import React, { useState } from "react";
import styles from "../../pages/order/index.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { dataUser } from "../../stores/actions/user";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isAdmin, setIsAdmin] = useState(false);
  const [wasLogin, setWasLogin] = useState(false);
  const [data, setData] = useState({});
  let dataUserStorage = localStorage.getItem("dataUser");
  dataUserStorage = JSON.parse(dataUserStorage);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      setWasLogin(true);
      if (dataUserStorage.role === "admin") {
        setIsAdmin(true);
      }
    }
  }, []);
  useEffect(() => {
    getdataUser();
  }, []);

  const getdataUser = async () => {
    try {
      console.log("get data user id");
      let id = localStorage.getItem("dataUser");
      id = JSON.parse(id).id;
      const result = await dispatch(dataUser(id));
      console.log("result", result);
      setData(result.value.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  if (data) {
    console.log(data.image, data.firstName);
  }
  const signIn = () => {
    navigate("/signin");
  };
  const Home = () => {
    navigate("/");
  };
  const Detail = () => {
    navigate("/detail");
  };
  const manageMovie = () => {
    navigate("/managemovie");
  };
  const manageSchedule = () => {
    navigate("/manageschedule");
  };
  const profile = () => {
    navigate("/profile");
  };
  const viewAll = () => {
    navigate("/viewall");
  };

  return (
    <header className={styles.header__first}>
      <div className={styles.header} id="header">
        <div className={styles.header__left}>
          <ul className={styles.ul}>
            <li className={styles.header__li}>
              <a href="" className={styles.header__li__link} onClick={Home}>
                <img
                  src="img/Home/vector tickitz 2.png"
                  alt="tickitz"
                  className={styles.header__img}
                />
              </a>
            </li>
            {isAdmin ? (
              <>
                <li className={styles.header__li}>
                  <a
                    onClick={manageMovie}
                    href=""
                    className={`${styles.header__li__link} ${styles.mobile__header__li}`}
                  >
                    Manage Movie
                  </a>
                </li>
                <li className={styles.header__li}>
                  <a
                    href=""
                    onClick={manageSchedule}
                    className={`${styles.header__li__link} ${styles.mobile__header__li}`}
                  >
                    Manage Schedule{" "}
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className={styles.header__li}>
                  <a
                    onClick={Home}
                    href=""
                    className={`${styles.header__li__link} ${styles.mobile__header__li}`}
                  >
                    Home
                  </a>
                </li>
                <li className={styles.header__li}>
                  <a
                    href=""
                    onClick={Detail}
                    className={`${styles.header__li__link} ${styles.mobile__header__li}`}
                  >
                    List Movie
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className={styles.header__right}>
          <div className={styles.header__hamburger} onClick="showMenu()">
            <div className={styles.header__hamburger__line}></div>
            <div className={styles.header__hamburger__line}></div>
            <div className={styles.header__hamburger__line}></div>
          </div>
          {wasLogin ? (
            <>
              <div>
                <img
                  src="/img/Vector.png"
                  alt=""
                  className={styles.header__right__desktop}
                  onClick={viewAll}
                />
              </div>

              <div
                className={`${styles.header__profile} ${styles.header__right__desktop}`}
              >
                {wasLogin ? (
                  <img
                    src={
                      data
                        ? `${process.env.REACT_APP_CLOUDINARY}${data.image}`
                        : ""
                    }
                    alt="movie"
                    className={styles.header__profile__img}
                    onClick={profile}
                  />
                ) : (
                  <img src="/img/Ellipse 11.png" alt="" onClick={profile} />
                )}
              </div>
            </>
          ) : (
            <>
              <button className={styles.header__button} onClick={signIn}>
                Sign In
              </button>
            </>
          )}
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
        <script></script>
      </div>
    </header>
  );
}
