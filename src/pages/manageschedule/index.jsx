import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import Pagination from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "../../utils/axios";
import CardSchedule from "../../components/CardSchedule/CardSchedule";
import moment from "moment";

function ManageSchedule() {
  document.title = "Manage Schedule";
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("name");
  const limit = 9;
  const [dataMovie, setdataMovie] = useState([]);
  const [movieId, setMovieId] = useState("");
  const [location, setLocation] = useState("");
  const [data, setData] = useState([]);
  const isPageManageSchedule = true;
  const [form, setForm] = useState({
    movieId: "",
    premiere: "",
    price: "",
    location: "",
    dateStart: "",
    dateEnd: "",
    time: "",
  });
  const [image, setImage] = useState(null);
  const [idMovie, setIdMovie] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [clickTime, setClickTime] = useState(false);
  const [time, setTime] = useState([]);
  const [timeTemp, setTimeTemp] = useState(null);

  useEffect(() => {
    getdataSchedule();
  }, [page, sort, movieId, location]);

  useEffect(() => {
    getdataMovie();
  }, []);

  const getdataSchedule = async () => {
    try {
      const result = await axios.get(
        `/schedule?page=${page}&limit=${limit}&searchMovieId=${movieId}&searchLocation=${location}&sort=${sort}`
      );

      console.log(result.data);
      setData(result.data);
    } catch (error) {
      console.log(error.response);
      setData([]);
    }
  };
  const getdataMovie = async () => {
    try {
      let totalData = await axios.get("/movie");
      totalData = totalData.data.pagination.totalData;
      let resultMovie = await axios.get(`/movie?limit=${totalData}`);
      resultMovie = resultMovie.data.data.map((item) => {
        return { name: item.name, id: item.id, image: item.image };
      });
      await setdataMovie(resultMovie);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleChangeForm = async (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    console.log(name, value);
    await setForm({ ...form, [name]: value });
    if (name == "movieId") {
      const data = dataMovie.find((i) => {
        return i.id == value;
      });
      setImage(data.image);
    }
  };

  const handleClickTime = () => {
    setClickTime(true);
  };
  const handleChangeTime = async (e) => {
    const { name, value } = e.target;
    setForm({ ...form, time: value });
    if (e.target.value.length == 5) {
      await setTime([...time, value]);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      let timeTemp = time;
      const a = timeTemp.join(",");
      const b = a.split();
      b.unshift("[");
      b.push("]");
      timeTemp = b.join("");
      const newForm = {
        ...form,
        time: timeTemp,
      };
      await axios.post(`schedule`, newForm);
      setPage(1);
      alert("Success Submit");
      resetForm();
    } catch (error) {
      console.log(error.response);
      alert(`Create Movie Failed`);
    }
  };
  const setUpdate = async (data) => {
    let time = data.time.split("");
    time.pop();
    time.shift();
    time = time.join("");
    time = time.split(",");
    setForm({
      ...form,
      id: data.id,
      movieId: data.movieId,
      premiere: data.premiere,
      price: data.price,
      location: data.location,
      dateStart: moment(data.dateStart).format("yyyy-MM-DD"),
      dateEnd: moment(data.dateEnd).format("yyyy-MM-DD"),
    });
    setTime(time);
    const dataImage = dataMovie.find((i) => {
      return i.id == data.movieId;
    });
    setImage(dataImage.image);
    setIsUpdate(true);
  };
  const handleDelete = async (id) => {
    try {
      if (window.confirm("You want to delete ?")) {
        await axios.delete(`schedule/${id}`);
        await setPage(1);
        alert("Delete Movie Success");
      }
    } catch (error) {
      console.log(error);
      alert(`Delete Movie Failed ${error}`);
    }
  };
  const resetForm = () => {
    setForm({
      movieId: "",
      premiere: "",
      price: "",
      location: "",
      dateStart: "",
      dateEnd: "",
      time: "",
    });
    setTime([]);
    setImage(null);
    setClickTime(false);
  };
  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      let timeTemp = time;
      const a = timeTemp.join(",");
      const b = a.split();
      b.unshift("[");
      b.push("]");
      timeTemp = b.join("");
      const newForm = {
        ...form,
        time: timeTemp,
      };
      await axios.patch(`schedule/${form.id}`, newForm);
      setPage(1);
      alert("Success Update");
      resetForm();
      setIsUpdate(false);
    } catch (error) {
      console.log(error.response);
      alert(`Update Movie Failed`);
    }
  };
  const handlePagination = (data) => {
    setPage(data.selected + 1);
  };
  const handleSort = (e) => {
    setSort(e.target.value);
  };
  const handleLocation = (e) => {
    setLocation(e.target.value);
  };
  const handleSortMovie = (e) => {
    setMovieId(e.target.value);
  };

  return (
    <>
      <Header />
      <main className={`${styles.main} ${styles.addition__main}`}>
        <div className={styles.main__title}>
          <div className={styles.main__title__p1}>
            <p>Form Schedule</p>
          </div>
        </div>
        <div className={styles.main__form}>
          <form action="" onSubmit={isUpdate ? handleUpdate : handleSubmit}>
            <div className={styles.main__form__up}>
              <div
                className={`${styles.main__form__up__left}${styles.main__img}`}
              >
                <div className={styles.main__img__img}>
                  <img
                    src={
                      image
                        ? `${process.env.REACT_APP_CLOUDINARY}${image}`
                        : "https://www.a1hosting.net/wp-content/themes/arkahost/assets/images/default.jpg"
                    }
                    alt="movie"
                  />
                </div>
              </div>
              <div className={styles.main__form__up__middle}>
                <div className={`mb-3 ${styles.form__control}`}>
                  <label for="movieName" className={`form-label`}>
                    Movie
                  </label>
                  <br />
                  <select
                    name="movieId"
                    id=""
                    onChange={handleChangeForm}
                    className={styles.option}
                    value={form.movieId}
                  >
                    <option value="name ASC"></option>
                    {dataMovie.map((item) => {
                      return (
                        <>
                          <option value={item.id} key={item.name}>
                            {item.name}
                          </option>
                        </>
                      );
                    })}
                  </select>
                </div>
                <div className={`mb-3 ${styles.form__control}`}>
                  <label for="director" className={`form-label`}>
                    Price
                  </label>
                  <input
                    type="number"
                    inputmode="numeric"
                    name="price"
                    onChange={handleChangeForm}
                    value={form.price}
                    className={`form-control ${styles.number}`}
                    id="director"
                    placeholder="Price"
                    required
                  />
                </div>
                <div className={`mb-3 ${styles.form__control}`}>
                  <label for="premiere" className={`form-label`}>
                    Premiere
                  </label>
                  <br />

                  <label for="myCheckbox" className={styles.label__radio}>
                    <input
                      type="radio"
                      name="premiere"
                      onChange={handleChangeForm}
                      value="Ebv.Id"
                      id="myCheckbox"
                      className={styles.input__radio}
                    />
                    <div
                      className={
                        form.premiere == "Ebv.Id"
                          ? `${styles.container__radio} ${styles.container__radio__active}`
                          : `${styles.container__radio}`
                      }
                    >
                      <img
                        src="/img/home/Vector.png"
                        alt=""
                        className={styles.radio__img}
                      />
                    </div>
                  </label>

                  <label for="myCheckbox1" className={styles.label__radio}>
                    <input
                      type="radio"
                      name="premiere"
                      onChange={handleChangeForm}
                      value="CineOne21"
                      id="myCheckbox1"
                      className={styles.input__radio}
                    />
                    <div
                      className={
                        form.premiere == "CineOne21"
                          ? `${styles.container__radio} ${styles.container__radio__active}`
                          : `${styles.container__radio}`
                      }
                    >
                      <img
                        src="/img/home/Vector-1.png"
                        alt=""
                        className={styles.radio__img}
                      />
                    </div>
                  </label>

                  <label for="myCheckbox2">
                    <input
                      type="radio"
                      name="premiere"
                      onChange={handleChangeForm}
                      value="Hiflix"
                      id="myCheckbox2"
                      className={styles.input__radio}
                    />
                    <div
                      className={
                        form.premiere == "Hiflix"
                          ? `${styles.container__radio} ${styles.container__radio__active}`
                          : `${styles.container__radio}`
                      }
                    >
                      <img
                        src="/img/home/Vector-2.png"
                        alt=""
                        className={styles.radio__img}
                      />
                    </div>
                  </label>
                </div>
              </div>
              <div className={styles.main__form__up__right}>
                <div className={`mb-3 ${styles.form__control}`}>
                  <label for="category" className={`form-label`}>
                    Location
                  </label>
                  <select
                    name="location"
                    id=""
                    value={form.location}
                    onChange={handleChangeForm}
                    className={styles.option}
                  >
                    <option value=""></option>
                    <option value="Whatever street No.12, Bogor">Bogor</option>
                    <option value="Whatever street No.12, Depok">Depok</option>
                    <option value="Whatever street No.12, Bandung">
                      Bandung
                    </option>
                  </select>
                </div>
                <div className={`${styles.main__duration}`}>
                  <div className={`mb-3 ${styles.form__control}`}>
                    <label for="durationHour" className={`form-label`}>
                      Date Start
                    </label>
                    <input
                      type="date"
                      name="dateStart"
                      onChange={handleChangeForm}
                      value={form.dateStart}
                      className={`form-control`}
                      id="durationHour"
                      required
                    />
                  </div>
                  <div className={`mb-3 ${styles.form__control}`}>
                    <label for="durationMinute" className={`form-label`}>
                      Date End
                    </label>
                    <input
                      type="date"
                      name="dateEnd"
                      onChange={handleChangeForm}
                      value={form.dateEnd}
                      className={`form-control`}
                      id="durationMinute"
                      min={form.dateStart}
                      required
                    />
                  </div>
                </div>
                <div className={`mb-3 ${styles.form__control}`}>
                  <label for="cast" className={`form-label`}>
                    Time
                  </label>
                  <div className={styles.container__time}>
                    <div
                      className={
                        clickTime
                          ? `${styles.container__plus} ${styles.container__plus__none}`
                          : styles.container__plus
                      }
                      onClick={handleClickTime}
                    >
                      <img
                        src="/img/bi_plus.png"
                        alt=""
                        className={styles.container__plus__img}
                      />
                    </div>
                    <input
                      type="text"
                      name="time"
                      onChange={handleChangeTime}
                      value={form.time}
                      className={
                        clickTime
                          ? `form-control ${styles.time} `
                          : ` form-control ${styles.time} ${styles.time__none}`
                      }
                      id="cast"
                      placeholder="08:00"
                    />
                    {time.map((item) => {
                      return (
                        <>
                          {" "}
                          <div className={styles.time__list}>{item}</div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.main__form__down}>
              <button onClick={resetForm}>reset</button>
              <button type="submit">{isUpdate ? "Update" : "Submit"}</button>
            </div>
          </form>
        </div>
      </main>
      <main className={`${styles.main1} ${styles.addition__main1}`}>
        <div className={styles.main1__title}>
          <div className={styles.main__title__p1}>
            <p>List Schedule</p>
          </div>
          <div className={styles.main1__title__right}>
            <select name="sort" id="" onChange={handleSort}>
              <option value="name">Sort by</option>
              <option value="name ASC">Name a-z</option>
              <option value="name DESC">Name z-a</option>
              <option value="releaseDate">Release Date</option>
            </select>
            <select name="location" id="" onChange={handleLocation}>
              <option value="">Location</option>
              <option value="Bandung">Bandung</option>
              <option value="Bogor">Bogor</option>
              <option value="Depok">Depok</option>
            </select>
            <select
              name="movieId"
              id=""
              onChange={handleSortMovie}
              className={styles.option}
            >
              <option value=""></option>
              {dataMovie.map((item) => {
                return (
                  <>
                    <option value={item.id} key={item.name}>
                      {item.name}
                    </option>
                  </>
                );
              })}
            </select>
          </div>
        </div>
        <div className={styles.main1__img__container}>
          <ul>
            {!data.data ? (
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <div className={`row  ${styles.container__card}`}>
                {data.data.map((item) => (
                  <div className={`col-md-3 ${styles.container__card__1}`}>
                    <li key={item.id}>
                      <CardSchedule
                        data={item}
                        setUpdate={setUpdate}
                        handleDelete={handleDelete}
                        isPageManageSchedule={isPageManageSchedule}
                      />
                    </li>
                  </div>
                ))}
              </div>
            )}
          </ul>
          <Pagination
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={data?.pagination?.totalPage || 1}
            onPageChange={handlePagination}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default ManageSchedule;
