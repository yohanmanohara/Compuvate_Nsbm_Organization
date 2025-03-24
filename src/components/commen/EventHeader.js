import React from "react";
import './EventHeader.css'

export default function HeaderEvent(props) {
  return (
    <>
      <div className="event-header">
        <div className="container w-full h-full ">
          <div className="event-header-content">
            <div className=" ">
              <h1>{props.title}</h1>
              <p>{props.date}</p>
            </div>
          </div>
        </div>
        <div className="event-header-bg">
          <img src={props.image} alt="" />
        </div>
      </div>
    </>
  );
}
