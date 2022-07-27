import React from "react";

export default function OrderHistory(props) {
  const { movie, date, status, premiere } = props.data;
  return (
    <div>
      <div>
        <div>
          <p>{date}</p>
          <p>{movie}</p>
        </div>
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
      <hr />
      <div>
        <button>{status}</button>
        <p>see details</p>
      </div>
    </div>
  );
}
