import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/Layout';
import { FormatToString } from '../../utils/formatter/formatter';
import { Navigate, useNavigate } from 'react-router-dom';
import { GetStore, SaveStore, GetPromo, GetAppliedPromo } from '../../utils/store/store';
import { useGetCabinImageQuery, useGetDeckMutation, useGetRoomLayoutMutation } from '../../services/itinerary/itinerary';
import Modal from '../../components/UI/Modal';
import Glider from 'react-glider';
import 'glider-js/glider.min.css';
import Button from '../../components/UI/Button';
// @ts-ignore
type Props = {}

const DeckList = ({ rooms, setCabin, getFilteredCabinImage }: any) => {
  return (
    <div>
      {rooms?.map((room: any, index: number) => (
        <div>
          <div className="mt-5 grid grid-cols-2 gap-4 bg-brand-sky/10 px-2 py-2 lg:px-5 lg:py-4 border border-brand-sky rounded-t" >
            <h6 className="text-xl font-semibold lg:text-2xl">Room {index + 1}</h6>
          </div>

          <div
            className={`grid grid-cols-3 px-2 py-3 lg:px-5 border border-t-0 border-brand-sky`}
          >
            <div className="col-span-2">
              <div className='flex items-center'>
                <img className='h-3 mr-1' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/room-icon.svg" alt="" />
                <p className="lg:text-base text-sm font-bold mb-1">{room.selected_name}</p>
              </div>
              <div className='flex items-center'>
                <img className='h-3 mr-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/guest-icon.svg" alt="" />
                <p className="lg:text-base text-sm font-bold">{room.adults + room.children + room.infants} Guests</p>
              </div>
              {room.deck && room.room_number ?
                <div className='flex items-center'>
                  <img className='h-3 mr-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/guest-icon.svg" alt="" />
                  <p className="lg:text-base text-sm font-bold">Deck {room.deck} : Room {room.room_number}</p>
                </div>
                : null}
              {
                room.category_details && room.category_details.decks
                  ? <p className="lg:text-sm text-xs font-semibold mt-1 text-gray-800">
                    {`Available Deck No: ${room.category_details.decks.toString()}`}
                  </p>
                  : ''
              }
              {/* <p onClick={() => getFilteredCabinImage(room, index)} className="text-xxs text-brand-primary underline mt-2 font-semibold cursor-pointer" >
                View Images
              </p> */}
            </div>
            <div className="text-right">
              {/* <button
                onClick={() => setCabin(room, index)}
                className={`border-2 border-brand-primary text-xs text-brand-primary font-bold px-4 py-2 rounded`}
              >
                {room.deck && room.room_number ? 'Change Deck' : 'Select Deck'}
              </button> */}
              <Button text={room.deck && room.room_number ? 'Change Deck' : 'Select Deck'} size='sm' type='secondary' handleClick={() => setCabin(room, index)} />
            </div>
          </div>
        </div>
      )
      )}
    </div>
  );
}



export default function Cabin({ }: Props) {
  // const {id}=useParams();
  const store = GetStore();

  const [filteredCabinImage, setFilteredCabinImage] = useState<any[]>();
  const [viewImage, setViewImage] = useState(false);
  const [getCabinImage, setCabinImage] = useState<any>();

  const [deck, setDeck] = useState<any[]>();
  const [deckModal, setDeckModal] = useState(false);

  const [roomDeck, setRoomDeck] = useState<any[]>([]);
  const [roomDeckModal, setRoomDeckModal] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<any>();
  const [selectedDeck, setSelectedDeck] = useState();

  const [selectedRoom, setSelectedRoom] = useState(null);

  const [currentRoom, setCurrentRoom] = useState(store.rooms);

  const { data: cabinImage } = useGetCabinImageQuery()
  const [getDeck] = useGetDeckMutation()
  const [getRoomLayout] = useGetRoomLayoutMutation()

  let navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (cabinImage && cabinImage.categories) {
      setCabinImage(cabinImage.categories)
    }
  }, [cabinImage]);

  const getFilteredCabinImage = (room: any, index: number) => {
    const res = getCabinImage.find((b: any) => { return b.code == room.selected; });
    setFilteredCabinImage(res);
    setViewImage(true);
  }

  const deckSelection = (room: any, index: number) => {
    if (store && store?.rooms && store?.itinerary) {
      const _payload = {
        category_id: room?.category_details?.id,
        beds: room?.adults + room?.children + room?.infants,
        id: store.itinerary.itinerary_id
      };
      getDeck(_payload)
        .unwrap()
        .then((res: any) => {
          let a = res.slice().sort((a:any, b:any) => b.selectable - a.selectable);
          setDeck(a);
          setSelectedCategory(room);
          setSelectedCategoryIndex(index);
          setDeckModal(true);
        })
        .catch((res: any) => {
          console.log('Error: ', res)
        })
    }
  }

  const DeckDesc = (desc: any) => {
    const d = desc.des.split(',');
    return d.map((v: any, i: number) =>
      <div className="flex" key={i}>
        <img className='h-2 mr-1' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg" alt="" />
        <p className='lg:text-sm text-xs font-semibold'>{v}</p>
      </div>
    )
  }

  const getRoomSelectionLayout = (deck: any) => {
    console.log('deck - ',JSON.stringify(deck))
    if (selectedCategory) {
      const _payload = {
        category_id: selectedCategory?.category_details.id,
        beds: selectedCategory.adults + selectedCategory.children + selectedCategory.infants,
        id: store.itinerary.itinerary_id,
        deckno: deck.id
      };
      getRoomLayout(_payload)
        .unwrap()
        .then((res: any) => {
          setRoomDeck(res);
          setSelectedDeck(deck);
          setRoomDeckModal(true);
          setSelectedRoom(null);
          setDeckModal(false)
        })
        .catch((res: any) => {
          console.log('Error: ', res)
        })
    }
  }

  const roomExists = (room_number: any, index: number) => {
    return currentRoom.some((o: any, idx: number) => idx !== index && o.room_number === room_number);
  }

  const RoomLayout = ({ roomDeck }: any) => {
    return roomDeck.map((room: any, key: number) => {
      let roomExist = roomExists(room.number, selectedCategoryIndex);
      return (
        <div key={key}
          className={`
          border-2 rounded-lg flex px-2 py-4 justify-center items-center text-center text-xxs lg:text-sm font-semibold uppercase select-none 
          ${room.available && "cursor-pointer"} 
          ${room.number === selectedRoom?.number ? 'bg-success border-success text-white' : roomExist ? 'bg-success/60 border-success/60 text-white' : room.available ? 'bg-white border-gray-100' : 'bg-gray-100/20 border-gray-100/20'}
          `}
          onClick={() => room.available && !roomExist && setSelectionRoom(room)}
          style={{ gridArea: `r${room.y}${room.x}` }} >
          {room.number}
        </div >
      )
    })
  }
  const setSelectionRoom = (room: any) => {
    setSelectedRoom(room)
  }

  const continueRoomSelection = () => {
    if (currentRoom) {
      // let storeRoom = currentRoom;
      // storeRoom[selectedCategoryIndex].room_id = selectedRoom?.itinerary_room_id;
      // storeRoom[selectedCategoryIndex].room_number = selectedRoom?.number;
      // storeRoom[selectedCategoryIndex].deck = selectedDeck?.id;

      const isDuplicate = currentRoom.some(
        (room: any, idx: number) =>
          idx !== selectedCategoryIndex && room.room_number === selectedRoom?.number
      );

      if (isDuplicate) {
        alert("This room is already selected. Please choose another one.");
        return;
      }

      // update room
      const updatedRooms = [...currentRoom];
      updatedRooms[selectedCategoryIndex] = {
        ...updatedRooms[selectedCategoryIndex],
        room_id: selectedRoom?.itinerary_room_id,
        room_number: selectedRoom?.number,
        deck: selectedDeck?.id,
      };

      setCurrentRoom(updatedRooms);
      setRoomDeckModal(false);
    }
  }

  const proceedToShoreEx = () => {
    SaveStore({ ...store, rooms: currentRoom });
    navigate('/guest-detail')
  }

  const isComplete = !currentRoom?.filter((room) => !room.room_number).length

  return (
    <Layout>
      <main className="container mx-auto py-24 lg:pt-36 px-3">
        <div>
          <div className="flex items-center">
            <img
              src="assets/icons/footer/chevon-down.svg"
              alt="arrow"
              onClick={() => navigate(-1)}
              className={`self-center mt-1 justify-self-start mr-2 bg-brand-primary h-5 w-5 p-1 rounded-full rotate-90  lg:hidden`}
            />
            <h1 className="text-xl font-medium lg:text-3xl">
              Find your perfect room
            </h1>
          </div>
          <div className="">
            <DeckList rooms={currentRoom} setCabin={deckSelection} getFilteredCabinImage={getFilteredCabinImage} />
            <div className='mt-3'>
              {/* <button
                disabled={!isComplete}
                onClick={() => proceedToShoreEx()}
                className={`bg-brand-primary text-xs text-white font-bold w-full py-3 rounded disabled:bg-brand-primary/60`}
              >
                Continue
              </button> */}
              <Button text='Continue' disabled={!isComplete} handleClick={() => proceedToShoreEx()} className='w-full' />
            </div>
          </div>
        </div>
      </main>

      <Modal show={roomDeckModal} align={'center'} className=" w-[90%] lg:w-2/4 center rounded-lg lg:rounded overflow-hidden left-0 right-0 m-auto top-0 bottom-0 h-[90%]" onClose={() => setRoomDeckModal(false)}>
        <div className='flex items-center justify-between p-4 pb-0 bg-white'>
          <h1 className='text-lg lg:text-2xl font-semibold'>Select Deck</h1>
          <p className='text-base lg:text-xl font-bold cursor-pointer' onClick={() => setRoomDeckModal(false)}>X</p>
        </div>
        <div className='overflow-scroll h-[80%] px-4 text-center bg-white'>
          <ShipFront deck={selectedDeck} />
          <div className='border-2 border-brand-sky rounded-md w-[90%] text-center inline-grid py-3 my-1'>
            <p className='lg:text-sm text-xxs font-medium lg:font-semibold'>{selectedDeck?.description}</p>
          </div>
          <div className="grid gap-2" style={{ gridTemplateAreas: "'" + buildLayoutGrid(roomDeck).join("' '") + "'" }}>
            <div style={{ gridArea: 'exp' }} className="flex justify-around uppercase text-xs mt-3 mb-14">
              <div className='flex'>
                <div className='rounded-md border-2 h-4 w-4 mr-1' />
                <p className='text-sm lg:text-base font-semibold'> Available</p>
              </div>
              <div className='flex'>
                <div className='rounded-md border-2 border-gray-100 bg-gray-100/20 border-bg-gray-100 h-4 w-4 mr-1' />
                <p className='text-sm lg:text-base font-semibold'> Unavailable</p>
              </div>
              <div className='flex'>
                <div className='rounded-md border-2 bg-success h-4 w-4 mr-1' />
                <p className='text-sm lg:text-base font-semibold'> Selected</p>
              </div>
            </div>
            <RoomLayout roomDeck={roomDeck} />
          </div>
        </div>
        <div className='h-[12%] px-4 mt-2 text-center rounded-b-lg lg:rounded-b bg-white'>
          <div className='flex items-center h-full justify-between'>
            <div className='text-left'>
              <p className='text-base lg:text-lg text-brand-primary font-semibold'>Deck {selectedDeck?.id} : {selectedRoom && selectedRoom.number ? `Room ${selectedRoom?.number}` : null}</p>
              {/* <p className='font-semibold text-xs'> {selectedDeck?.description}</p> */}
            </div>
            {/* <button
              onClick={() => continueRoomSelection()}
              className={`bg-brand-primary text-xs text-white font-bold py-3 px-4 rounded disabled:bg-brand-primary/60`}
            >
              Continue
            </button> */}
            <Button text='Continue' size='sm' handleClick={() => continueRoomSelection()} />
          </div>
        </div>
      </Modal>

      <Modal show={deckModal} align={'center'} className="bg-white w-[90%] lg:w-2/4 center rounded-lg lg:rounded border overflow-hidden left-0 right-0 m-auto top-0 bottom-0 h-[90%]" onClose={() => setDeckModal(false)}>
        <div className='flex items-center justify-between p-4 pb-0'>
          <h1 className='text-lg lg:text-2xl font-semibold'>Select Deck</h1>
          <p className='text-base lg:text-xl font-bold cursor-pointer' onClick={() => setDeckModal(false)}>X</p>
        </div>
        <div className='overflow-scroll h-[90%] px-4'>
          {
            deck && deck.map((value: any, key: number) => (
              <div key={key}>
                <div className="mt-5 grid grid-cols-2 gap-4 bg-brand-sky/10 px-2 py-2 lg:px-5 lg:py-4 border border-brand-sky rounded-t" >
                  <h6 className="text-base font-semibold lg:text-xl">Deck {value.id}</h6>
                  {/* <button
                    disabled={!value.selectable}
                    onClick={() => getRoomSelectionLayout(value)}
                    className={`bg-brand-primary text-xs text-white font-bold py-2 rounded disabled:bg-brand-primary/60`}
                  >
                    Choose a room
                  </button> */}
                  <Button text='Choose a room' size='sm' disabled={!value.selectable} handleClick={() => getRoomSelectionLayout(value)} className='whitespace-nowrap' />
                </div>
                <div className={`grid grid-cols-2 gap-3 px-2 py-3 lg:px-5 border border-t-0 border-brand-sky`}>
                  <DeckDesc des={value.description} />
                </div>
              </div>
            ))
          }
        </div>
      </Modal>

      <Modal show={viewImage} align={'center'} className="w-full lg:w-2/4 p-5  bottom-1/4 lg:bottom-16 lg:left-1/4 h-auto" onClose={() => setViewImage(false)}>
        <p className='text-white text-2xl font-bold absolute lg:-right-5 right-10 -top-20 lg:-top-10 cursor-pointer'
          onClick={() => setViewImage(false)}
        >X</p>
        <div className=''>
          <Glider
            hasArrows
            scrollLock
            slidesToShow={1}
          >
            {filteredCabinImage && filteredCabinImage.images.map((val: any, i: number) => (
              <div key={i}>
                <img className='w-full' src={val} />
              </div>
            ))}
          </Glider>
        </div>
      </Modal>
    </Layout>
  );
}

const ShipFront = (deck: any) => {
  return (
    <div style={{ gridArea: 'tri' }} className="relative">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 335 90" className="w-full">
        <g fill="transparent">
          <path d="M 167.4999694824219 2.352119445800781 C 166.0182800292969 2.352119445800781 164.5452575683594 2.722793579101562 163.2401428222656 3.424079895019531 L 35.47882080078125 72.07197570800781 C 33.53909301757812 73.11422729492188 32.11114501953125 74.67193603515625 31.34933471679688 76.57675933837891 C 30.65557861328125 78.31137084960938 30.53530883789062 80.30712127685547 31.0107421875 82.19636535644531 C 31.48617553710938 84.08557891845703 32.53671264648438 85.78668975830078 33.96881103515625 86.98633575439453 C 35.54147338867188 88.30368804931641 37.53665161132812 89.00000762939453 39.7386474609375 89.00000762939453 L 295.2613525390625 89.00000762939453 C 297.4633483886719 89.00000762939453 299.45849609375 88.30368804931641 301.0311279296875 86.98633575439453 C 302.4632873535156 85.78668975830078 303.5138244628906 84.08557891845703 303.9892578125 82.19633483886719 C 304.4646301269531 80.30712127685547 304.3444213867188 78.31137084960938 303.6506652832031 76.57675933837891 C 302.8888549804688 74.67193603515625 301.4608764648438 73.11422729492188 299.5211791992188 72.07197570800781 L 171.7598266601562 3.424079895019531 C 170.4546813964844 2.722793579101562 168.9816436767578 2.352119445800781 167.4999694824219 2.352119445800781 M 167.4999847412109 1.35211181640625 C 169.1276550292969 1.35211181640625 170.7553405761719 1.749137878417969 172.2331390380859 2.543190002441406 L 299.9945068359375 71.19108581542969 C 309.1502990722656 76.11061859130859 305.6551208496094 90.00000762939453 295.2613525390625 90.00000762939453 L 39.7386474609375 90.00000762939453 C 29.3448486328125 90.00000762939453 25.84970092773438 76.11061859130859 35.0054931640625 71.19108581542969 L 162.7668151855469 2.543190002441406 C 164.24462890625 1.749137878417969 165.8722991943359 1.35211181640625 167.4999847412109 1.35211181640625 Z" stroke="none" fill="#079bb5" />
        </g>
      </svg>
      <div className="absolute text-center w-full lg:text-sm text-xs font-semibold top-12 lg:top-28 h-full">Deck {deck.deck.id}</div>
    </div>
  )
}

function buildLayoutGrid(rooms: any) {
  let gridmap: any = {};
  let maxX = 0;
  let maxY = 0;
  rooms.forEach(function (room: any) {
    if (!gridmap[room.y]) {
      gridmap[room.y] = {};
    }
    gridmap[room.y][room.x] = room;

    if (room.y > maxX) maxX = room.y;
    if (room.x > maxY) maxY = room.x;
  });
  let gridString = [new Array(maxY + 1).fill("tri").join(" "),
  new Array(maxY + 1).fill("dck").join(" "),
  new Array(maxY + 1).fill("pre").join(" "),
  new Array(maxY + 1).fill("exp").join(" ")];
  let roomNo = 1;
  for (let x = 0; x <= maxX; x++) {
    let gridLine = "";
    for (let y = 0; y <= maxY; y++) {
      if (gridLine != "") {
        gridLine += " "
      }
      if (gridmap[x] && gridmap[x][y]) {
        if (gridmap[x][y].number.indexOf('lift') != -1) {
          gridLine += ("lift");
        } else {
          gridLine += ("r" + x + y);
        }
      } else {
        gridLine += ".";
      }
    }
    gridString.push(gridLine);
  }
  return gridString;
}