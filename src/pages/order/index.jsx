import React, {useState, useEffect} from "react";
import  styles from "./index.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../utils/axios"
import Seat from "../../components/Seat"



function Order(){
  document.title = "Order";
  const { state } = useLocation();
  const navigate = useNavigate();
  // console.log(state);
//   dateBooking: "Apr 27th 22"
// idOrder: "2e671847-5ca1-4a30-a04d-1d4937a50e68"
// movieId: "1e06e6d3-0760-43bf-a977-25fc113ef927"
// movieName: "Sonic the Hedgehog 2"
// price: 35000
// time: "12:00pm"
    const listSeat = ["A", "B", "C", "D","E", "F", "G"];
    const [selectedSeat, setSelectedSeat] = useState([]);
    const [reservedSeat, setReservedSeat] = useState(["A1", "C2", "B11"]);
    const [bookedSeat,setBookedSeat] = useState([]);

    useEffect(() => {
      setBookedSeat(bookedSeat);
    }, [bookedSeat]);
    //   PROSES GET SEAT

    const handleSelectSeat = (seat) => {
      setBookedSeat([...bookedSeat,seat]);
      // console.log(seat);
      if (selectedSeat.includes(seat)) {
        const deleteSeat = selectedSeat.filter((el) => {
          return el !== seat;
        });
        setSelectedSeat(deleteSeat);
        setBookedSeat(deleteSeat);
      } else {
        setSelectedSeat([...selectedSeat, seat]);
      }
    };
    const Home=()=>{
      navigate("/home");
    }
    const handleOrder=()=>{
      navigate("/payment", {state: {...state}})
    }
    return(
      <>
      <header className={styles.order__header}>
      <div className={styles.header} id="header">
        <div className={styles.header__left}>
          <ul>
            <li className={styles.header__li}>
              <a href="" className={styles.header__li__link}>
                <img
                  src="/img/Home/vector tickitz 2.png"
                  alt="tickitz"
                  className={styles.header__img}
                />
              </a>
            </li>
            <li className={styles.header__li}>
              <a  className={`${styles.header__li__link}  ${styles.mobile__header__li}`} onClick={Home}>Home</a>
            </li>
            <li className={styles.header__li}>
              <a href="" 
              className={`${styles.header__li__link} ${styles.mobile__header__li}`}
              
                >List Movie</a
              >
            </li>
          </ul>
        </div>

        <div className={styles.header__right}>
          <div className={styles.header__hamburger} onClick="showMenu()">
            <div className={styles.header__hamburger__line}></div>
            <div className={styles.header__hamburger__line}></div>
            <div className={styles.header__hamburger__line}></div>
          </div>
          <div>
            <img
              src="/img/Vector.png"
              alt=""
              className={styles.header__right__desktop}
            />
          </div>

          <div className={`${styles.header__profile} ${styles.header__right__desktop}`}>
            <img src="/img/Ellipse 11.png" alt="" />
          </div>
        </div>
      </div>
      <div className={styles.header__menu} id="header__menu" style={{display: "none"}}>
        <div className={styles.header__menu__home}>Home</div>
        <div className={styles.header__menu__listMovie}>List Movie</div>
        <div className={styles.header__menu__signIn}>Sign In</div>
        <div className={styles.header__menu__copyright}>
          © 2020 Tickitz. All Rights Reserved
        </div>

        <script>
          {/* function showMenu() {
            let display = document.getElementById("header__menu");
            let header = document.getElementById("header");
            // if (display.style === "display: none") {
            display.style = "display: block";
            // header.style = "position: fixed";
            // console.log("oke");
            // } else
            // if (display.style === "display: block") {
            // display.style = "display: none";
            // header.style = "position: static";
            // console.log("okee");
            // }
            // console.log("oke");
          } */}
        </script>
      </div>
    </header>
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
            {/* <div className="main_seat_container">
              <p>screen</p>
            </div> */}
          <div className={`card ${styles.card}`}>
            <div className="card-body">
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
            </div>
          </div>
            {/* <img src="/img/Untitled.png" alt="" /> */}
          </div>
        </div>
      </div>
      <div className={styles.main__order}>
        <h3>Order Info</h3>
        <div className={styles.main__order__container}>
          <div className={styles.main__order__title}>
            <div className={styles.main__order__title__img}>
              <img src={state.premiere === "CineOne21"
                    ? "/img/Home/Vector-1.png" : state.premiere === "Hiflix"
                    ? "/img/Home/Vector-2.png" : state.premiere === "Ebv.Id"
                    ? "/img/Home/Vector.png" : '' } alt="" />
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
              <h4>{bookedSeat.map((i)=> `${i}, `)} </h4>
            </div>
          </div>
          <hr />
          <div className={styles.main__order__payment}>
            <h3>Total Payment</h3>
            <h4 >{bookedSeat.length * state.price} IDR</h4>
          </div>
        </div>
      </div>
      <div className={styles.main__seat__button}>
        <button onClick={Home}>Change your movie</button>
        <button onClick={handleOrder} >
          Checkout now
        </button>
      </div>
    </main>
    <footer>
      <div className={styles.footer__ending}>
        <div className={styles.footer__ending__tickitz}>
          <img src="/img/Home/vector tickitz 2.png" alt="" />
          <p>
            Stop waiting in line. Buy tickets <br />conveniently, watch movies
            quietly.
          </p>
        </div>
        <div className={styles.footer__ending__explore}>
          <h3>Explore</h3>
          <div className={styles.footer__ending__explore__list}>
            <a href="" className={styles.footer__ending__explore__list__1}><p>Home</p></a>
            <a href="" className={styles.footer__ending__explore__list__2}>List Movie</a>
          </div>
        </div>
        <div className={styles.footer__ending__sponsor}>
          <h3>Our Sponsor</h3>
          <div className={styles.footer__ending__sponsor__list}>
            <div><img src="/img/Home/Vector.png" alt="" /></div>
            <div><img src="/img/Home/Vector-1.png" alt="" /></div>
            <div><img src="/img/Home/Vector-2.png" alt="" /></div>
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
      <div className={styles.footer__copyright}>© 2020 Tickitz. All Rights Reserved</div>
    </footer>
    </>
    )
}

export default Order;