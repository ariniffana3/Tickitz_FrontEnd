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
import Header from "../../components/Header";
import Footer from "../../components/Footer";

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

  useEffect(() => {
    getdataSchedule();
  }, []);

  useEffect(() => {
    getdataSchedule();
  }, [location]);

  const getMovieId = async () => {
    try {
      const resultMovieId = await axios.get(`movie/${state.id}`);
      setData(resultMovieId.data.data[0]);
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
    dateBooking: moment(new Date()).format("MMM DD YY"),
    time: "",
    price: "",
  });

  const handleOrder = () => {
    navigate("/order", {
      state: {
        ...dataOrder,
      },
    });
    // console.log("handle order");
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

  const handleLocation = (e) => {
    setLocation(e.target.value);
  };
  data.defaultProps = {
    releaseDate: "default",
  };
  // console.log(location);

  function getTodayDate() {
    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    return `${year}-${month}-${day}`;
  }

  return (
    <>
      <Header />
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
          <input type="date" value={getTodayDate()} />
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
              <CardSchedule
                data={item}
                handleOrder={handleOrder}
                changeDataOrder={changeDataOrder}
                dataOrder={dataOrder}
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
      <Footer />
    </>
  );
}
