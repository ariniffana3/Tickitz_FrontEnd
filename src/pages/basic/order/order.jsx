import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Seat from "../../../components/basic/Seat";

export default function Order() {
  const { state } = useLocation();
  const listSeat = ["A", "B", "C"];
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [reservedSeat, setReservedSeat] = useState(["A1", "C2", "B11"]);

  //   PROSES GET SEAT

  const handleSelectSeat = (seat) => {
    console.log(seat);
    if (selectedSeat.includes(seat)) {
      const deleteSeat = selectedSeat.filter((el) => {
        return el !== seat;
      });
      setSelectedSeat(deleteSeat);
    } else {
      setSelectedSeat([...selectedSeat, seat]);
    }
  };

  const handleBooking = () => {
    console.log(state);
    console.log(selectedSeat);
  };

  return (
    <div className="text-center container">
      <h1>Order Page</h1>
      <hr />
      <div className="row">
        <div className="col-md-8">
          <div className="card">
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
          <button className="btn btn-primary" onClick={handleBooking}>
            Booking
          </button>
        </div>
        <div className="col-md-4">
          <div className="card">Order Info</div>
        </div>
      </div>
    </div>
  );
}
