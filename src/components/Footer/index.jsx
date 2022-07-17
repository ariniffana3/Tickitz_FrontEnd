import React from "react";
import styles from "../../pages/payment/index.module.css";

export default function Footer() {
  return (
    <footer>
      <div className={styles.footer__ending}>
        <div className={styles.footer__ending__tickitz}>
          <img src="/img/Home/vector tickitz 2.png" alt="" />
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
              List Movie
            </a>
          </div>
        </div>
        <div className={styles.footer__ending__sponsor}>
          <h3>Our Sponsor</h3>
          <div className={styles.footer__ending__sponsor__list}>
            <div>
              <img src="/img/Home/Vector.png" alt="" />
            </div>
            <div>
              <img src="/img/Home/Vector-1.png" alt="" />
            </div>
            <div>
              <img src="/img/Home/Vector-2.png" alt="" />
            </div>
          </div>
        </div>
        <div className={styles.footer__ending__socialMedia}>
          <h3>Follow us</h3>
          <div className={styles.footer__ending__socialMedia__list}>
            <div>
              <img src="/img/Home/Vector-3.png" alt="" />
              <a href=""> Tickitz Cinema id</a>
            </div>
            <div>
              <img src="/img/Home/bx_bxl-instagram.png" alt="" />
              <a href="">tickitz.id</a>
            </div>
            <div>
              <img src="/img/Home/Vector-6.png" alt="" />
              <a href=""> tickitz.id</a>
            </div>
            <div>
              <img src="/img/Home/Group.png" alt="" />
              <a href="">Tickitz Cinema id</a>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footer__copyright}>
        © 2020 Tickitz. All Rights Reserved
      </div>
    </footer>
  );
}
