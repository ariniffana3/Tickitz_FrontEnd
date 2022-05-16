import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import CardDown from "../../components/CardDown/CardDown";
import Pagination from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import {
  getDataSchedule,
  postMovie,
  updateMovie,
  deleteMovie,
} from "../../stores/actions/movieviewall";
import axios from "axios";

function Home() {
  document.title = "Manage Movie";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [dataRelease, setDataRelease] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("name");
  const [search, setSearch] = useState("");
  const [searchOnChange, setSearchOnChange] = useState("");
  const [form, setForm] = useState({
    movieName: "",
    category: "",
    image: "",
    releaseDate: "",
    casts: "",
    director: "",
    durationHour: "",
    durationMinute: "",
    synopsis: "",
  });
  const [image, setImage] = useState(null);
  const [idMovie, setIdMovie] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const isPageManageMovie = true;
  // const [movieName, setMovieName] = useState("");
  // const [director, setDirector] = useState("");
  // const [releaseDate, setReleaseDate] = useState("");
  // const [category, setCategory] = useState("");
  // const [cast, setCast] = useState("");
  // const [durationHour, setDurationHour] = useState("");
  // const [durationMinute, setdurationMinute] = useState("");
  // const [synopsis, setSynopsis] = useState("");

  const movie = useSelector((state) => state.movie);
  const limit = 8;

  const dataUser = localStorage.getItem("dataUser");

  useEffect(() => {
    getdataMovie();
  }, []);

  useEffect(() => {
    getdataMovie();
  }, [page]);
  const token = localStorage.getItem("token");
  const getdataMovie = async () => {
    try {
      // panggil action

      await dispatch(
        getDataMovie(token, page, limit, sort, dataRelease, search)
      );
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleChangeForm = (event) => {
    const { name, value, files } = event.target;
    if (name === "image") {
      setForm({ ...form, [name]: files[0] });
      setImage(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    const formData = new FormData();
    for (const data in form) {
      formData.append(data, form[data]);
    }
    for (const data of formData.entries()) {
      console.log(data[0] + ", " + data[1]);
      // name, "Bagus"
    }
    dispatch(postMovie(formData));
    dispatch(getDataMovie(page, limit));
    setImage(null);
  };
  const setUpdate = async (data) => {
    console.log(data);
    // const data = await axios.get(`/movie/${id}`);
    // "id": "eabe018e-cf54-4991-98fb-48674e0ea825",
    // "name": "Antlers",
    // "category": "Drama, Horror, Mystery",
    // "image": "pesanfilm/imageMovie/tqpehnc866lzwngwlurc.jpeg",
    // "releaseDate": "2022-01-22T00:00:00.000Z",
    // "casts": "Keri Russell, Jesse Plemons, Jeremy T. Thomas",
    // "director": "Scott Cooper",
    // "duration": "1h 39m",
    // "synopsis": "ANTLERS adalah karya terbaru dari sutradara visioner terkenal Scott Cooper dan maestro horor Guillermo del Toro. Di sebuah kota terpencil di Oregon, seorang guru sekolah menengah (Keri Russell) dan saudara lelakinya yang juga sheriff (Jesse Plemons) menjadi terlibat dalam kehidupan salah satu muridnya yang misterius (Jeremy T. Thomas) dengan rahasia gelap yang akan membawa mereka pada perjumpaan dengan sosok makhluk leluhur legendaris yang menakutkan.",
    // "createdAt": "2022-04-26T08:20:57.000Z",
    // "updatedAt": null
    // console.log(data);
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
    dispatch(deleteMovie(id));
    dispatch(getDataSchedule(page, limit));
    resetForm();
    console.log(id);
  };
  const resetForm = () => {
    setForm.name("");
    setForm.category("");
    setForm.synopsis("");
    setForm.image("");
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    console.log(idMovie);
    const formData = new FormData();
    for (const data in form) {
      formData.append(data, form[data]);
    }
    formData.append("name", form.name);
    // axios.patch("...", formData)
    dispatch(updateMovie(idMovie, formData));
    dispatch(getDataSchedule(page, limit));
    setIsUpdate(false);
  };
  const handlePagination = (data) => {
    setPage(data.selected + 1);
  };
  const signIn = () => {
    navigate("/signin");
  };
  const handleDetailMovie = (id) => {
    navigate("/detail", { state: { userId: dataUser.id, id: id } });
  };
  const handleSort = (e) => {
    setSort(e.target.value);
  };
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearch(e.target.value);
    }
  };

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
          <div className={styles.header__hamburger}>
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
      <main className={`${styles.main} ${styles.addition__main}`}>
        <div className={styles.main__title}>
          <div className={styles.main__title__p1}>
            <p>List Movie</p>
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
                      form.image
                        ? `${process.env.REACT_APP_CLOUDINARY}${form.image}`
                        : "https://www.a1hosting.net/wp-content/themes/arkahost/assets/images/default.jpg"
                    }
                    alt="movie"
                  />
                </div>
              </div>
              <div className={styles.main__form__up__middle}>
                <div className={`mb-3`}>
                  <label for="movieName" className={`form-label`}>
                    Movie Name
                  </label>
                  <input
                    type="text"
                    value={form.movieName}
                    onChange={(event) => handleChangeForm(event)}
                    // onChange={handleChangeForm}
                    // value={movieName}
                    className={`form-control ${styles.form__control}`}
                    id="movieName"
                    placeholder="Movie Name"
                    required
                  />
                </div>
                <div className={`mb-3`}>
                  <label for="director" className={`form-label`}>
                    Director
                  </label>
                  <input
                    type="text"
                    name="text"
                    onChange={(event) => handleChangeForm(event)}
                    // onChange={handleChangeForm}
                    value={form.director}
                    className={`form-control ${styles.form__control}`}
                    id="director"
                    placeholder="Director"
                    required
                  />
                </div>
                <div className={`mb-3`}>
                  <label for="releaseDate" className={`form-label`}>
                    Release Date
                  </label>
                  <input
                    type="text"
                    name="text"
                    onChange={(event) => handleChangeForm(event)}
                    // onChange={handleChangeForm}
                    value={form.releaseDate}
                    className={`form-control ${styles.form__control}`}
                    id="releaseDate"
                    placeholder="Release Date"
                    required
                  />
                </div>
              </div>
              <div className={styles.main__form__up__right}>
                <div className={`mb-3`}>
                  <label for="category" className={`form-label`}>
                    Category
                  </label>
                  <input
                    type="text"
                    name="text"
                    onChange={(event) => handleChangeForm(event)}
                    // onChange={handleChangeForm}
                    value={form.category}
                    className={`form-control ${styles.form__control}`}
                    id="category"
                    placeholder="Category"
                    required
                  />
                </div>
                <div className={`mb-3`}>
                  <label for="cast" className={`form-label`}>
                    Cast
                  </label>
                  <input
                    type="text"
                    name="text"
                    onChange={(event) => handleChangeForm(event)}
                    // onChange={handleChangeForm}
                    value={form.casts}
                    className={`form-control ${styles.form__control}`}
                    id="cast"
                    placeholder="Cast"
                    required
                  />
                </div>
                <div className={styles.main__duration}>
                  <div className={`mb-3`}>
                    <label for="durationHour" className={`form-label`}>
                      Duration Hour
                    </label>
                    <input
                      type="text"
                      name="text"
                      onChange={(event) => handleChangeForm(event)}
                      // onChange={handleChangeForm}
                      value={form.durationHour}
                      className={`form-control ${styles.form__control}`}
                      id="durati0nHour"
                      placeholder="Duration Hour"
                      required
                    />
                  </div>
                  <div className={`mb-3`}>
                    <label for="durationMinute" className={`form-label`}>
                      Duration Minute
                    </label>
                    <input
                      type="text"
                      name="text"
                      onChange={(event) => handleChangeForm(event)}
                      // onChange={handleChangeForm}
                      value={form.durationMinute}
                      className={`form-control ${styles.form__control}`}
                      id="durationMinute"
                      placeholder="Duration Minute"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`${styles.main__form__middle} ${styles.main__synopsis}`}
            >
              <label for="synopsis" className={`form-label`}>
                Synopsis
              </label>
              <input
                type="text-area"
                id="synopsis"
                className={`form-control ${styles.form__control}`}
                placeholder="Synopsis"
                // onChange={handleChangeForm}
                value={form.synopsis}
                onChange={(event) => handleChangeForm(event)}
              />
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
            <p>
              <a href=""> List Movie</a>
            </p>
          </div>
          <div className={styles.main1__title__right}>
            <select name="sort" id="" onChange={handleSort}>
              <option value="name">Sort by</option>
              <option value="name ASC">Name a-z</option>
              <option value="name DESC">Name z-a</option>
              <option value="releaseDate">Release Date</option>
            </select>
            <div
              className={`input-group ${styles.main1__title__right__search}`}
            >
              <div className="form-outline">
                <input
                  type="search"
                  id="form1"
                  className="form-control"
                  onKeyPress={handleSearch}
                  placeholder="Search Movie Name"
                />
                {/* <label className="form-label" for="form1"></label> */}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.main1__img__container}>
          <ul>
            {movie.isLoading ? (
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <div className="row">
                {movie.data.map((item) => (
                  <div className="col-md-3">
                    <li key={item.id}>
                      {/* <span>{JSON.stringify(item)}</span> */}
                      <CardDown
                        data={item}
                        handleDetail={handleDetailMovie}
                        setUpdate={setUpdate}
                        handleDelete={handleDelete}
                        isPageManageMovie={isPageManageMovie}
                        // dataUser={dataUser}
                        // month={newData}
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
            pageCount={movie.pageInfo.totalPage}
            onPageChange={handlePagination}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      </main>
      <footer>
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
