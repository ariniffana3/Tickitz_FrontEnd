import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import Pagination from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "../../utils/axios";
import CardSchedule from "../../components/CardSchedule/CardSchedule";

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
    time: [],
  });
  const [image, setImage] = useState(null);
  const [idMovie, setIdMovie] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [clickTime, setClickTime] = useState(false);
  const [time, setTime] = useState([]);

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
      setdataMovie(resultMovie);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleChangeForm = async (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    // console.log(name, value, "name value");
    await setForm({ ...form, [name]: value });
    // console.log(form, "form");
    if (name == "movieId" && !image) {
      const data = dataMovie.find((i) => {
        return i.id == value;
      });
      setImage(data.image);
    }
  };

  const handleClickTime = () => {
    setClickTime(true);
  };

  const handleChangeTime = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value, "name value");
    console.log(e.key);
    if (e.key === "Enter") {
      console.log(value, "value");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form, "form");
    const formData = new FormData();
    for (const data in form) {
      formData.append(data, form[data]);
    }
    setImage(null);
  };
  const setUpdate = async (data) => {
    console.log(data);
    setForm({
      ...form,
      movieName: data.name,
      category: data.category,
      image: data.image,
      releaseDate: data.releaseDate,
      casts: data.casts,
      director: data.director,
      durationHour: data.duration,
      durationMinute: data.duration,
      synopsis: data.synopsis,
    });
    setIdMovie(data.id);
    setIsUpdate(true);
  };
  const handleDelete = (id) => {
    resetForm();
    console.log(id);
  };
  const resetForm = () => {
    // setForm.name("");
    // setForm.category("");
    // setForm.synopsis("");
    // setForm.image("");
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(idMovie);
    const formData = new FormData();
    for (const data in form) {
      formData.append(data, form[data]);
    }
    formData.append("name", form.name);
    setIsUpdate(false);
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
                <div
                  className={styles.main__img__img}
                  // onClick={handleClickUpdateImage}
                >
                  <img
                    src={
                      image
                        ? `${process.env.REACT_APP_CLOUDINARY}${image}`
                        : "https://www.a1hosting.net/wp-content/themes/arkahost/assets/images/default.jpg"
                    }
                    alt="movie"
                  />
                  {/* <input
                    type="file"
                    accept=".jpg, .png, .jpeg"
                    ref={hiddenFileInput}
                    name="image"
                    onChange={handleChangeForm}
                    style={{ display: "none" }}
                  /> */}
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
                    id="movieName"
                    onChange={handleChangeForm}
                    className={styles.option}
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
                    value={form.director}
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
                      onKeyUp={handleChangeTime}
                      value={form.casts}
                      className={
                        clickTime
                          ? `form-control ${styles.time} `
                          : ` form-control ${styles.time} ${styles.time__none}`
                      }
                      id="cast"
                      placeholder="08:00"
                      required
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
