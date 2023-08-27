import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./index.module.css";

function TicketResult() {
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
                  src="img/signUp/tickitz 1.png"
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
                      <p className={styles.content}>Spider-Man</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className={styles.title}>Date</p>
                      <p className={styles.content}></p>
                    </td>
                    <td>
                      <p className={styles.title}>Time</p>
                      <p className={styles.content}></p>
                    </td>
                    <td>
                      <p className={styles.title}>Category</p>
                      <p className={styles.content}></p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p className={styles.title}>Count</p>
                      <p className={styles.content}></p>
                    </td>
                    <td>
                      <p className={styles.title}>Seats</p>
                      <p className={styles.content}></p>
                    </td>
                    <td>
                      <p className={styles.title}>Price</p>
                      <p className={styles.content}></p>
                    </td>
                  </tr>
                </table>
                {/* <div className={styles.main__ticket__left__c1}>
                  
                </div>
                <div className={styles.main__ticket__left__c2}>
                  <div>
                    <p>Date</p>
                    <p></p>
                  </div>
                  <div>
                    <p>Time</p>
                    <p></p>
                  </div>
                  <div>
                    <p>Category</p>
                    <p></p>
                  </div>
                </div>
                <div className={styles.main__ticket__left__c3}>
                  <div>
                    <p>Count</p>
                    <p></p>
                  </div>
                  <div>
                    <p>Seats</p>
                    <p></p>
                  </div>
                  <div>
                    <p>Price</p>
                    <p></p>
                  </div>
                </div> */}
              </div>
            </div>
            <div className={styles.main__ticket__right}>
              <div className={styles.main__ticket__right__header}>
                <img
                  src="img/signUp/tickitz 1.png"
                  alt="tickitz"
                  className={styles.img2}
                />
              </div>
              <div>
                <div>
                  <img src="" alt="" />
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
