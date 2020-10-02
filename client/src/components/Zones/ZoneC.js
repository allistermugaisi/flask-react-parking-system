import React, { useState, useEffect } from "react";
import Slots from "./components/Slots";
import Pagination from "./components/Pagination";
import axios from "axios";

const ZoneC = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setloading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [slotsPerPage] = useState(5);

  useEffect(() => {
    const fetchPosts = async () => {
      setloading(true);

      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setSlots(res.data);
      setloading(false);
    };

    fetchPosts();
  }, []);

  // Get current slots
  const indexOfLastSlot = currentPage * slotsPerPage;
  const indexOfFirstSlot = indexOfLastSlot - slotsPerPage;
  const currentSlots = slots.slice(indexOfFirstSlot, indexOfLastSlot);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">Zone C</h1>
      <Slots slots={currentSlots} loading={loading} />
      <Pagination
        slotsPerPage={slotsPerPage}
        totalSlots={slots.length}
        paginate={paginate}
      />
    </div>
  );
};

export default ZoneC;
