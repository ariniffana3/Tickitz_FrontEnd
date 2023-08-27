import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.css";
import axios from "../../utils/axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import OrderHistory from "../../components/OrderHistory";
import { dataUser } from "../../stores/actions/user";

import { useNavigate } from "react-router-dom";

function Profile(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isHistory, setIsHistory] = useState(false);
  const [dataHistory, setDataHistory] = useState([]);
  const data = useSelector((state) => state.user.data);
  const [form, setForm] = useState({ ...data });
  const [formPassword, setFormPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [formImage, setFormImage] = useState({});

  useEffect(() => {
    getdataUser();
    getDataHistory();
  }, []);

  const getdataUser = async () => {
    try {
      console.log("get data user id");
      let id = localStorage.getItem("dataUser");
      id = JSON.parse(id).id;
      const result = await dispatch(dataUser(id));
      console.log("result", result);
    } catch (error) {
      console.log(error);
    }
  };
  const getDataHistory = async () => {
    try {
      let id = localStorage.getItem("dataUser");
      id = JSON.parse(id).id;
      const result = await axios.get(`booking/user/${id}`);
      console.log(result);
      setDataHistory(result.data.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleAccount = async (event) => {
    await setForm({ ...form, [event.target.name]: event.target.value });
  };
  const handlePassword = async (event) => {
    await setFormPassword({
      ...formPassword,
      [event.target.name]: event.target.value,
    });
  };
  const handleUpdateProfile = async (e) => {
    try {
      e.preventDefault();
      let id = localStorage.getItem("dataUser");
      id = JSON.parse(id).id;
      await axios.patch(`user/profile/${id}`, form);
      await getdataUser();
      alert("Success Update");
    } catch (error) {
      console.log(error);
      alert("Failed to Update");
    }
  };
  const handleUpdatePassword = async (e) => {
    try {
      e.preventDefault();
      console.log(formPassword);
      let id = localStorage.getItem("dataUser");
      id = JSON.parse(id).id;
      const result = await axios.patch(`user/password/${id}`, formPassword);
      alert("Password Updated");
    } catch (error) {
      console.log(error.response.data.msg);
      alert(`Failed to Update Password ${error.response.data.msg}`);
    }
  };

  const hiddenFileInput = React.useRef(null);

  const handleClickUpdateImage = (event) => {
    event.preventDefault();
    hiddenFileInput.current.click();
  };
  const handleChangeImage = async (event) => {
    try {
      console.log("handle change image berjalan");
      const formImage = { image: event.target.files[0] };
      console.log("set form image diperbaharui");
      const formData = new FormData();
      for (const data in formImage) {
        formData.append(data, formImage[data]);
      }
      console.log(formData);
      let id = localStorage.getItem("dataUser");
      id = JSON.parse(id).id;
      const result = await axios.patch(`user/image/${id}`, formData);
      console.log("image updated");
      await getdataUser();
      alert("Update Image Success");
      // await setFormImage({});
    } catch (error) {
      console.log(error.response.data.msg);
      alert(`Update Image Failed ${error.response.data.msg}`);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };
  const handleTicket = (data) => {
    navigate("/Ticket");
  };

  return (
    <div>
      <Header />
      <div className={styles.main}>
        <div className={styles.main__left}>
          <div className={styles.image__container}>
            <img
              src={
                data
                  ? `${process.env.REACT_APP_CLOUDINARY}${data.image}`
                  : "https://www.a1hosting.net/wp-content/themes/arkahost/assets/images/default.jpg"
              }
              alt=""
              className={styles.image}
            />
          </div>
          <p>{`${data.firstName} ${data.lastName}`}</p>
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={handleChangeImage}
            style={{ display: "none" }}
          />
          <div>
            <button
              className={styles.button__account}
              onClick={handleClickUpdateImage}
            >
              Update Image
            </button>
            <button
              className={styles.button__account__logout}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
        <div className={styles.main__right}>
          <div className={styles.main__menu}>
            <p
              onClick={() => setIsHistory(false)}
              className={isHistory ? styles.p : styles.main__menu__outline}
            >
              Account
            </p>
            <p
              onClick={() => setIsHistory(true)}
              className={isHistory ? styles.main__menu__outline : styles.p}
            >
              History
            </p>
          </div>
          {isHistory ? (
            <div>
              {dataHistory.map((item) => (
                <OrderHistory
                  key={item.id}
                  data={item}
                  handleTicket={handleTicket}
                />
              ))}
            </div>
          ) : (
            <div>
              <div className={styles.main__profile}>
                <p>Details Information</p>
                <hr />
                <br />
                <form>
                  <div className={styles.main__profile__form}>
                    <div className={styles.main__profile__1}>
                      <label for="firstName">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={form.firstName}
                        onChange={handleAccount}
                        className={`form-control ${styles.form__control}`}
                        required
                      />
                      <label for="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={form.email}
                        onChange={handleAccount}
                        className={`form-control ${styles.form__control}`}
                        required
                        disabled
                      />
                    </div>
                    <div className={styles.main__profile__2}>
                      <label for="lastName">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={form.lastName}
                        onChange={handleAccount}
                        className={`form-control ${styles.form__control}`}
                        required
                      />
                      <label for="noTelp">Telephone</label>
                      <div className={`input-group-text ${styles.group__text}`}>
                        <div
                          className={styles.group__text__first}
                        >{` +62 `}</div>
                        <input
                          type="tel"
                          name="noTelp"
                          id="noTelp"
                          value={form.noTelp}
                          onChange={handleAccount}
                          className={`form-control ${styles.form__control__telp}`}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    className={styles.button__account}
                    onClick={handleUpdateProfile}
                  >
                    Update
                  </button>
                </form>
              </div>
              <div className={styles.main__password}>
                <p>Account And Privacy</p>
                <hr />
                <br />
                <form onSumbit={handleUpdatePassword}>
                  <div className={styles.main__profile__form}>
                    <div className={styles.main__profile__1}>
                      <label for="newPassword">New Password</label>
                      <input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        onChange={handlePassword}
                        className={`form-control ${styles.form__control}`}
                        required
                      />
                    </div>
                    <div className={styles.main__profile__2}>
                      <label for="confirm">Confirm</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirm"
                        onChange={handlePassword}
                        className={`form-control ${styles.form__control}`}
                        required
                      />
                    </div>
                  </div>
                  <button
                    className={styles.button__account}
                    onClick={handleUpdatePassword}
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Profile;
