import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import styles from "./index.module.css";

function Profile() {
  const handleUpdateProfile = () => {};
  return (
    <div>
      <Header />
      <div className={styles.main}>
        <div className={styles.main__left}>
          <img
            src="/img/signUp/tickitz 1.png"
            alt=""
            className={styles.image}
          />
          <p>Name Here</p>
        </div>
        <div className={styles.main__right}>
          <div className={styles.main__profile}>
            <form onSumbit={handleUpdateProfile}>
              <input type="text" name="firstName" required />
              <input type="text" name="lastName" required />
              <input type="email" name="email" required />
              <input type="tel" name="noTelp" required />
              <button type="submit">Update Changes</button>
            </form>
          </div>
          <div className={styles.main__password}>
            <form onSumbit={handleUpdateProfile}>
              <input type="password" name="newPassword" required />
              <input type="password" name="confirm" required />
              <button type="submit">Update Changes</button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
export default Profile;
