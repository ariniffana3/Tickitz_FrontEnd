import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import styles from "./index.module.css";

function Profile() {
  const handleUpdateProfile = () => {};
  const handleUpdatePassword = () => {};

  return (
    <div>
      <Header />
      <div className={styles.main}>
        <div className={styles.main__left}>
          <div className={styles.image__container}>
            <img
              src="/img/signUp/tickitz 1.png"
              alt=""
              className={styles.image}
            />
          </div>
          <p>Name Here</p>
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
                    className={`form-control ${styles.form__control}`}
                    required
                  />
                  <label for="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
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
                    className={`form-control ${styles.form__control}`}
                    required
                  />
                  <label for="noTelp">Telephone</label>
                  <input
                    type="tel"
                    name="noTelp"
                    id="noTelp"
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
