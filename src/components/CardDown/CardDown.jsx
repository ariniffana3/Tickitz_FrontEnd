import React from "react";
import styles from "../../pages/Home/index.module.css";

function Card2(props) {
  const { id, name, category, image } = props.data;
  return (
    <>
      <div className={`${styles.main1__img} ${styles.addition__main1__img}`}>
        <img
          src={
            image
              ? `${process.env.REACT_APP_CLOUDINARY}${image}`
              : "https://www.a1hosting.net/wp-content/themes/arkahost/assets/images/default.jpg"
          }
          alt="movie"
        />
        <div className={styles.main1__img__desc}>
          <h2>{name}</h2>
          <h3>{category}</h3>
        </div>
        {props.isPageManageMovie ? (
          <>
            <button
              className={styles.main1__manageMovie__button1}
              onClick={() => props.setUpdate(props.data)}
            >
              update
            </button>
            <button
              className={styles.main1__manageMovie__button2}
              onClick={() => props.handleDelete(id)}
            >
              delete
            </button>
          </>
        ) : (
          <button onClick={() => props.handleDetail(id)}>Details</button>
        )}
      </div>
    </>
  );
}

Card2.defaultProps = {
  category: "Default Category",
  data: {
    id: "",
    name: "",
    category: "",
  },
};

export default Card2;
