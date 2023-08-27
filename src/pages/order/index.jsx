import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../utils/axios";
import Seat from "../../components/Seat";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function Order() {
  document.title = "Order";
  const { state } = useLocation();
  const navigate = useNavigate();
  const listSeat = ["A", "B", "C", "D", "E", "F", "G", " "];
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [reservedSeat, setReservedSeat] = useState(["A1", "C2", "B11"]);
  const [bookedSeat, setBookedSeat] = useState([]);

  useEffect(() => {
    setBookedSeat(bookedSeat);
  }, [bookedSeat]);

  const handleSelectSeat = (seat) => {
    setBookedSeat([...bookedSeat, seat]);
    if (selectedSeat.includes(seat)) {
      const leftoverSeat = selectedSeat.filter((el) => {
        return el !== seat;
      });
      setSelectedSeat(leftoverSeat);
      setBookedSeat(leftoverSeat);
    } else {
      setSelectedSeat([...selectedSeat, seat]);
    }
  };
  const Home = () => {
    navigate("/home");
  };
  const handleOrder = () => {
    const data = {
      ...state,
      seat: bookedSeat,
      totalPayment: bookedSeat.length * state.price,
    };
    console.log(data);
    navigate("/payment", { state: { ...data } });
  };
  return (
    <>
      <Header />
      <main className={styles.order__main}>
        <div className={styles.main__container1}>
          <div className={styles.main__title}>
            <h3>Movie Selected</h3>
            <div className={styles.main__title__container}>
              <h4>{state.movieName}</h4>
              <button onClick={Home}>Change movie</button>
            </div>
          </div>
          <div className={styles.main__seat}>
            <h3>Choose Your Seat</h3>
            <div className={styles.main__seat__container}>
              <div className={` ${styles.card__body}`}>
                <div className={styles.main__seat__container__screen}>
                  <p>Screen</p>
                  <div className={styles.main__seat__screen}></div>
                </div>
                {listSeat.map((item) => (
                  <div key={item}>
                    <Seat
                      rowSeat={item}
                      selectedSeat={handleSelectSeat}
                      reserved={reservedSeat}
                      selected={selectedSeat}
                    />
                  </div>
                ))}
                <div className={styles.main__seat__seating__key}>
                  <p className={styles.main__seat__seating__key__p}>
                    Seating Key
                  </p>
                  <div className={styles.seating__key__container}>
                    <div className={styles.seating__key__available}></div>
                    <p>Available</p>
                    <div className={styles.seating__key__selected}></div>
                    <p>Selected</p>
                    <div className={styles.seating__key__sold}></div>
                    <p>Sold</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.main__order}>
          <h3>Order Info</h3>
          <div className={styles.main__order__container}>
            <div className={styles.main__order__title}>
              <div className={styles.main__order__title__img}>
                <img
                  src={
                    state.premiere === "CineOne21"
                      ? "/img/Home/Vector-1.png"
                      : state.premiere === "Hiflix"
                      ? "/img/Home/Vector-2.png"
                      : state.premiere === "Ebv.Id"
                      ? "/img/Home/Vector.png"
                      : ""
                  }
                  alt=""
                />
              </div>
              <div className={styles.main__order__title_text}>
                <h4>{state.premiere} Cinema</h4>
              </div>
            </div>
            <div className={styles.main__order__info}>
              <div className={styles.main__order__info__1}>
                <h3>Movie selected</h3>
                <h4>{state.movieName}</h4>
              </div>
              <div className={styles.main__order__info__1}>
                <h3>{state.dateBooking}</h3>
                <h4>{state.time}</h4>
              </div>
              <div className={styles.main__order__info__1}>
                <h3>One ticket price</h3>
                <h4>{state.price} IDR</h4>
              </div>
              <div className={styles.main__order__info__1}>
                <h3>Seat choosed</h3>
                <h4>
                  {bookedSeat.map((i, index) =>
                    bookedSeat.length !== index + 1 ? `${i}, ` : `${i}`
                  )}{" "}
                </h4>
              </div>
            </div>
            <hr />
            <div className={styles.main__order__payment}>
              <h3>Total Payment</h3>
              <h4>{bookedSeat.length * state.price} IDR</h4>
            </div>
          </div>
        </div>
        <div className={styles.main__seat__button}>
          <button onClick={Home}>Change your movie</button>
          <button onClick={handleOrder}>Checkout now</button>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Order;
