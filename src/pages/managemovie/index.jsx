import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import CardDown from "../../components/CardDown/CardDown";
import Pagination from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import { getDataMovie } from "../../stores/actions/movieviewall";

function Home() {
  document.title = "View All";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [dataRelease, setDataRelease] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("name");
  const [search, setSearch] = useState("");
  const [searchOnChange, setSearchOnChange] = useState("");
  const [movieName, setMovieName] = useState("");
  const [director, setDirector] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [category, setCategory] = useState("");
  const [cast, setCast] = useState("");
  const [durationHour, setDurationHour] = useState("");
  const [durationMinute, setdurationMinute] = useState("");
  const [synopsis, setSynopsis] = useState("");

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
          <form action="">
            <div className={styles.main__form__up}>
              <div
                className={`${styles.main__form__up__left}${styles.main__img}`}
              >
                <div className={styles.main__img__img}>
                  <img
                    src={
                      movie.data.image
                        ? `${process.env.REACT_APP_CLOUDINARY}${movie.data.image}`
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
                    // onChange={handleChangeForm}
                    value={movieName}
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
                    // onChange={handleChangeForm}
                    value={director}
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
                    // onChange={handleChangeForm}
                    value={releaseDate}
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
                    // onChange={handleChangeForm}
                    value={category}
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
                    // onChange={handleChangeForm}
                    value={cast}
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
                      // onChange={handleChangeForm}
                      value={durationHour}
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
                      // onChange={handleChangeForm}
                      value={durationMinute}
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
                value={synopsis}
              />
            </div>
            <div className={styles.main__form__down}>
              <button>reset</button>
              <button>submit</button>
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
              movie.data.map((item) => (
                <li key={item.id}>
                  {/* <span>{JSON.stringify(item)}</span> */}
                  <CardDown
                    data={item}
                    handleDetail={handleDetailMovie}
                    // dataUser={dataUser}
                    // month={newData}
                  />
                </li>
              ))
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
