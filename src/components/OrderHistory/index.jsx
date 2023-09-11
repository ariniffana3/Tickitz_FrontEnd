import React from "react";
import styles from "../../pages/profile/index.module.css";
import { useNavigate } from "react-router-dom";
export default function OrderHistory(props) {
  const {
    id,
    name,
    dateBooking,
    statusUsed,
    qrCode,
    premiere,
    timeBooking,
    category,
    totalTicket,
    seat,
    totalPayment,
  } = props.data;
  const navigate = useNavigate();
  const date = `${dateBooking} - ${timeBooking}`;
  const handleClickTicket = (id) => {
    navigate(`/ticketResult/${id}`);
  };
  return (
    <div className={styles.history__card}>
      <div className={styles.history__card__up}>
        <div className={styles.history__card__up__left}>
          <p>{date}</p>
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
          onClick={() => handleClickTicket(id)}
        >
          {statusUsed === "active" ? "Ticket In Active" : "Ticket Used"}
        </button>
        <p>see details</p>
      </div>
    </div>
  );
}
