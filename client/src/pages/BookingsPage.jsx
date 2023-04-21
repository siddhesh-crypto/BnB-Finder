import React, { useEffect, useState } from "react";
import AccountNav from "../AccountNav";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { differenceInCalendarDays, format } from "date-fns";
import { Link } from "react-router-dom";
import BookingDates from "../BookingDates";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  });
  return (
    <div>
      <AccountNav />
      <div className="">
        {bookings.length > 0 &&
          bookings.map((booking) => (
            <Link to={`/account/bookings/${booking._id}`} 
            className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden border border-gray-300 my-5" >
              <div className="w-48 ">
                <PlaceImg place={booking.place} className="aspect-square " />
              </div>
              
              <BookingDates booking={booking}/>
            </Link>
          ))}
      </div>
    </div>
  );
}
