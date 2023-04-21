import React, { useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function BookingWidget({ place }) {
  const [checkIn, setcheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect,setRedirect] = useState('')
  const {user} = useContext(UserContext)

  useEffect(()=>{
    if(user){
      setName(user.name)
    }
  },[user])

  let numberofNights = 0;
  if (checkIn && checkOut) {
    numberofNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  async function bookThisPlace() {
    const data = {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      place: place._id,
      price: numberofNights * place.price,
    };
    const response = await axios.post("/bookings", data);
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`)

    
  }

  if(redirect){
    return <Navigate to={redirect}/>
  }

  return (
    <div className="bg-white  p-2 shadow rounded-2xl my-12">
      <div className="text-2xl text-center mb-2">
        {" "}
        Price: ₹{place.price} / night
      </div>
      <div className="flex gap-2">
        <div className="my-4 border  p-2 rounded-2xl mb-4">
          <label>Check in: </label>
          <input
            type="date"
            value={checkIn}
            onChange={(ev) => setcheckIn(ev.target.value)}
          />
        </div>

        <div className="my-4 border  p-2 rounded-2xl mb-4">
          <label>Check Out: </label>
          <input
            type="date"
            value={checkOut}
            onChange={(ev) => setCheckOut(ev.target.value)}
          />
        </div>
      </div>

      <div className="my-4 border  p-2 rounded-2xl mb-4">
        <label>Number of Guests</label>
        <input
          type="number"
          value={numberOfGuests}
          onChange={(ev) => setNumberOfGuests(ev.target.value)}
        />
      </div>
      {numberofNights > 0 && (
        <div className="my-4 border  p-2 rounded-2xl mb-4">
          <label>Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />

          <label>Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(ev) => setPhone(ev.target.value)}
          />
        </div>
      )}
      <button className="primary mt-4" onClick={bookThisPlace}>
        Book This Place
        <br />
        {numberofNights > 0 && (
          <>
            <span> ₹{numberofNights * place.price}</span>
          </>
        )}
      </button>
    </div>
  );
}
