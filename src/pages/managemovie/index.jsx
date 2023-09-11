import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import CardDown from "../../components/CardDown/CardDown";
import Pagination from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import {
  getDataMovie,
  postMovie,
  updateMovie,
  deleteMovie,
} from "../../stores/actions/movieviewall";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import moment from "moment";

function Home() {
  document.title = "Manage Movie";
  const dispatch = useDispatch();
  const [dataRelease, setDataRelease] = useState("");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("name");
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({});
  const [image, setImage] = useState(null);
  const [idMovie, setIdMovie] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const isPageManageMovie = true;
  const movie = useSelector((state) => state.movie);
  const limit = 8;

  useEffect(() => {
    getdataMovie();
  }, []);

  useEffect(() => {
    getdataMovie();
  }, [page, sort, search]);

  const getdataMovie = async () => {
    try {
      await dispatch(getDataMovie(page, limit, sort, dataRelease, search));
    } catch (error) {
      console.log(error.response);
    }
  };

  const setUpdate = async (data) => {
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
    hiddenFileInput.current.click();
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const newForm = {
        ...form,
        duration: `${form.durationHour}h ${form.durationMinute}m`,
      };
      const formData = new FormData();
      for (const data in newForm) {
        formData.append(data, newForm[data]);
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
      const newForm = {
        ...form,
        duration: `${form.durationHour}h ${form.durationMinute}m`,
      };
      const formData = new FormData();
      for (const data in newForm) {
        formData.append(data, newForm[data]);
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
    setImage("");
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
            <p>Form Movie</p>
          </div>
        </div>
        <div className={styles.main__form}>
          <form action="">
            <div className={styles.main__form__up}>
              <div
                className={`${styles.main__form__up__left} ${styles.main__img}`}
              >
                <div
                  className={styles.main__img__img}
                  onClick={handleClickUpdateImage}
                >
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
                    accept=".jpg, .png, .jpeg"
                    ref={hiddenFileInput}
                    name="image"
                    onChange={handleChangeForm}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
              <div className={styles.main__form__up__middle}>
                <div className={`mb-3 ${styles.form}`}>
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
                <div className={`mb-3 ${styles.form}`}>
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
                <div className={`mb-3 ${styles.form}`}>
                  <label for="releaseDate" className={`form-label`}>
                    Release Date
                  </label>
                  <input
                    type="date"
                    name="releaseDate"
                    onChange={(event) => handleChangeForm(event)}
                    value={form.releaseDate}
                    className={`form-control ${styles.form__control}`}
                    id="releaseDate"
                    placeholder="Release Date"
                    required
                  />
                </div>
              </div>
              <div className={styles.main__form__up__right}>
                <div className={`mb-3 ${styles.form}`}>
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
                <div className={`mb-3 ${styles.form}`}>
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
                  <div className={`mb-3 ${styles.form__duration}`}>
                    <label for="durationHour" className={`form-label`}>
                      Duration Hour
                    </label>
                    <input
                      type="number"
                      name="durationHour"
                      onChange={(event) => handleChangeForm(event)}
                      value={form.durationHour}
                      className={`form-control ${styles.form__control} ${styles.number}`}
                      id="durationHour"
                      placeholder="Duration Hour"
                      required
                    />
                  </div>
                  <div className={`mb-3 ${styles.form__duration}`}>
                    <label for="durationMinute" className={`form-label`}>
                      Duration Minute
                    </label>
                    <input
                      type="number"
                      name="durationMinute"
                      onChange={(event) => handleChangeForm(event)}
                      value={form.durationMinute}
                      className={`form-control ${styles.form__control} ${styles.number}`}
                      id="durationMinute"
                      placeholder="Duration Minute"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`${styles.main__form__middle} ${styles.main__synopsis} ${styles.form}`}
            >
              <label for="synopsis" className={`form-label`}>
                Synopsis
              </label>
              <textarea
                type="textarea"
                name="synopsis"
                id="synopsis"
                className={`form-control ${styles.form__control} ${styles.textarea}`}
                placeholder="Synopsis"
                value={form.synopsis}
                onChange={(event) => handleChangeForm(event)}
              />
            </div>
            <div className={styles.main__form__down}>
              <button className={styles.button} onClick={resetForm}>
                reset
              </button>
              <button
                className={styles.button}
                onClick={isUpdate ? handleUpdate : handleSubmit}
              >
                {isUpdate ? "Update" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </main>
      <main className={`${styles.main1} ${styles.addition__main2}`}>
        <div className={styles.main1__title}>
          <div className={styles.main1__title__p1}>
            <p>
              <a href=""> Data Movie</a>
            </p>
          </div>
          <div className={styles.main1__title__right}>
            <select name="sort" id="" onChange={handleSort}>
              <option value="name">Sort by</option>
              <option value="name ASC">Name a-z</option>
              <option value="name DESC">Name z-a</option>
              <option value="releaseDate DESC">Release Date</option>
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
                      <CardDown
                        data={item}
                        setUpdate={setUpdate}
                        handleDelete={handleDelete}
                        isPageManageMovie={isPageManageMovie}
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
