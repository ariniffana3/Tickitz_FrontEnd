import React from "react";
import styles from "../../pages/profile/index.module.css";

export default function OrderHistory(props) {
  const {
    name,
    dateBooking,
    statusUsed,
    premiere,
    timeBooking,
    category,
    totalTicket,
    seat,
    totalPayment,
  } = props.data;
  return (
    <div className={styles.history__card}>
      <div className={styles.history__card__up}>
        <div className={styles.history__card__up__left}>
          <p>{dateBooking}</p>
          <p>{name}</p>
        </div>
        <div className={styles.history__card__up__right}>
          <img
            src={
              premiere === "CineOne21"
                ? "img/Home/Vector-1.png"
                : premiere === "Hiflix"
                ? "img/Home/Vector-2.png"
                : premiere === "Ebv.Id"
                ? "img/Home/Vector.png"
                : ""
            }
            alt=""
          />
        </div>
      </div>
      <hr />
      <div className={styles.history__card__down}>
        <button
          className={
            statusUsed === "active"
              ? styles.history__card__down__active
              : styles.history__card__down__nonActive
          }
        >
          {statusUsed}
        </button>
        <p>see details</p>
      </div>
    </div>
  );
}
