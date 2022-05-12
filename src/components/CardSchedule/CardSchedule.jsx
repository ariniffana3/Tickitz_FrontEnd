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
  const item = ["08:30am", "10:00am", "12:00pm"];
  time = time.split("");
  time.pop();
  time.shift();
  time = time.join("");
  time = time.split(",");

  // const mapping =()=>{
  //   time.map((item)=>{ item !== itemDefault? styles.young__grey : itemDefault === clicking? styles.purle :styles.old__grey})
  // }
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
        {timeDefault.map((itemDefault) => (
          //  for(a=1;a<time.length;a++){
          // itemDefault == time.map((item)=> {return item}) ? console.log("berhasil"): console.log("2");
          //  }
          //  time.forEach((item)=>{

          <div
            key={itemDefault}
            // item !== itemDefault? styles.young__grey : itemDefault === clicking? styles.purle :styles.old__grey
            // //time.map((item)=> {if (itemDefault == item){return `${styles.dark__grey}` }
            // return `${styles.young__grey}`}
            // itemDefault == "08:30am" ? styles.dark__grey: styles.young__grey
            className={
              itemDefault === props.dataOrder.time &&
              id === props.dataOrder.idOrder
                ? styles.purple
                : styles.dark__grey
            }
            onClick={() =>
              props.changeDataOrder({ ...props.data, time: itemDefault })
            }
          >
            {itemDefault}
          </div>
          //  })
        ))}
      </div>
      <div className={styles.section__cinemaBox__price}>
        <p>Price</p>
        <p>{price} IDR/seat</p>
      </div>
      <button
        // className={`styles.button__book `}
        className="btn btn-primary"
        //id == dataOrder.idOrder ? : false
        disabled={id !== props.dataOrder.idOrder ? true : false}
        onClick={props.handleOrder}
      >
        Book Now
      </button>
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
