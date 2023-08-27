import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../utils/axios";
import CardUp from "../../components/CardUp/CardUp";
import CardDown from "../../components/CardDown/CardDown";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Home() {
  document.title = "Homes";
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
      const resultMovie = await axios.get(
        `movie?page=${page}&limit=${limit}&searchRelease=${releaseDate.date}`
      );
      setData(resultMovie.data.data);
      setPageInfo(resultMovie.data.pagination);
    } catch (error) {
      console.log(error.response);
      setData([]);
    }
  };
  const getdataMovieRelease = async () => {
    try {
      const resultMovie = await axios.get(
        `movie?page=${page}&limit=${limit}&searchRelease=${releaseDate.date}`
      );
      setDataRelease(resultMovie.data.data);
      setPageInfo(resultMovie.data.pagination);
    } catch (error) {
      console.log(error.response);
      setDataRelease([]);
    }
  };

  const handleDetailMovie = (id) => {
    navigate("/detail", { state: { userId: dataUser.id, id: id } });
  };
  const handleViewAll = () => {
    navigate("/viewall");
  };
  return (
    <>
      <Header />
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
            <a href="" onClick={handleViewAll}>
              {" "}
              view all
            </a>
          </p>
        </div>
        <div className={styles.main1__img__container__hover}>
          <ul>
            {data.map((item) =>
              item ? (
                <li key={item.id}>
                  <CardUp data={item} handleDetail={handleDetailMovie} />
                </li>
              ) : (
                <></>
              )
            )}
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
            <a href="" onClick={handleViewAll}>
              {" "}
              view all
            </a>
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
            {dataRelease.map((item) =>
              item ? (
                <li key={item.id}>
                  <CardDown data={item} handleDetail={handleDetailMovie} />
                </li>
              ) : (
                <></>
              )
            )}
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
        <Footer />
      </footer>
    </>
  );
}
