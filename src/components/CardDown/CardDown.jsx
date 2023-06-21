import React from "react";
import styles from "../../pages/home/index.module.css";

function Card2(props) {
  const { id, name, category, image } = props.data;
  return (
    <>
      {/* <div className={`${styles.main1__img} ${styles.addition__main1__img}`}>
              <img
                src="img/Home/Rectangle 139-1.png"
                alt="movie"
              />
              <div className={styles.main1__img__desc}>
                <h2>Tes</h2>
                <h3>lorem ipsum sit dolor</h3>
              </div>
              <button>Details</button>
            </div> */}
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
            <button onClick={() => props.setUpdate(props.data)}>update</button>
            <button onClick={() => props.handleDelete(id)}>delete</button>
          </>
        ) : (
          <button onClick={() => props.handleDetail(id)}>Details</button>
        )}
      </div>

      {/* <div className="card">
          <img
            src={
              image
                ? `https://res.cloudinary.com/dd1uwz8eu/image/upload/v1648786582/${image}`
                : "https://www.a1hosting.net/wp-content/themes/arkahost/assets/images/default.jpg"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{category}</p>
            <button className="btn btn-primary" onClick={() => props.handleDetail(id)}>
              Detail
            </button>
          </div>
        </div> */}
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
