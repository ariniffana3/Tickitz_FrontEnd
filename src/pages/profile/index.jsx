import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { dataUser } from "../../stores/actions/user";
import styles from "./index.module.css";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isHistory, setIsHistory] = useState(false);
  const [dataHistory, setDatahistory] = useState([]);
  const data = useSelector((state) => state.user.data);
  const [form, setForm] = useState({ ...dataUser });
  const [formPassword, setFormPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    getdataUser();
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

  const handleUpdateProfile = async (event) => {
    try {
      let id = localStorage.getItem("dataUser");
      id = JSON.parse(id).id;
      const result = await axios.patch(`user/profile/${id}`, form);
      await getdataUser();
      alert("Success Update");
    } catch (error) {
      console.log(error);
      alert("Failed to Update");
    }
  };

  const handleUpdatePassword = async (event) => {
    try {
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

  const handleAccount = async (event) => {
    await setForm({ ...form, [event.target.name]: event.target.value });
  };
  const handlePassword = async (event) => {
    await setFormPassword({
      ...formPassword,
      [event.target.name]: event.target.value,
    });
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
          <button>Update Image</button>
        </div>
        <div className={styles.main__right}>
          <div className={styles.main__menu}>
            <p>Account</p>
            <p>History</p>
          </div>
          <div className={styles.main__profile}>
            <p>Details Information</p>
            <hr />
            <br />
            <form onSumbit={handleUpdateProfile}>
              <div className={styles.main__profile__form}>
                <div className={styles.main__profile__1}>
                  <label for="firstName">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={data.firstName}
                    onChange={handleAccount}
                    className={`form-control ${styles.form__control}`}
                    required
                  />
                  <label for="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={data.email}
                    onChange={handleAccount}
                    className={`form-control ${styles.form__control}`}
                    required
                  />
                </div>
                <div className={styles.main__profile__2}>
                  <label for="lastName">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={data.lastName}
                    onChange={handleAccount}
                    className={`form-control ${styles.form__control}`}
                    required
                  />
                  <label for="noTelp">Telephone</label>
                  <input
                    type="tel"
                    name="noTelp"
                    id="noTelp"
                    value={data.noTelp}
                    onChange={handleAccount}
                    className={`form-control ${styles.form__control}`}
                    required
                  />
                </div>
              </div>
              <button type="submit">Update</button>
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

              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Profile;
