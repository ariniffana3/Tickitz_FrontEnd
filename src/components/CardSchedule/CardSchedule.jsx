import React, { useState } from "react";
import styles from "../../pages/detail/index.module.css";
import { useNavigate } from "react-router-dom";
import moment from "moment";

function CardSchedule(props) {
  console.log(props);
  let { id, premiere, price, location, time } = props.data;
  const timeDefault = [
    "08:30am",
    "10:00am",
    "12:00pm",
    "02:00pm",
    "04:00pm",
    "06:00pm",
    "08:00pm",
  ];
  time = time.split("");
  time.pop();
  time.shift();
  time = time.join("");
  time = time.split(",");

  return (
    <>
      <div className={styles.section__cinemaBox__cinema}>
        <div className={styles.section__cinemaBox__img}>
          <img
            src={
              premiere === "CineOne21"
                ? "/img/Home/Vector-1.png"
                : premiere === "Hiflix"
                ? "/img/Home/Vector-2.png"
                : premiere === "Ebv.Id"
                ? "/img/Home/Vector.png"
                : ""
            }
            alt=""
            className={styles.section__img}
          />
        </div>
        <div className={styles.section__cinemaBox__title}>
          <h3>{premiere}</h3>
          <h4>{location}</h4>
        </div>
      </div>
      <hr />
      <div className={styles.section__cinemaBox__time}>
        {time.map((itemDefault) => (
          <div
            key={itemDefault}
            className={
              itemDefault === props.dataOrder.time &&
              id === props.dataOrder.idOrder
                ? styles.purple
                : styles.dark__grey
            }
            onClick={() =>
              props.changeDataOrder({ ...props.data, time: itemDefault })
            }
            disabled={props.isPageManageSchedule ? true : false}
          >
            {itemDefault}
          </div>
        ))}
      </div>
      <div className={styles.section__cinemaBox__price}>
        <p>Price</p>
        <p>{price} IDR/seat</p>
      </div>
      {props.isPageManageSchedule ? (
        <>
          {" "}
          <button onClick={props.handleDelete}>Delete</button>{" "}
          <button onClick={props.setUpdate}>Update</button>
        </>
      ) : (
        <button
          className="btn btn-primary"
          disabled={id !== props.dataOrder.idOrder ? true : false}
          onClick={props.handleOrder}
        >
          Book Now
        </button>
      )}
    </>
  );
}

CardSchedule.defaultProps = {
  category: "Default Category",
  data: {
    id: "",
    name: "",
    category: "",
  },
};

export default CardSchedule;
