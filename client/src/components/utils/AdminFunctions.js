import axios from "axios";

export const zoneFunc = async (newZone) => {
  return await axios
    .post("/zones/admin", {
      capacity: newZone.capacity,
      slot: newZone.slot,
      zone: newZone.zone,
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.data);
      return error.response.data;
    });
};

// export const zoneGetFunc = async () => {
//   return await axios
//     .get("/zones/admin")
//     .then((response) => {
//       console.log(response);
//       return response.data;
//     })
//     .catch((error) => {
//       console.log(error.response.data);
//       return error.response.data;
//     });
// };
