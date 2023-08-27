import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import CardDown from "../../components/CardDown/CardDown";
import Pagination from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import { getDataMovie } from "../../stores/actions/movieviewall";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

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
  const limit = 8;

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

      await dispatch(getDataMovie(page, limit, sort, dataRelease, search));
    } catch (error) {
      console.log(error.response);
    }
  };

  const handlePagination = (data) => {
    setPage(data.selected + 1);
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
      <Header />
      <main className={`${styles.main1} ${styles.addition__main1}`}>
        <div className={styles.main1__title}>
          <div className={styles.main__title__p1}>
            <p>
              <a href=""> List Movie</a>
            </p>
          </div>
          <div className={styles.main1__title__right}>
            <select
              name="sort"
              id=""
              onChange={handleSort}
              className={styles.main1__title__right__sort}
            >
              <option value="name">Sort</option>
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
                  className={`form-control ${styles.main1__title__right__search}`}
                  onKeyPress={handleSearch}
                  placeholder="Search Movie Name"
                />
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
          {/* <ul> */}
          {movie.isLoading ? (
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <div className="row">
              {movie.data.map((item) => (
                <div className="col-md-3" key={item.id}>
                  {/* <li > */}
                  <CardDown data={item} handleDetail={handleDetailMovie} />
                  {/* </li> */}
                </div>
              ))}
              <div className="col-12 d-flex justify-content-center text-center">
                <Pagination
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  breakLabel={"..."}
                  pageCount={movie.pageInfo.totalPage}
                  onPageChange={handlePagination}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                  initialPage={page - 1}
                />
              </div>
            </div>
          )}
          {/* </ul> */}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Home;
