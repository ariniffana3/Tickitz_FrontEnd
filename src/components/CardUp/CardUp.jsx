import React from "react";
import styles from "../../pages/Home/index.module.css";

function CardUp(props) {
  const { id, name, category, image } = props.data;
  return (
    <>
      <div className={styles.main1__img__hover}>
        <img
          src={
            image
              ? `${process.env.REACT_APP_CLOUDINARY}${image}`
              : "https://www.a1hosting.net/wp-content/themes/arkahost/assets/images/default.jpg"
          }
          alt="movie"
        />
        <div
          className={`${styles.main1__img__desc} ${styles.hover} ${styles.hover__desc}`}
        >
          <h2>{name}</h2>
          <h3>{category}</h3>
        </div>
        <button className={styles.hover} onClick={() => props.handleDetail(id)}>
          Details
        </button>
      </div>
    </>
  );
}

CardUp.defaultProps = {
  category: "Default Category",
  data: {
    id: "",
    name: "",
    category: "",
  },
};

export default CardUp;
