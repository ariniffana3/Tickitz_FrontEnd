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

  const movie = useSelector((state) => state.movie);
  const limit = 6;

  const dataUser = localStorage.getItem("dataUser");

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
    getdataMovie();
  }, [page, sort, dataRelease, search]);
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
        <div className={styles.main1__month__container}>
          <ul>
            {month.map((item) => (
              <li key={item.number}>
                <div
                  className={`${styles.main1__month} ${
                    item.number === dataRelease
                      ? styles.main1__month__active
                      : styles.main1__month
                  }`}
                  onClick={() => setDataRelease(item.number)}
                >
                  {item.title}
                </div>
              </li>
            ))}
          </ul>
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
                  <div className="col-md-4">
                    <li key={item.id}>
                      {/* <span>{JSON.stringify(item)}</span> */}
                      <CardDown
                        data={item}
                        handleDetail={handleDetailMovie}
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
