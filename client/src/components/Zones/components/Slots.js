import React from "react";

const Slots = ({ slots, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <ul className="list-group mb-4">
      {slots.map((slot) => (
        <li key={slot.id} className="list-group-item">
          {slot.title}
        </li>
      ))}
    </ul>
  );
};

export default Slots;
