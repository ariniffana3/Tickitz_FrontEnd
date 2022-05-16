import React, { useState, useEffect } from "react";
import {
  useSearchParams,
  useLocation,
  useParams,
  useNavigate,
} from "react-router-dom";
import styles from "./index.module.css";
import axios from "../../utils/axios";
import CardSchedule from "../../components/CardSchedule/CardSchedule";
import moment from "moment";

export default function Detail() {
  document.title = "Detail Movie";

  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [dataSchedule, setDataSchedule] = useState([]);
  const [pageInfoSchedule, setPageInfoSchedule] = useState({});
  const [dataRilis, setDataRilis] = useState({});
  const [location, setLocation] = useState([]);
  const [dateNow, setDateNow] = useState(moment(new Date()).format("L"));

  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    getMovieId();
  }, []);
  //   useEffect(() => {
  //     getMovieId();
  //   }, [page]);
  useEffect(() => {
    getdataSchedule();
  }, []);
  useEffect(() => {
    getdataSchedule();
  }, [location]);

  const token = localStorage.getItem("token");
  const getMovieId = async () => {
    try {
      // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const resultMovieId = await axios.get(`movie/${state.id}`);
      setData(resultMovieId.data.data[0]);
      // setDataRilis(data.releaseDate);
      // setDataRilis(moment(dataRilis).format("MMM Do YY"));
    } catch (error) {
      console.log(error.response);
    }
  };

  const getdataSchedule = async () => {
    try {
      // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const resultSchedule = await axios.get(
        `/schedule?page=1&limit=6&searchMovieId=${state.id}&searchLocation=${location}&sort=`
      );
      setDataSchedule(resultSchedule.data.data);
      setPageInfoSchedule(resultSchedule.data.pagination);
    } catch (error) {
      console.log(error.response);
    }
  };

  const [dataOrder, setDataOrder] = useState({
    idOrder: "",
    movieId: state.id,
    movieName: data.name,
    userId: state.userId,
    dateBooking: moment(new Date()).format("MMM Do YY"),
    time: "",
    price: "",
  });

  const handleOrder = () => {
    navigate("/order", {
      state: {
        ...dataOrder,
      },
    });
    console.log("handle order");
  };
  const changeDataOrder = (data) => {
    console.log(data);
    setDataOrder({
      ...dataOrder,
      idOrder: data.id,
      time: data.time,
      price: data.price,
      premiere: data.premiere,
      movieName: data.name,
    });
  };
  const Home = () => {
    navigate("/Home");
  };
  // const additionData = {
  //   ...state,
  //   name: data.name,
  //   userId: state.userId,
  //   dateBooking: moment(new Date()).format("MMM Do YY"),
  // };
  const handleLocation = (e) => {
    setLocation(e.target.value);
  };
  data.defaultProps = {
    releaseDate: "default",
  };
  console.log(location);
  return (
    <>
      <header defaultValue="tess">
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
            <div className={styles.header__profile}></div>
            <img src="" alt="" />
          </div>
          <button className={styles.header__button}>Sign Up</button>
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
      <main key={data.name} className={styles.detail__main}>
        <div className={styles.main__img}>
          <div className={styles.main__img__img}>
            <img
              src={
                data.image
                  ? `${process.env.REACT_APP_CLOUDINARY}${data.image}`
                  : "https://www.a1hosting.net/wp-content/themes/arkahost/assets/images/default.jpg"
              }
              alt="movie"
            />
          </div>
        </div>
        <div className={styles.main__desc}>
          <div className={styles.main__desc__title}>
            <h1>{data.name}</h1>
            <h2>{data.category}</h2>
          </div>
          <div className={styles.main__desc__info}>
            <div className={styles.main__desc__info__1}>
              <h3>Release date</h3>
              <h4 defaultValue="tes">
                {moment(data.releaseDate).format("MMM Do YY")}
              </h4>
              <h3>Duration</h3>
              <h4>{data.duration}</h4>
            </div>
            <div className={styles.main__desc__info__2}>
              <h3>Directed by</h3>
              <h4>{data.director}</h4>
              <h3>Casts</h3>
              <h4>{data.casts}</h4>
            </div>
          </div>
          <hr />
          <div className={styles.main__desc__synopsis}>
            <h3>Synopsis</h3>
            <h4>{data.synopsis}</h4>
          </div>
        </div>
      </main>

      <section className={styles.detail__section}>
        <div className={styles.section__title}>Showtime and Tickets</div>
        <div className={styles.section__option}>
          <input type="date" value={new Date()} />
          <select name="location" id="" onChange={handleLocation}>
            <option value="">Location</option>
            <option value="Bogor">Bogor</option>
            <option value="Depok">Depok</option>
            <option value="Bandung">Bandung</option>
          </select>
        </div>
        <div className={styles.section__cinemaBox}>
          {dataSchedule.map((item) => (
            <div className={styles.section__cinemaBox__item} key={item.id}>
              {/* <span>{JSON.stringify(item)}</span> */}
              <CardSchedule
                data={item}
                handleOrder={handleOrder}
                changeDataOrder={changeDataOrder}
                dataOrder={dataOrder}
                // dataUser={dataUser}
                // month={newData}
              />
            </div>
          ))}
        </div>
        <div className={styles.viewMore}>
          <div className={styles.viewMore__line}></div>
          <p>View more</p>
          <div className={styles.viewMore__line}></div>
        </div>
      </section>
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

      {/* <div classNameNclassName={styles.me="text-center container">
      <h1>Detail Page</h1>
      <hr />
      <h6>Detail Movie</h6>
      <hr />
      <h3>List Schedule</h3>
      <input type="date" value={dataOrder.dateBooking} />
      <select name="location">
        <option value="">Select Location</option>
        <option value="jakarta">Jakarta</option>
      </select>
      <hr />
      <div classNameNclassName={styles.me="row">
        {listSchedule.map((item) => (
          <div classNameNclassName={styles.me="col-md-4" key={item.id}>
            <h4>{item.premiere}</h4>
            <hr />
            {item.time.map((itemTime) => (
              <button
                key={itemTime}
                onClick={() => changeDataBooking({ timeBooking: itemTime, scheduleId: item.id })}
              >
                {itemTime}
              </button>
            ))}
            <br />
            <br />
            <button
              disabled={item.id === dataOrder.scheduleId ? false : true}
              onClick={handleBooking}
            >
              Booking
            </button>
          </div>
        ))}
      </div>
      <hr />
      <h5>Detail Order Data</h5>
      <h6>{JSON.stringify(dataOrder)}</h6>
    </div> */}
    </>
  );
}
