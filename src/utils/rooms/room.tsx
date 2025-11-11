import { Room } from "../interfaces/itineraryInterface";

export const areGuestSelected = (room: Room) => {
  if (room.adults || room.children || room.infants) {
    return true;
  } else return false;
};
export const isAdultSelected = (room: Room) => {
  if (room.adults) {
    return true;
  } else return false;
}
export const isChildSelected = (room: Room) => {
  if (room.children) {
    return true;
  } else return false;
}
export const isInfantSelected = (room: Room) => {
  if (room.infants) {
    return true;
  } else return false;
}
export const isRoomFull = (room: Room) => {
  if (room.adults + room.children + room.infants >= 4) {
    return true;
  } else return false;
}

export const didCabinsReachLimit = (rooms: Room[]) => {
  if (rooms.length === 4) {
    return true;
  } else return false;
}


export const isRoomSelected = (rooms: Room[]): boolean => {
  if (rooms) {
    let notSelected = rooms.filter((room: Room) =>
      room.selected ? true : false
    );

    if (notSelected.length === 0) {
      return false;
    } else return true;
  } else return false;
};

export const checkLastRoom = (rooms: Room[]): boolean => {
  if (rooms) {
    if ((rooms.length && rooms[rooms.length - 1].selected)) {
      if (rooms.length === 4) {
        return false
      } else {
        return true;
      }
    } else {
      return false;
    }
  } else return false;
};


export const checkOffers = (rooms: Room[]): boolean => {
  if (rooms) {
    if ((rooms.length && rooms[rooms.length - 1].selected)) {
      return true;
    } else {
      return false;
    }
  } else return false;
};

export const checkCabin = (rooms: Room[]) => {
  let a = rooms.every(obj => obj.selected !== "")
  return a;
};

export const checkCabinCount = (cabinData: Room[]) => {
  let roomCount = 0
  let room: any = []
  for (const cabin of cabinData) {
    if (cabin?.rooms) {
      cabin?.rooms?.map((item: any) =>
        room.push(item)
      )
    }
    if (cabin && cabin?.rooms?.length) {
      roomCount += cabin?.rooms?.length
    }
  }

  if (roomCount) {
    // if (roomCount == 4) {
    //   return true
    // } else {
    //   if ((room.some((item:any) => item.adults === 0))) {
    //     return true
    //   } else {
    //     return false
    //   }
    // }
    if ((room.some((item: any) => item.adults === 0))) {
      return true
    } else {
      return false
    }
  } else return false;
};
export const checkCabinSelect = (cabinData: Room[]) => {
  let roomCount = 0
  let room: any = []
  for (const cabin of cabinData) {
    if (cabin?.rooms) {
      cabin?.rooms?.map((item: any) =>
        room.push(item)
      )
    }
    if (cabin && cabin?.rooms?.length) {
      roomCount += cabin?.rooms?.length
    }
  }

  if (roomCount) {
    if ((room.length > 0 && room[room.length - 1].adults)) {
      return false
    } else {
      return true
    }
  } else return false;
};