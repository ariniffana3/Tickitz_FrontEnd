import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import CardDown from "../../components/CardDown/CardDown";
import Pagination from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import {
  getDataMovie,
  postMovie,
  updateMovie,
  deleteMovie,
} from "../../stores/actions/movieviewall";
import axios from "axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import moment from "moment";

function Home() {
  document.title = "Manage Movie";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dataRelease, setDataRelease] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("name");
  const [search, setSearch] = useState("");
  const [searchOnChange, setSearchOnChange] = useState("");
  const [form, setForm] = useState({});
  const [image, setImage] = useState(null);
  const [idMovie, setIdMovie] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const isPageManageMovie = true;
  const movie = useSelector((state) => state.movie);
  const limit = 8;
  const dataUser = localStorage.getItem("dataUser");
  const token = localStorage.getItem("token");

  useEffect(() => {
    getdataMovie();
  }, []);

  useEffect(() => {
    getdataMovie();
  }, [page]);

  const getdataMovie = async () => {
    try {
      console.log("jalan");
      await dispatch(getDataMovie(page, limit, sort, dataRelease, search));
    } catch (error) {
      console.log(error.response);
    }
  };

  const setUpdate = async (data) => {
    console.log(data);
    const durationHour = data.duration.split("h")[0];
    const durationMinute = data.duration.split("h")[1].split("m")[0];
    setForm({
      ...form,
      name: data.name,
      category: data.category,
      image: data.image,
      releaseDate: moment(data.releaseDate).format("YYYY-MM-DD"),
      casts: data.casts,
      director: data.director,
      durationHour: durationHour,
      durationMinute: durationMinute,
      synopsis: data.synopsis,
    });
    setIdMovie(data.id);
    setIsUpdate(true);
  };
  const handleChangeForm = async (event) => {
    event.preventDefault();
    const { name, value, files } = event.target;
    if (name === "image") {
      await setForm({ ...form, [name]: files[0] });
      await setImage(URL.createObjectURL(files[0]));
    } else {
      await setForm({ ...form, [name]: value });
    }
  };

  const hiddenFileInput = React.useRef(null);
  const handleClickUpdateImage = (event) => {
    event.preventDefault();
    hiddenFileInput.current.click();
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const newForm = {
        ...form,
        duration: `${form.durationHour}h ${form.durationMinute}m`,
      };
      console.log(form.casts);
      console.log(newForm);
      const formData = new FormData();
      for (const data in newForm) {
        formData.append(data, newForm[data]);
      }
      for (const data of formData.entries()) {
        console.log(data[0] + ", " + data[1]);
        // name, "Bagus"
      }
      await dispatch(postMovie(formData));
      setPage(1);
      getdataMovie();
      await setImage(null);
      resetForm();
      alert("Create Movie Success");
    } catch (error) {
      console.log(error.response);
      alert(`Create Movie Failed`);
    }
  };

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      console.log(idMovie);
      const newForm = {
        ...form,
        duration: `${form.durationHour}h ${form.durationMinute}m`,
      };
      const formData = new FormData();
      for (const data in newForm) {
        formData.append(data, newForm[data]);
      }
      for (const data of formData.entries()) {
        console.log(data[0] + ", " + data[1]);
      }
      await dispatch(updateMovie(idMovie, formData));
      setPage(1);
      getdataMovie();
      setIsUpdate(false);
      resetForm();
      alert("Update Movie Success");
    } catch (error) {
      console.log(error.response);
      alert(`Update Movie Failed ${error}`);
    }
  };
  const handleDelete = async (id) => {
    try {
      if (window.confirm("You want to delete ?")) {
        await dispatch(deleteMovie(id));
        await setPage(1);
        getdataMovie();
        alert("Delete Movie Success");
      }
    } catch (error) {
      console.log(error);
      alert(`Delete Movie Failed ${error}`);
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      category: "",
      image: "",
      releaseDate: "",
      casts: "",
      director: "",
      durationHour: "",
      durationMinute: "",
      synopsis: "",
    });
  };

  const handlePagination = (data) => {
    setPage(data.selected + 1);
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
                  {image ? (
                    image && <img src={image} alt="" />
                  ) : (
                    <img
                      src={
                        form.image
                          ? `${process.env.REACT_APP_CLOUDINARY}${form.image}`
                          : "https://www.a1hosting.net/wp-content/themes/arkahost/assets/images/default.jpg"
                      }
                      alt="movie"
                    />
                  )}

                  <input
                    type="file"
                    ref={hiddenFileInput}
                    name="image"
                    onChange={handleChangeForm}
                    style={{ display: "none" }}
                  />
                  <button onClick={handleClickUpdateImage}>Change</button>
                </div>
              </div>
              <div className={styles.main__form__up__middle}>
                <div className={`mb-3`}>
                  <label for="movieName" className={`form-label`}>
                    Movie Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChangeForm}
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
                    name="director"
                    onChange={(event) => handleChangeForm(event)}
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
                    type="date"
                    name="releaseDate"
                    onChange={(event) => handleChangeForm(event)}
                    value={form.releaseDate}
                    // "2013-01-08"
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
                    name="category"
                    onChange={(event) => handleChangeForm(event)}
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
                    name="casts"
                    onChange={(event) => handleChangeForm(event)}
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
                      type="tel"
                      name="durationHour"
                      onChange={(event) => handleChangeForm(event)}
                      value={form.durationHour}
                      className={`form-control ${styles.form__control}`}
                      id="durationHour"
                      placeholder="Duration Hour"
                      required
                    />
                  </div>
                  <div className={`mb-3`}>
                    <label for="durationMinute" className={`form-label`}>
                      Duration Minute
                    </label>
                    <input
                      type="tel"
                      name="durationMinute"
                      onChange={(event) => handleChangeForm(event)}
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
              <textarea
                type="textarea"
                name="synopsis"
                id="synopsis"
                className={`form-control ${styles.form__control}`}
                placeholder="Synopsis"
                value={form.synopsis}
                onChange={(event) => handleChangeForm(event)}
              />
            </div>
            <div className={styles.main__form__down}>
              <button onClick={resetForm}>reset</button>
              <button onClick={isUpdate ? handleUpdate : handleSubmit}>
                {isUpdate ? "Update" : "Submit"}
              </button>
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
                        // handleDetail={handleDetailMovie}
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
      <Footer />
    </>
  );
}

export default Home;
