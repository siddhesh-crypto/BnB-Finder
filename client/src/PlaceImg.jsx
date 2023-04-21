import React from "react";

export default function PlaceImg({ place ,  index=0 , className=null}) {

    if(!place.photos?.length){
        return 'Loading'
    }

    if(!className){
        className=" object-cover "
    }

  return (
    <div>
      {place.photos.length > 0 && (
        <img
          className="object-cover aspect-square w-40 h-30" 
          src={"http://localhost:4000/uploads/" + place.photos[0]}
          alt=""
        />
      )}
    </div>
  );
}
