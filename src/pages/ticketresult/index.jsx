import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./index.module.css";
import { useParams } from "react-router-dom";
import axios from "../../utils/axios";

function TicketResult() {
  const [data, setData] = useState({});
  const params = useParams();

  useEffect(() => {
    getBookingByBookingId();
  }, []);

  const getBookingByBookingId = async () => {
    try {
      const result = await axios.get(`booking/id/${params.id}`);
      setData(result.data.data[0]);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.main__container}>
          <p className={styles.main__title}>Proof of Payment</p>
          <div className={styles.main__ticket}>
            <div className={styles.main__ticket__left}>
              <div className={styles.main__ticket__left__header}>
                <img
                  src="/img/signUp/tickitz 1.png"
                  alt="tickitz"
                  className={styles.img1}
                />
                <p>Admit One</p>
              </div>
              <div className={styles.main__ticket__left__content}>
                <table>
                  <tr>
                    <td>
                      <p className={styles.title}>Movie</p>
                      <p className={styles.content}>
                        {data?.name ? data.name : ""}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className={styles.title}>Date</p>
                      <p className={styles.content}>
                        {data?.dateBooking ? data.dateBooking : ""}
                      </p>
                    </td>
                    <td>
                      <p className={styles.title}>Time</p>
                      <p className={styles.content}>
                        {data?.timeBooking ? data.timeBooking : ""}
                      </p>
                    </td>
                    <td>
                      <p className={styles.title}>Category</p>
                      <p className={styles.content}>
                        {data?.category ? data.category : ""}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className={styles.title}>Count</p>
                      <p className={styles.content}>
                        {data?.totalTicket ? data.totalTicket : ""}
                      </p>
                    </td>
                    <td>
                      <p className={styles.title}>Seats</p>
                      <p className={styles.content}>
                        {data?.seat ? data.seat : ""}
                      </p>
                    </td>
                    <td>
                      <p className={styles.title}>Price</p>
                      <p className={styles.content__price}>
                        {data?.totalPayment ? data.totalPayment : ""} IDR
                      </p>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <div className={styles.line}></div>
            <div className={styles.main__ticket__right}>
              <div className={styles.main__ticket__right__header}>
                <img
                  src="/img/signUp/tickitz 1.png"
                  alt="tickitz"
                  className={styles.img2}
                />
              </div>
              <div>
                <div>
                  {data?.qrCode ? (
                    <img
                      src={data.qrCode}
                      alt=""
                      className={styles.ticket__container__img}
                    />
                  ) : (
                    <div className={styles.ticket__container}>
                      <p>
                        {data?.statusUsed == "nonActive"
                          ? "Ticket Already Used"
                          : "Ticket Expired"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default TicketResult;
