import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../utils/axios";
import CardUp from "../../components/CardUp/CardUp";
import CardDown from "../../components/CardDown/CardDown";

function Home() {
  document.title = "Home";
  const navigate = useNavigate();
  const { state } = useLocation();
  const limit = 7;

  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [dataRelease, setDataRelease] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  let [releaseDate, setReleaseDate] = useState({
    date: new Date().toISOString().split("T")[0].split("-")[1],
  });
  const dataUser = localStorage.getItem("dataUser");
  const newData = 1;
  const month = [
    { number: 1, title: "January" },
    { number: 2, title: "February" },
    { number: 3, title: "March" },
    { number: 4, title: "April" },
    { number: 5, title: "May" },
    { number: 6, title: "June" },
    { number: 7, title: "July" },
    { number: 8, title: "August" },
    { number: 9, title: "September" },
    { number: 10, title: "October" },
    { number: 11, title: "November" },
    { number: 12, title: "December" },
  ];
  // setReleaseDate();
  // console.log(dataRelease);

  useEffect(() => {
    getdataMovie();
  }, []);

  useEffect(() => {
    getdataMovieRelease();
  }, []);

  useEffect(() => {
    getdataMovieRelease();
  }, [releaseDate.date]);

  const token = localStorage.getItem("token");

  const getdataMovie = async () => {
    try {
      // console.log("GET DATA MOVIE");
      // Input
      //   console.log(limit);
      //   console.log(page);
      // Proses
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const resultMovie = await axios.get(
        `movie?page=${page}&limit=${limit}&searchRelease=${releaseDate.date}`
      );
      //   console.log(resultMovie);
      // Output
      setData(resultMovie.data.data);
      setPageInfo(resultMovie.data.pagination);
    } catch (error) {
      console.log(error.response);
    }
  };
  const getdataMovieRelease = async () => {
    try {
      // console.log("GET DATA MOVIE");
      // Input
      //   console.log(limit);
      //   console.log(page);
      // Proses
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const resultMovie = await axios.get(
        `movie?page=${page}&limit=${limit}&searchRelease=${releaseDate.date}`
      );
      //   console.log(resultMovie);
      // Output
      setDataRelease(resultMovie.data.data);
      setPageInfo(resultMovie.data.pagination);
    } catch (error) {
      console.log(error.response);
    }
  };

  const signIn = () => {
    navigate("/signin");
  };
  const handleDetailMovie = (id) => {
    // [1] = search params untuk pagination
    // navigate(`/basic/detail?id=${id}`);
    // [2] = state
    navigate("/detail", { state: { userId: dataUser.id, id: id } });
    // [3]
    // navigate(`/basic/detail/${id}`);
    // console.log(id);
  };
  // const showMenu = () => {
  //   let display = document.getElementById("header__menu");
  //   let header = document.getElementById("header");
  //   if (display.style == {display: "none"}) {
  //   display.style = {display: "block"};
  // header.style ={position: "fixed"};
  // console.log("oke");
  // }
  // else
  // if (display.style === {display: "block"}) {
  // display.style = {display: "none"};
  // header.style = {position: "static"};
  // console.log("okee");
  // }
  // console.log("oke");
  // }
  return (
    <>
      <header className={styles.header__first}>
        <div className={styles.header} id="header">
          <div className={styles.header__left}>
            <ul className={styles.ul}>
              <li className={styles.header__li}>
                <a href="" className={styles.header__li__link}>
                  <img
                    src="img/Home/vector tickitz 2.png"
                    alt="tickitz"
                    className={styles.header__img}
                  />
                </a>
              </li>
              <li className={styles.header__li}>
                <a
                  href=""
                  className={`${styles.header__li__link} ${styles.mobile__header__li}`}
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
          <div className={styles.header__hamburger} onclick="showMenu">
            <div className={styles.header__hamburger__line}></div>
            <div className={styles.header__hamburger__line}></div>
            <div className={styles.header__hamburger__line}></div>
          </div>
          <button className={styles.header__button} onClick={signIn}>
            Sign In
          </button>
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
      <section className={styles.home__section}>
        <div className={styles.section__title}>
          <div className={styles.section__title__container}>
            <p className={styles.sectioin__title__desc}>
              Nearest cimena, Newest movie
            </p>
            <h1 className={styles.sectioin__title__desc}>Find out now!</h1>
          </div>
        </div>
        <div className={styles.section__img}>
          <div
            className={`${styles.section__img__container} ${styles.section__img__1}`}
          >
            <img src="img/Home/Rectangle 31.png" alt="images" />
            <div className={styles.section__img__overlay}></div>
          </div>
          <div
            className={`${styles.section__img__container} ${styles.section__img__2}`}
          >
            <img src="img/Home/Rectangle 32.png" alt="images" />
            <div className={styles.section__img__overlay}></div>
          </div>
          <div
            className={`${styles.section__img__container} ${styles.section__img__3}`}
          >
            <img src="img/Home/Rectangle 33.png" alt="images" />
            <div className={styles.section__img__overlay}></div>
          </div>
        </div>
      </section>
      <main className={styles.main1}>
        <div className={styles.main1__title}>
          <div className={styles.main__title__p1}>
            <p>
              <a href=""> Now Showing</a>
            </p>
            <div className={styles.main__title__p1__line}></div>
          </div>

          <p>
            <a href=""> view all</a>
          </p>
        </div>
        <div className={styles.main1__img__container__hover}>
          <ul>
            {data.map((item) => (
              <li key={item.id}>
                {/* <span>{JSON.stringify(item)}</span> */}
                <CardUp
                  data={item}
                  handleDetail={handleDetailMovie}
                  // dataUser={dataUser}
                  // month={newData}
                />
              </li>
            ))}
          </ul>
        </div>
      </main>
      <main className={`${styles.main1} ${styles.addition__main1}`}>
        <div className={styles.main1__title}>
          <div className={styles.main__title__p1}>
            <p>
              <a href=""> Upcoming Movie</a>
            </p>
            <div className={styles.main1__title__p1__line}></div>
          </div>
          <p>
            <a href=""> view all</a>
          </p>
        </div>
        <div className={styles.main1__month__container}>
          <ul>
            {month.map((item) => (
              <li key={item.number}>
                <div
                  className={`${styles.main1__month} ${
                    item.number == releaseDate.date
                      ? styles.main1__month__active
                      : styles.main1__month
                  }`}
                  onClick={() => {
                    setReleaseDate({ date: item.number });
                  }}
                >
                  {item.title}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.main1__img__container}>
          <ul>
            {dataRelease.map((item) => (
              <li key={item.id}>
                {/* <span>{JSON.stringify(item)}</span> */}
                <CardDown
                  data={item}
                  handleDetail={handleDetailMovie}
                  // dataUser={dataUser}
                  // month={newData}
                />
              </li>
            ))}
          </ul>
        </div>
      </main>
      <footer>
        <div className={styles.footer__subscription}>
          <div className={styles.footer__subscription__text__up}>
            <p>Be the vanguard of the</p>
            <p>Moviegoers</p>
          </div>
          <div className={styles.footer__subscription__submit}>
            <input
              type="email"
              placeholder="Type your email"
              className={`form-control`}
            />
            <button>Join now</button>
          </div>
          <p className={styles.footer__subscription__text__down}>
            By joining you as a Tickitz member, <br />
            will always send you the latest updates via email.
          </p>
        </div>
        <div className={styles.footer__ending}>
          <div className={styles.footer__ending__tickitz}>
            <img src="img/Home/vector tickitz 2.png" alt="" />
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
                <p>List Movie</p>
              </a>
            </div>
          </div>
          <div className={styles.footer__ending__sponsor}>
            <h3>Our Sponsor</h3>
            <div className={styles.footer__ending__sponsor__list}>
              <div>
                <img src="img/Home/Vector.png" alt="" />
              </div>
              <div>
                <img src="img/Home/Vector-1.png" alt="" />
              </div>
              <div>
                <img src="img/Home/Vector-2.png" alt="" />
              </div>
            </div>
          </div>
          <div className={styles.footer__ending__socialMedia}>
            <h3>Follow us</h3>
            <div className={styles.footer__ending__socialMedia__list}>
              <div>
                <img src="img/Home/Vector-3.png" alt="" />
                <a href=""> Tickitz Cinema id</a>
              </div>
              <div>
                <img src="img/Home/bx_bxl-instagram.png" alt="" />
                <a href="">tickitz.id</a>
              </div>
              <div>
                <img src="img/Home/Vector-6.png" alt="" />
                <a href=""> tickitz.id</a>
              </div>
              <div>
                <img src="img/Home/Group.png" alt="" />
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

export default Home;
