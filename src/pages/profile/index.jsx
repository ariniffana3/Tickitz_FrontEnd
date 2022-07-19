import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { dataUser } from "../../stores/actions/user";
import styles from "./index.module.css";
import axios from "../../utils/axios";
function Profile() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.user.data);
  // console.log(data);

  useEffect(() => {
    getDataUser();
  }, []);

  const getDataUser = async () => {
    try {
      let id = localStorage.getItem("dataUser");
      id = JSON.parse(id).id;
      // console.log(id);
      const result = await dispatch(dataUser(id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const result = await axios.patch("user/");
    } catch (error) {
      console.log(error);
      alert("error");
    }
  };
  const handleUpdatePassword = () => {};

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
                    className={`form-control ${styles.form__control}`}
                    required
                  />
                  <label for="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={data.email}
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
                    className={`form-control ${styles.form__control}`}
                    required
                  />
                  <label for="noTelp">Telephone</label>
                  <input
                    type="tel"
                    name="noTelp"
                    id="noTelp"
                    value={data.noTelp}
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
                    className={`form-control ${styles.form__control}`}
                    required
                  />
                </div>
                <div className={styles.main__profile__2}>
                  <label for="confirm">Confirm</label>
                  <input
                    type="password"
                    name="confirm"
                    id="confirm"
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
