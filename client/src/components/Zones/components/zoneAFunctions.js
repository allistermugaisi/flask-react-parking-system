// Function to toggle color by changing state
export const toggleActive = (id) => {
  let arrayCopy = [...zoneSlots.slots];
  const current = arrayCopy.map((slot) => {
    if (slot.slot_details.slot_id.id === id) {
      return {
        id: slot.id,
        slot_details: {
          slot_id: {
            cost: slot.slot_details.slot_id.cost,
            date: slot.slot_details.slot_id.date,
            id: slot.slot_details.slot_id.id,
            reserved: slot.slot_details.slot_id.reserved,
            toggled: !slot.slot_details.slot_id.toggled,
          },
          slot_id1: {
            cost: slot.slot_details.slot_id1.cost,
            date: slot.slot_details.slot_id1.date,
            id: slot.slot_details.slot_id1.id,
            reserved: slot.slot_details.slot_id1.reserved,
            toggled: slot.slot_details.slot_id1.toggled,
          },
          slot_id2: {
            cost: slot.slot_details.slot_id2.cost,
            date: slot.slot_details.slot_id2.date,
            id: slot.slot_details.slot_id2.id,
            reserved: slot.slot_details.slot_id2.reserved,
            toggled: slot.slot_details.slot_id2.toggled,
          },
          slot_id3: {
            cost: slot.slot_details.slot_id3.cost,
            date: slot.slot_details.slot_id3.date,
            id: slot.slot_details.slot_id3.id,
            reserved: slot.slot_details.slot_id3.reserved,
            toggled: slot.slot_details.slot_id3.toggled,
          },
          slot_id4: {
            cost: slot.slot_details.slot_id4.cost,
            date: slot.slot_details.slot_id4.date,
            id: slot.slot_details.slot_id4.id,
            reserved: slot.slot_details.slot_id4.reserved,
            toggled: slot.slot_details.slot_id4.toggled,
          },
          slot_id5: {
            cost: slot.slot_details.slot_id5.cost,
            date: slot.slot_details.slot_id5.date,
            id: slot.slot_details.slot_id5.id,
            reserved: slot.slot_details.slot_id5.reserved,
            toggled: slot.slot_details.slot_id5.toggled,
          },
          slot_id6: {
            cost: slot.slot_details.slot_id6.cost,
            date: slot.slot_details.slot_id6.date,
            id: slot.slot_details.slot_id6.id,
            reserved: slot.slot_details.slot_id6.reserved,
            toggled: slot.slot_details.slot_id6.toggled,
          },
        },
        slot_name: slot.slot_name,
        zone: slot.zone,
      };
    } else {
      return slot;
    }
  });
  changeState({ arrayCopy, slots: current });
};

export const toggleActive1 = (id) => {
  let arrayCopy = [...zoneSlots.slots];
  const current = arrayCopy.map((slot) => {
    if (slot.slot_details.slot_id1.id === id) {
      return {
        id: slot.id,
        slot_details: {
          slot_id: {
            cost: slot.slot_details.slot_id.cost,
            date: slot.slot_details.slot_id.date,
            id: slot.slot_details.slot_id.id,
            reserved: slot.slot_details.slot_id.reserved,
            toggled: slot.slot_details.slot_id.toggled,
          },
          slot_id1: {
            cost: slot.slot_details.slot_id1.cost,
            date: slot.slot_details.slot_id1.date,
            id: slot.slot_details.slot_id1.id,
            reserved: slot.slot_details.slot_id1.reserved,
            toggled: !slot.slot_details.slot_id1.toggled,
          },
          slot_id2: {
            cost: slot.slot_details.slot_id2.cost,
            date: slot.slot_details.slot_id2.date,
            id: slot.slot_details.slot_id2.id,
            reserved: slot.slot_details.slot_id2.reserved,
            toggled: slot.slot_details.slot_id2.toggled,
          },
          slot_id3: {
            cost: slot.slot_details.slot_id3.cost,
            date: slot.slot_details.slot_id3.date,
            id: slot.slot_details.slot_id3.id,
            reserved: slot.slot_details.slot_id3.reserved,
            toggled: slot.slot_details.slot_id3.toggled,
          },
          slot_id4: {
            cost: slot.slot_details.slot_id4.cost,
            date: slot.slot_details.slot_id4.date,
            id: slot.slot_details.slot_id4.id,
            reserved: slot.slot_details.slot_id4.reserved,
            toggled: slot.slot_details.slot_id4.toggled,
          },
          slot_id5: {
            cost: slot.slot_details.slot_id5.cost,
            date: slot.slot_details.slot_id5.date,
            id: slot.slot_details.slot_id5.id,
            reserved: slot.slot_details.slot_id5.reserved,
            toggled: slot.slot_details.slot_id5.toggled,
          },
          slot_id6: {
            cost: slot.slot_details.slot_id6.cost,
            date: slot.slot_details.slot_id6.date,
            id: slot.slot_details.slot_id6.id,
            reserved: slot.slot_details.slot_id6.reserved,
            toggled: slot.slot_details.slot_id6.toggled,
          },
        },
        slot_name: slot.slot_name,
        zone: slot.zone,
      };
    } else {
      return slot;
    }
  });
  changeState({ arrayCopy, slots: current });
};

export const toggleActive2 = (id) => {
  let arrayCopy = [...zoneSlots.slots];
  const current = arrayCopy.map((slot) => {
    if (slot.slot_details.slot_id2.id === id) {
      return {
        id: slot.id,
        slot_details: {
          slot_id: {
            cost: slot.slot_details.slot_id.cost,
            date: slot.slot_details.slot_id.date,
            id: slot.slot_details.slot_id.id,
            reserved: slot.slot_details.slot_id.reserved,
            toggled: slot.slot_details.slot_id.toggled,
          },
          slot_id1: {
            cost: slot.slot_details.slot_id1.cost,
            date: slot.slot_details.slot_id1.date,
            id: slot.slot_details.slot_id1.id,
            reserved: slot.slot_details.slot_id1.reserved,
            toggled: slot.slot_details.slot_id1.toggled,
          },
          slot_id2: {
            cost: slot.slot_details.slot_id2.cost,
            date: slot.slot_details.slot_id2.date,
            id: slot.slot_details.slot_id2.id,
            reserved: slot.slot_details.slot_id2.reserved,
            toggled: !slot.slot_details.slot_id2.toggled,
          },
          slot_id3: {
            cost: slot.slot_details.slot_id3.cost,
            date: slot.slot_details.slot_id3.date,
            id: slot.slot_details.slot_id3.id,
            reserved: slot.slot_details.slot_id3.reserved,
            toggled: slot.slot_details.slot_id3.toggled,
          },
          slot_id4: {
            cost: slot.slot_details.slot_id4.cost,
            date: slot.slot_details.slot_id4.date,
            id: slot.slot_details.slot_id4.id,
            reserved: slot.slot_details.slot_id4.reserved,
            toggled: slot.slot_details.slot_id4.toggled,
          },
          slot_id5: {
            cost: slot.slot_details.slot_id5.cost,
            date: slot.slot_details.slot_id5.date,
            id: slot.slot_details.slot_id5.id,
            reserved: slot.slot_details.slot_id5.reserved,
            toggled: slot.slot_details.slot_id5.toggled,
          },
          slot_id6: {
            cost: slot.slot_details.slot_id6.cost,
            date: slot.slot_details.slot_id6.date,
            id: slot.slot_details.slot_id6.id,
            reserved: slot.slot_details.slot_id6.reserved,
            toggled: slot.slot_details.slot_id6.toggled,
          },
        },
        slot_name: slot.slot_name,
        zone: slot.zone,
      };
    } else {
      return slot;
    }
  });
  changeState({ arrayCopy, slots: current });
};

export const toggleActive3 = (id) => {
  let arrayCopy = [...zoneSlots.slots];
  const current = arrayCopy.map((slot) => {
    if (slot.slot_details.slot_id3.id === id) {
      return {
        id: slot.id,
        slot_details: {
          slot_id: {
            cost: slot.slot_details.slot_id.cost,
            date: slot.slot_details.slot_id.date,
            id: slot.slot_details.slot_id.id,
            reserved: slot.slot_details.slot_id.reserved,
            toggled: slot.slot_details.slot_id.toggled,
          },
          slot_id1: {
            cost: slot.slot_details.slot_id1.cost,
            date: slot.slot_details.slot_id1.date,
            id: slot.slot_details.slot_id1.id,
            reserved: slot.slot_details.slot_id1.reserved,
            toggled: slot.slot_details.slot_id1.toggled,
          },
          slot_id2: {
            cost: slot.slot_details.slot_id2.cost,
            date: slot.slot_details.slot_id2.date,
            id: slot.slot_details.slot_id2.id,
            reserved: slot.slot_details.slot_id2.reserved,
            toggled: slot.slot_details.slot_id2.toggled,
          },
          slot_id3: {
            cost: slot.slot_details.slot_id3.cost,
            date: slot.slot_details.slot_id3.date,
            id: slot.slot_details.slot_id3.id,
            reserved: slot.slot_details.slot_id3.reserved,
            toggled: !slot.slot_details.slot_id3.toggled,
          },
          slot_id4: {
            cost: slot.slot_details.slot_id4.cost,
            date: slot.slot_details.slot_id4.date,
            id: slot.slot_details.slot_id4.id,
            reserved: slot.slot_details.slot_id4.reserved,
            toggled: slot.slot_details.slot_id4.toggled,
          },
          slot_id5: {
            cost: slot.slot_details.slot_id5.cost,
            date: slot.slot_details.slot_id5.date,
            id: slot.slot_details.slot_id5.id,
            reserved: slot.slot_details.slot_id5.reserved,
            toggled: slot.slot_details.slot_id5.toggled,
          },
          slot_id6: {
            cost: slot.slot_details.slot_id6.cost,
            date: slot.slot_details.slot_id6.date,
            id: slot.slot_details.slot_id6.id,
            reserved: slot.slot_details.slot_id6.reserved,
            toggled: slot.slot_details.slot_id6.toggled,
          },
        },
        slot_name: slot.slot_name,
        zone: slot.zone,
      };
    } else {
      return slot;
    }
  });
  changeState({ arrayCopy, slots: current });
};

export const toggleActive4 = (id) => {
  let arrayCopy = [...zoneSlots.slots];
  const current = arrayCopy.map((slot) => {
    if (slot.slot_details.slot_id4.id === id) {
      return {
        id: slot.id,
        slot_details: {
          slot_id: {
            cost: slot.slot_details.slot_id.cost,
            date: slot.slot_details.slot_id.date,
            id: slot.slot_details.slot_id.id,
            reserved: slot.slot_details.slot_id.reserved,
            toggled: slot.slot_details.slot_id.toggled,
          },
          slot_id1: {
            cost: slot.slot_details.slot_id1.cost,
            date: slot.slot_details.slot_id1.date,
            id: slot.slot_details.slot_id1.id,
            reserved: slot.slot_details.slot_id1.reserved,
            toggled: slot.slot_details.slot_id1.toggled,
          },
          slot_id2: {
            cost: slot.slot_details.slot_id2.cost,
            date: slot.slot_details.slot_id2.date,
            id: slot.slot_details.slot_id2.id,
            reserved: slot.slot_details.slot_id2.reserved,
            toggled: slot.slot_details.slot_id2.toggled,
          },
          slot_id3: {
            cost: slot.slot_details.slot_id3.cost,
            date: slot.slot_details.slot_id3.date,
            id: slot.slot_details.slot_id3.id,
            reserved: slot.slot_details.slot_id3.reserved,
            toggled: slot.slot_details.slot_id3.toggled,
          },
          slot_id4: {
            cost: slot.slot_details.slot_id4.cost,
            date: slot.slot_details.slot_id4.date,
            id: slot.slot_details.slot_id4.id,
            reserved: slot.slot_details.slot_id4.reserved,
            toggled: !slot.slot_details.slot_id4.toggled,
          },
          slot_id5: {
            cost: slot.slot_details.slot_id5.cost,
            date: slot.slot_details.slot_id5.date,
            id: slot.slot_details.slot_id5.id,
            reserved: slot.slot_details.slot_id5.reserved,
            toggled: slot.slot_details.slot_id5.toggled,
          },
          slot_id6: {
            cost: slot.slot_details.slot_id6.cost,
            date: slot.slot_details.slot_id6.date,
            id: slot.slot_details.slot_id6.id,
            reserved: slot.slot_details.slot_id6.reserved,
            toggled: slot.slot_details.slot_id6.toggled,
          },
        },
        slot_name: slot.slot_name,
        zone: slot.zone,
      };
    } else {
      return slot;
    }
  });
  changeState({ arrayCopy, slots: current });
};

export const toggleActive5 = (id) => {
  let arrayCopy = [...zoneSlots.slots];
  const current = arrayCopy.map((slot) => {
    if (slot.slot_details.slot_id5.id === id) {
      return {
        id: slot.id,
        slot_details: {
          slot_id: {
            cost: slot.slot_details.slot_id.cost,
            date: slot.slot_details.slot_id.date,
            id: slot.slot_details.slot_id.id,
            reserved: slot.slot_details.slot_id.reserved,
            toggled: slot.slot_details.slot_id.toggled,
          },
          slot_id1: {
            cost: slot.slot_details.slot_id1.cost,
            date: slot.slot_details.slot_id1.date,
            id: slot.slot_details.slot_id1.id,
            reserved: slot.slot_details.slot_id1.reserved,
            toggled: slot.slot_details.slot_id1.toggled,
          },
          slot_id2: {
            cost: slot.slot_details.slot_id2.cost,
            date: slot.slot_details.slot_id2.date,
            id: slot.slot_details.slot_id2.id,
            reserved: slot.slot_details.slot_id2.reserved,
            toggled: slot.slot_details.slot_id2.toggled,
          },
          slot_id3: {
            cost: slot.slot_details.slot_id3.cost,
            date: slot.slot_details.slot_id3.date,
            id: slot.slot_details.slot_id3.id,
            reserved: slot.slot_details.slot_id3.reserved,
            toggled: slot.slot_details.slot_id3.toggled,
          },
          slot_id4: {
            cost: slot.slot_details.slot_id4.cost,
            date: slot.slot_details.slot_id4.date,
            id: slot.slot_details.slot_id4.id,
            reserved: slot.slot_details.slot_id4.reserved,
            toggled: slot.slot_details.slot_id4.toggled,
          },
          slot_id5: {
            cost: slot.slot_details.slot_id5.cost,
            date: slot.slot_details.slot_id5.date,
            id: slot.slot_details.slot_id5.id,
            reserved: slot.slot_details.slot_id5.reserved,
            toggled: !slot.slot_details.slot_id5.toggled,
          },
          slot_id6: {
            cost: slot.slot_details.slot_id6.cost,
            date: slot.slot_details.slot_id6.date,
            id: slot.slot_details.slot_id6.id,
            reserved: slot.slot_details.slot_id6.reserved,
            toggled: slot.slot_details.slot_id6.toggled,
          },
        },
        slot_name: slot.slot_name,
        zone: slot.zone,
      };
    } else {
      return slot;
    }
  });
  changeState({ arrayCopy, slots: current });
};

export const toggleActive6 = (id) => {
  let arrayCopy = [...zoneSlots.slots];
  const current = arrayCopy.map((slot) => {
    if (slot.slot_details.slot_id6.id === id) {
      return {
        id: slot.id,
        slot_details: {
          slot_id: {
            cost: slot.slot_details.slot_id.cost,
            date: slot.slot_details.slot_id.date,
            id: slot.slot_details.slot_id.id,
            reserved: slot.slot_details.slot_id.reserved,
            toggled: slot.slot_details.slot_id.toggled,
          },
          slot_id1: {
            cost: slot.slot_details.slot_id1.cost,
            date: slot.slot_details.slot_id1.date,
            id: slot.slot_details.slot_id1.id,
            reserved: slot.slot_details.slot_id1.reserved,
            toggled: slot.slot_details.slot_id1.toggled,
          },
          slot_id2: {
            cost: slot.slot_details.slot_id2.cost,
            date: slot.slot_details.slot_id2.date,
            id: slot.slot_details.slot_id2.id,
            reserved: slot.slot_details.slot_id2.reserved,
            toggled: slot.slot_details.slot_id2.toggled,
          },
          slot_id3: {
            cost: slot.slot_details.slot_id3.cost,
            date: slot.slot_details.slot_id3.date,
            id: slot.slot_details.slot_id3.id,
            reserved: slot.slot_details.slot_id3.reserved,
            toggled: slot.slot_details.slot_id3.toggled,
          },
          slot_id4: {
            cost: slot.slot_details.slot_id4.cost,
            date: slot.slot_details.slot_id4.date,
            id: slot.slot_details.slot_id4.id,
            reserved: slot.slot_details.slot_id4.reserved,
            toggled: slot.slot_details.slot_id4.toggled,
          },
          slot_id5: {
            cost: slot.slot_details.slot_id5.cost,
            date: slot.slot_details.slot_id5.date,
            id: slot.slot_details.slot_id5.id,
            reserved: slot.slot_details.slot_id5.reserved,
            toggled: slot.slot_details.slot_id5.toggled,
          },
          slot_id6: {
            cost: slot.slot_details.slot_id6.cost,
            date: slot.slot_details.slot_id6.date,
            id: slot.slot_details.slot_id6.id,
            reserved: slot.slot_details.slot_id6.reserved,
            toggled: !slot.slot_details.slot_id6.toggled,
          },
        },
        slot_name: slot.slot_name,
        zone: slot.zone,
      };
    } else {
      return slot;
    }
  });
  changeState({ arrayCopy, slots: current });
};

// Function to change color of the respective slots both on toggle and on reserve
export const toggleActiveStyles = (slot) => {
  if (slot.slot_details.slot_id.toggled) {
    return "slot inactive";
  } else {
    return "slot active";
  }
};

export const toggleActive1Styles = (slot) => {
  if (slot.slot_details.slot_id1.toggled) {
    return "slot inactive";
  } else {
    return "slot active";
  }
};

export const toggleActive2Styles = (slot) => {
  if (slot.slot_details.slot_id2.toggled) {
    return "slot inactive";
  } else {
    return "slot active";
  }
};

export const toggleActive3Styles = (slot) => {
  if (slot.slot_details.slot_id3.toggled) {
    return "slot inactive";
  } else {
    return "slot active";
  }
};

export const toggleActive4Styles = (slot) => {
  if (slot.slot_details.slot_id4.toggled) {
    return "slot inactive";
  } else {
    return "slot active";
  }
};

export const toggleActive5Styles = (slot) => {
  if (slot.slot_details.slot_id5.toggled) {
    return "slot inactive";
  } else {
    return "slot active";
  }
};

export const toggleActive6Styles = (slot) => {
  if (slot.slot_details.slot_id6.toggled) {
    return "slot inactive";
  } else {
    return "slot active";
  }
};
