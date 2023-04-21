import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import AddressLink from "../AddressLink";

export default function PlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) {
    return <div>Loading...</div>;
  }

  

  return (
    <div className="mt-8  -mx-8 px-8 py-8 placeholder-sky-400 rounded-2xl">
      <h1 className="text-3xl ">{place.title}</h1>
      
      <AddressLink>{place.address}</AddressLink>

      <PlaceGallery place={place}/>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 ">
        <div className="my-10">
          <div className="my-4">
            <h2 className="font-semibold text-2xl mb-5">Description</h2>
            {place.description}
          </div>

          <div className="mt-10">
            <>Check in: </>
            {place.checkIn}
            <br />
          </div>
          <div>
            <>Check out: </>
            {place.checkOut}
            <br />
          </div>
          <div>
            <>Max Guests: </>
            {place.maxGuests}
            <br />
          </div>
        </div>

        <BookingWidget place={place} />
      </div>
      <div>
        <h2 className="font-semibold text-2xl">Extra Info</h2>
      </div>
      <div className="text-lg text-black my-4 ">{place.extraInfo}</div>
    </div>
  );
}
