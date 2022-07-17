import React from "react";
import styles from "../../pages/Home/index.module.css";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const signIn = () => {
    navigate("/signin");
  };
  return (
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
        <div className={styles.header__hamburger} onclick="showMenu">
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
  );
}
