import React, { ReactNode, useEffect, useState } from 'react'
import { Layout } from '../../../src/components/Layout';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { GetStore, SaveStore, GetManageDetail } from '../../../src/utils/store/store';
import { useUpdateShoreExcursionMutation } from '../../../src/services/itinerary/itinerary';
import Glider from 'react-glider';
import 'glider-js/glider.min.css';
import Modal from '../../../src/components/UI/ModalCenter';
import { ADD_ADULT, ADD_CHILDREN, REMOVE_ADULT, REMOVE_CHILDREN } from '../../../src/constants/itineraryConstants';
import ReadMore from '../../../src/utils/read';
import { FormatAmount, FormatPrice } from '../../utils/formatter/formatter';
import "../shoreExcursion/index.css"
import ShoreExcursionHeader from './shoreExHeader';
// @ts-ignore
import { TiggerGAAddToCartCabin, TiggerGAViewItem } from '/src/components/Analytics/events';
import toast, { Toaster } from 'react-hot-toast';
import index from '../mumbaiCruises';
import DebouncedInput from '../cms/coupon/debounceInput';
import Button from '../../components/UI/Button';

type Props = {}

const toDate = (dateStr: any) => {
  if (dateStr) {
    const [day, month, year] = dateStr.split("/")
    return [null, month, day, year];
  } else return new Date().toDateString().split(' ')
}

export const DEFAULT_SHORE_EX: any = {
  adults_count: 0,
  children_count: 0,
  infants_count: 0,
  id: '',
  guests: [],
};

export const isAdultDisable = (selected: any, total: any, totalAdultCount: any) => {
  if (selected === total || total === totalAdultCount) {
    return true;
  } else return false;
}
export const isChildrenDisable = (selected: any, total: any, totalChildrenCount: any) => {
  if (selected === total || totalChildrenCount === total) {
    return true;
  } else return false;
}

export default function Offers({ }: Props) {
  const store = GetStore();
  const Itinerary = store.itinerary
  let navigate = useNavigate()
  // let { state } = useLocation()
  const GAStore = store.GAData
  const [shoreEx, setShoreEx] = useState([])
  const [tempShoreEx, setTempShoreEx] = useState([])
  const [Loading, setLoading] = useState(false)
  const [SelectedPort, setSelectedPort] = useState();
  const [SelectedGST, setSelectedGST] = useState(0);
  const [activePortIndex, setActivePortIndex] = useState(0);
  const [activePortID, setActivePortID] = useState('');
  const [Inclusive, setInclusive] = useState('')
  const [guestModal, setGuestModal] = useState(false)
  const [selectedShoreEx, setSelectedShoreEx] = useState<undefined>();
  const [selectedShoreExIndex, setSelectedShoreExIndex] = useState();
  const [shoreExAmount, setShoreExAmount] = useState([]);
  const [breakupModal, setBreakupModal] = useState(false);
  const [updateShoreExcursion] = useUpdateShoreExcursionMutation()
  const [data, setData] = useState([])
  const ManageDetail = GetManageDetail();
  const [selectedCount, setSelectedCount] = useState(0);
  const [selectedChildCount, setSelectedChildCount] = useState(0);

  const [gestRecord, setGestRecord] = useState([{ id: '', index: 0, items: [] }])
  const [checkBoxData, setCheckBoxData] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [guestChild, setGuestChild] = useState([{ id: '', index: 0, items: [] }]);
  const [start_date, end_date] = ManageDetail?.getBooking?.sailing_date.split(" - ");
  const [currentShoreID, setCurrentShoreID] = useState('')

  const [gestTempRecord, setGestTempRecord] = useState([])
  const [guestTempChild, setGuestTempChild] = useState([]);
  const [portIndex, setPortIndex] = useState('')
  const [shoreExIndex, setShoreExIndex] = useState('')
  const [proceedButton, setProceedButton] = useState([])

  const [guestChildClone, setGuestChildClone] = useState([]);
  const [gestRecordClone, setGestRecordClone] = useState([])
  const [proceedButtonClone, setProceedButtonClone] = useState([])
  const [isExpanded, setIsExpanded] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}api/v2/bookings/${ManageDetail?.getBooking?.id}/shore_excursions`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      console.log(err, "Error");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Update the selected count whenever the selection changes


    // const count = gestRecord.filter((v) => v.selected).length;
    const count = gestRecord.find((a) => a.id === activePortID)?.items?.filter((v) => v.selected).length;
    setSelectedCount(count);
  }, [gestRecord, activePortID]);

  useEffect(() => {
    // Update the selected count whenever the selection changes
    // const count = guestChild.filter((v) => v.selected).length;
    const count = guestChild.find((a) => a.id === activePortID)?.items?.filter((v) => v.selected).length;
    setSelectedCount(count);
    setSelectedChildCount(count);
  }, [guestChild, activePortID]);


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (breakupModal || guestModal)
      document.body.classList.add('!overflow-hidden');
    else document.body.classList.remove('!overflow-hidden');
  }, [breakupModal, guestModal]);


  useEffect(() => {
    if (ManageDetail?.getBooking && ManageDetail?.getBooking?.rooms && ManageDetail?.getBooking?.itinerary) {

      let newArray = [];
      if (data?.ports?.length) {
        newArray = data && data?.ports && data?.ports?.map((item: any) => {
          return {
            ...item,
            shore_excursions: item?.shore_excursions?.map((excursion: any) => {
              return {
                ...excursion,
                adult_price: excursion.adult_price,
                children_price: 0,
                adults: item.remaining_pax_to_book?.adult,
                children: item.remaining_pax_to_book?.children,
              };
            }),
          };
        });

        setShoreEx(JSON.parse(JSON.stringify(newArray)));
        setTempShoreEx(newArray);
      }
    }
  }, [data?.ports]);

  useEffect(() => {
    let val = data && data?.ports && data?.ports[activePortIndex]
    setSelectedPort(val?.port_name)
    setSelectedGST(val?.gst_pct)
  }, [activePortIndex, shoreEx])

  useEffect(() => {
    if (!SelectedPort) {
      setSelectedPort(tempShoreEx[0]?.port_name)
      setSelectedGST(tempShoreEx[0]?.gst_pct)
    }
  }, [tempShoreEx])


  const InclusiveDetail = () => {
    if (Inclusive) {
      let x = Inclusive.terms[0].split('_');
      return x.map((v: any, i: any) =>
        <div className='flex mb-2'>
          <img className='mr-2 h-4 mt-1' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/tick-icon.svg" alt="" />
          <p className='text-sm font-semibold'>{v}</p>
        </div>
      )
    }
  }

  if (Loading) {
    return <p>Loading...</p>
  }

  useEffect(() => {
    const guestsArray = [];
    const gestChild = [];

    if (gestRecord.find((a) => a.id === activePortID)?.items?.length > 0) {
      ManageDetail?.getBooking?.rooms.forEach((room, roomIndex) => {
        if (Array.isArray(room.guest_details)) {
          room.guest_details.forEach((guest, guestIndex) => {
            const existingGuest = gestRecord.find((a) => a.id === activePortID)?.items?.find(
              (record) => record.id === guest.id
            );
            const guestData = {
              ...guest,
              selected: existingGuest ? existingGuest.selected : false,
            };
            if (guest.type === 'ADULT') {
              guestsArray.push(guestData);
            }
          });
        }
      });
    } else if (gestRecord.find((a) => a.id === activePortID)?.items?.length === 0) {
      ManageDetail?.getBooking?.rooms.forEach((room, roomIndex) => {
        if (Array.isArray(room.guest_details)) {
          room.guest_details.forEach((guest, guestIndex) => {
            const existingGuest = gestRecord.find((a) => a.id === activePortID)?.items?.find(
              (record) => record.id === guest.id
            );
            const guestData = {
              ...guest,
              selected: existingGuest ? existingGuest.selected : false,
            };
            if (guest.type === 'ADULT') {
              guestsArray.push(guestData);
            }
          });
        }
      });
    }

    if (guestChild.find((a) => a.id === activePortID)?.items?.length > 0) {
      ManageDetail?.getBooking?.rooms.forEach((room, roomIndex) => {
        if (Array.isArray(room.guest_details)) {
          room.guest_details.forEach((guest, guestIndex) => {
            const existingChildGuest = guestChild.find((a) => a.id === activePortID)?.items?.find(
              (record) => record.id === guest.id
            );
            const guestData = {
              ...guest,
              selected: existingChildGuest ? existingChildGuest.selected : false,
            };
            if (guest.type === "CHILD") {
              gestChild.push(guestData);
            }
          });
        }
      });
    } else if (guestChild.find((a) => a.id === activePortID)?.items?.length === 0) {
      ManageDetail?.getBooking?.rooms.forEach((room, roomIndex) => {
        if (Array.isArray(room.guest_details)) {
          room.guest_details.forEach((guest, guestIndex) => {
            const existingChildGuest = guestChild.find((a) => a.id === activePortID)?.items?.find(
              (record) => record.id === guest.id // Assuming guest has an 'id' to uniquely identify them
            );
            const guestData = {
              ...guest,
              selected: existingChildGuest ? existingChildGuest.selected : false, // Maintain selection if previously selected
            };
            if (guest.type === "CHILD") {
              gestChild.push(guestData);
            }
          });
        }
      });

    } else {
      ManageDetail?.getBooking?.rooms.forEach((room, roomIndex) => {
        const errors = []
        if (Array.isArray(room.guest_details)) {
          room.guest_details.forEach((guest, guestIndex) => {
            // if (!guest.first_name || !guest.last_name) {
            //   errors.push(
            //     `Room ${roomIndex + 1}, Guest ${guestIndex + 1}: Please fill guest name.`
            //   );
            // } else {
            const guestData = {
              ...guest,
              selected: false,
            };

            // Separate Adults and Children
            if (guest.type === 'ADULT') {
              guestsArray.push(guestData);
            } else if (guest.type === 'CHILD') {
              gestChild.push(guestData);
            }
            // }
          });
        }
      });
    }

    const updatedGuests = shoreEx.map((a, index) => {
      const alreadyBooked = data.ports?.find((b) => b.port_id === a.port_id)?.booked_guest_ids?.map((c) => c.guest_id) || [];

      return {
        id: a.port_id,
        index,
        adultItems: guestsArray?.filter((d) => !alreadyBooked.includes(d.id)) || [],
        childItems: gestChild?.filter((d) => !alreadyBooked.includes(d.id)) || []
      };
    });

    // Separate the adult and child guests into respective arrays
    const updatedAdultGuests = updatedGuests.map(({ id, index, adultItems }) => ({ id, index, items: adultItems }));
    const updatedChildGuests = updatedGuests.map(({ id, index, childItems }) => ({ id, index, items: childItems }));

    setGestRecord(updatedAdultGuests);
    setGuestChild(updatedChildGuests);


  }, [shoreEx, data])


  const onSelectGuest = (portIndex: any, shoreExIndex: any, id: any) => {

    const guestsArray = [];
    const errors = [];
    setShoreExIndex(shoreExIndex);
    setPortIndex(portIndex)
    ManageDetail?.getBooking?.rooms.forEach((room, roomIndex) => {
      if (Array.isArray(room.guest_details)) {
        room.guest_details.forEach((guest, guestIndex) => {
          if (!guest.first_name || !guest.last_name) {
            errors.push(`Room ${roomIndex + 1}, Guest ${guestIndex + 1}: Please fill guest name.`);
          } else {
            guestsArray.push({
              ...guest,
            });
          }
        });
      }
    });
    if (errors.length > 0) {
      setSelectedIndex(null);
      toast.error('Please fill all guest details', {
        duration: 3000,
        position: 'top-center',
      });
      return;
    }

    setCurrentShoreID(id)
    setGuestModal(true);

    setSelectedShoreEx(shoreEx[portIndex].shore_excursions[shoreExIndex]);
    setSelectedShoreExIndex(shoreExIndex);

    setGestRecordClone(gestRecord);
    setGuestChildClone(guestChild);
    setProceedButtonClone(proceedButton);

  };

  let indexsss = shoreEx.findIndex((x: any) => x.port_name === SelectedPort);

  const onSelectAll = (isChecked: boolean, type: string, activePortID: string) => {
    // const shore = shoreEx[portIndex]?.shore_excursions[shoreExIndex];
    const shore = shoreEx.find((a) => a.port_id === activePortID)?.shore_excursions[shoreExIndex]
    const GAItem = {
      item_id: shore.id,
      item_name: shore.title,
      item_category: `${shore.adult_price} adult price`,
      item_category2: `${shore.child_price} children price`,
      item_category3: shore.code,
      item_list_name: shore.description,
      item_variant: "shore excursion",
      price: 0,
    };

    const GADataShore = {
      currency: "INR",
      adult_price: shore.adult_price,
      child_price: shore.child_price,
      code: shore.code,
      value: FormatAmount(
        Math.round(ManageDetail?.getBooking?.sub_total) +
        shoreExAmount?.adult +
        shoreExAmount?.children
      ),
      items: GAItem,
    };

    if (type === "adult") {
      setGestTempRecord(gestRecord)
      const gestRecordData2 = [...gestRecord]

      const gestRecordData3 = gestRecordData2.map((item) => {
        let newItem = { ...item };
        if (newItem.id === activePortID) {
          newItem.items = newItem.items.map((item2) => {
            let newItem2 = { ...item2 };
            newItem2.selected = isChecked;
            newItem2.shoreId = isChecked ? currentShoreID : null;
            newItem2.GADataShore = isChecked ? GADataShore : null;

            return newItem2;
          });
        }
        return newItem;
      });
      setGestRecord(gestRecordData3);

      // Update setProceedButton
      setProceedButton((prev) => {
        // Flatten all items in gestRecordData3 to a single array
        const allItems = gestRecordData3.flatMap((item) => item.items);
        const filtered = prev.filter(
          (btn) => !allItems.some((itm) => itm.id === btn.id)
        );
        const selectedItems = allItems.filter((itm) => itm.selected);

        return isChecked ? [...filtered, ...selectedItems] : filtered;
      });

    } else if (type === "children") {
      setGuestTempChild(guestChild)
      const guestChildData2 = [...guestChild]

      const guestChildData3 = guestChildData2.map((item) => {
        let newItem = { ...item };
        if (newItem.id === activePortID) {
          newItem.items = newItem.items.map((item2) => {
            let newItem2 = { ...item2 };

            newItem2.selected = isChecked;
            newItem2.shoreId = isChecked ? currentShoreID : null;
            newItem2.GADataShore = isChecked ? GADataShore : null;

            return newItem2;
          });
        }
        return newItem;
      });
      setGuestChild(guestChildData3);

      // Update setProceedButton
      setProceedButton((prev) => {
        // Flatten all items in guestChildData3 to a single array
        const allItems = guestChildData3.flatMap((item) => item.items);
        const filtered = prev.filter(
          (btn) => !allItems.some((itm) => itm.id === btn.id)
        );
        const selectedItems = allItems.filter((itm) => itm.selected);

        return isChecked ? [...filtered, ...selectedItems] : filtered;
      });

    }

  };

  const onSelectShoreEx = (isChecked, index, type, activePortID) => {
    const shore = shoreEx.find((a) => a.port_id === activePortID)?.shore_excursions[shoreExIndex]
    const GAItem = {
      item_id: shore.id,
      item_name: shore.title,
      item_category: `${shore.adult_price} adult price`,
      item_category2: `${shore.child_price} children price`,
      item_category3: shore.code,
      item_list_name: shore.description,
      item_variant: 'shore excursion',
      price: 0,
    };

    const GADataShore = {
      currency: "INR",
      adult_price: shore.adult_price,
      child_price: shore.child_price,
      code: shore.code,
      value: FormatAmount(
        Math.round(ManageDetail?.getBooking?.sub_total) + shoreExAmount?.adult + shoreExAmount?.children
      ),
      items: GAItem,
    };

    if (type === "adult") {
      setGestTempRecord(gestRecord)
      const gestRecordData2 = [...gestRecord]

      const gestRecordData3 = gestRecordData2.map((item) => {
        let newItem = { ...item };
        if (newItem.id === activePortID) {
          newItem.items = newItem.items.map((item2, indexValue) => {
            let newItem2 = { ...item2 };

            if (index === indexValue) {
              newItem2.selected = isChecked;
              newItem2.shoreId = isChecked ? currentShoreID : null;
              newItem2.GADataShore = isChecked ? GADataShore : null;
            }

            return newItem2;
          });
        }
        return newItem;
      });
      setGestRecord(gestRecordData3);

      // Update setProceedButton
      setProceedButton((prev) => {
        // Flatten all items in gestRecordData3 to a single array
        const allItems = gestRecordData3.flatMap((item) => item.items);
        const filtered = prev.filter(
          (btn) => !allItems.some((itm) => itm.id === btn.id)
        );
        const selectedItems = allItems.filter((itm) => itm.selected);
        return [...filtered, ...selectedItems];

        // return isChecked ? [...filtered, ...selectedItems] : filtered;
      });

    } else if (type === "children") {
      setGuestTempChild(guestChild)
      const guestChildData2 = [...guestChild]

      const guestChildData3 = guestChildData2.map((item) => {
        let newItem = { ...item };
        if (newItem.id === activePortID) {
          newItem.items = newItem.items.map((item2, indexValue) => {
            let newItem2 = { ...item2 };

            if (index === indexValue) {
              newItem2.selected = isChecked;
              newItem2.shoreId = isChecked ? currentShoreID : null;
              newItem2.GADataShore = isChecked ? GADataShore : null;
            }

            return newItem2;
          });
        }
        return newItem;
      });
      setGuestChild(guestChildData3);

      // Update setProceedButton
      setProceedButton((prev) => {
        // Flatten all items in guestChildData3 to a single array
        const allItems = guestChildData3.flatMap((item) => item.items);
        const filtered = prev.filter(
          (btn) => !allItems.some((itm) => itm.id === btn.id)
        );
        const selectedItems = allItems.filter((itm) => itm.selected);

        return [...filtered, ...selectedItems]
      });

    }
  };

  useEffect(() => {
    if (shoreEx) {
      let a: any = {
        'port_code': [],
        'adult': 0,
        'children': 0,
      }
      shoreEx.map((port, idx) => {
        port.shore_excursions.map((ex, idxx) => {
          if (ex.adult_count || ex.children_count) {
            let ab = {
              code: ex.code,
              adult: ex.adult_count,
              children: ex.children_count
            }
            a.port_code.push(ab)
            a.adult = a.adult + (ex.adult_price * ex.adult_count)
            a.children = a.children + (ex.child_price * ex.children_count)
          }
        })
      })
      setShoreExAmount(a)
    }
  }, [shoreEx])

  const skip = () => {
    // navigate('/payment-summary?booking_id=' + store?.booking?.id)
  }

  const saveGuestSelection = () => {
    setGuestModal(false)

  }

  const cancelGuestSelection = () => {

    setGuestModal(false)

    setGestRecord(gestRecordClone)
    setGuestChild(guestChildClone)
    setProceedButton(proceedButtonClone)

  }

  const uniqueCodes = [...new Set(proceedButton.map(item => item.GADataShore.code))];

  const grandTotal = proceedButton.reduce((total, item) => {
    const adultPrice = item?.GADataShore?.adult_price || 0;
    const childrenPrice = item?.GADataShore?.child_price || 0;
    const adultCount = item.type === 'ADULT' ? 1 : 0;
    const childrenCount = item.type === 'CHILD' ? 1 : 0;

    // Add the price for this entry to the total
    return total + (adultCount * adultPrice) + (childrenCount * childrenPrice);
  }, 0);


  const handelProceed = async () => {
    const uniqueCodes = [...new Set(proceedButton.map(item => item.GADataShore.code))];
    const update_shore_excursions = {
      shore_excursions: uniqueCodes.map((code) => {
        const matchingEntries = proceedButton.filter(
          (btn) => btn.GADataShore?.code === code
        );

        if (matchingEntries.length > 0) {
          return {
            id: matchingEntries[0].GADataShore.items.item_id,
            guests: matchingEntries.map((entry) => ({
              id: entry.id,
            })),
          };
        }
        return null;
      }).filter(Boolean),
    };
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}api/v2/bookings/${ManageDetail?.getBooking?.id}/update_shore_excursions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(update_shore_excursions),
        }
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      if (response.status === 200) {
        const res = await response.json();
        navigate('/manage-booking/payment-summery', { state: { type: "shore_excusions", upgradeShore_data: res, guestRecord: proceedButton } });
      }
    } catch (err) {
      console.log(err, "Error");
    }

  }

  const gestRecordData = gestRecord.find((a) => a.id === activePortID)?.items || []
  const guestChildData = guestChild.find((a) => a.id === activePortID)?.items || []

  const ItineraryName = () => {
    if (ManageDetail?.getBooking?.nights > 5) {
      return (
        <p className="text-base font-bold">
          {ManageDetail?.getBooking?.ports[0]} -&nbsp;
          {ManageDetail?.getBooking?.ports[ManageDetail?.getBooking?.ports.length - 1]}
        </p>
      )
    } else {
      return (
        ManageDetail?.getBooking?.ports.map((val: any, i: number) => (
          <p key={i} className="text-base font-bold">
            {val}
            {i !== ManageDetail?.getBooking?.ports.length - 1 && <span> -&nbsp;</span>}
          </p>
        ))
      )

    }
  }
  const portList = ManageDetail?.getBooking?.ports
    .filter((val: any) => val !== 'At Sea')
    .map((val: any) => val)
    .join(' | ');

  const isLong = portList?.length > 150;
  console.log('roh ManageDetail?.getBooking', ManageDetail?.getBooking);

  return (
    <Layout>
      <div className='bg-gray-100/5'>
        <main className="container mx-auto py-16 lg:pt-36 lg:pb-28 relative grid grid-cols-3 gap-4">
          <div className="mx-4 lg:pb-0 lg:py-0 lg:col-span-1 hidden lg:block w-full mb-[18rem] md:mb-72">
            <div className='fixed lg:sticky lg:top-36 lg:bottom-40 left-0 lg:left-auto'>
              <div className='mb-12 flex items-center cursor-pointer' onClick={() => navigate(-1)}>
                <img
                  src="https://images.cordeliacruises.com/cordelia_v2/public/assets/back-arrow-icon.svg"
                  alt="arrow"
                  onClick={() => navigate(-1)}
                  className={`self-center mt-1 justify-self-start mr-2 h-6 p-1 cursor-pointer`}
                />
                <h1 className="text-xl font-bold lg:text-2xl ">
                  Shore Excursions
                </h1>
              </div>

              <div className='grid grid-cols-1 lg:grid-cols-1 border-b-2 lg:border-none lg:mb-3.5 bg-white z-10 lg:z-0 w-full lg:w-11/12 shadow-[rgba(0,_0,_0,_0.15)_0px_0px_7px_2px] rounded-lg'>
                {/* <div className=' text-center text-[#EA725B] mt-[-30px] bg-[#EA725B1A]'>Booking ID: {state?.getBooking?.number}</div> */}
                <div className='grid grid-cols-10 lg:pt-6 pb-0 pt-5'>

                  <div className='px-4 col-span-10 lg:col-span-10'>
                    <div className='flex items-center'>
                      <img
                        src="assets/icons/footer/chevon-down.svg"
                        alt="arrow"
                        onClick={() => navigate(-1)}
                        className={`mt-1 col-span-1 mr-2 bg-brand-primary h-4 w-4 p-1 rounded-full rotate-90 lg:hidden`}
                      />

                      {/* <p className='text-sm col-span-8 font-bold leading-5 lg:text-lg'>{Itinerary?.map((port: any, index: number) => {
                          return (
                            <span key={index}>
                              <span>{port['name']}</span>
                              {index < Itinerary?.ports?.length - 1 && (
                                <span className="mx-1">-</span>
                              )}
                            </span>
                          );
                        })}</p> */}
                    </div>
                    {ItineraryName()}
                    <div className='flex mt-3'>
                      <div className='flex items-center'>
                        <img
                          src="https://images.cordeliacruises.com/cordelia_v2/public/assets/time-purple-icon.svg"
                          className="h-3 mr-1 mt-0.5 lg:h-4"
                          alt="Cruise"
                        />
                        <p className="text-xs lg:text-base font-semibold">
                          {toDate(start_date)[2]} {toDate(start_date)[1]} {toDate(start_date)[3]}
                        </p>
                      </div>
                      <div className='mx-3'>
                        <p className='text-xl'>-</p>
                      </div>
                      <div className='flex items-center justify-end'>
                        <p className="text-xs lg:text-base font-semibold">
                          {toDate(end_date)[2]} {toDate(end_date)[1]} {toDate(end_date)[3]}
                        </p>
                      </div>
                    </div>
                    <div className="flex mt-3">
                      <img
                        src="https://images.cordeliacruises.com/cordelia_v2/public/assets/room-icon.svg"
                        className="h-3 mr-1 mt-0.5 lg:h-4"
                        alt="Cruise"
                      />
                      <p className="text-xs lg:text-base font-semibold">
                        {`${ManageDetail?.getBooking?.rooms?.length} Rooms`}
                      </p>
                    </div>
                  </div>
                  <div className='px-4 col-span-10 lg:col-span-10'>
                    <div className='border-t border-gray-300 w-full my-2.5' />
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                      <div className='flex flex-col items-start'>
                        <p className="text-xs lg:text-sm font-medium text-gray-100">
                          Visiting Ports:
                        </p>
                        <div className="">
                          <span
                            className={`text-xs lg:text-sm font-medium !leading-5`}
                          >
                            <span className="text-xs lg:text-sm font-medium !leading-5">
                              {isLong && !isExpanded ? portList?.slice(0, 60) + '...' : portList}
                            </span>
                          </span>
                          {isLong && (
                            <span
                              onClick={() => setIsExpanded(prev => !prev)}
                              className="text-xs lg:text-sm text-brand-primary font-bold ml-2 cursor-pointer inline-block"
                            >
                              {isExpanded ? 'View less' : 'View more'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='border-b col-span-10 mt-4 mb-2 border-gray-100/20' />
                  <div className='px-4 col-span-10 lg:col-span-10 mt-3'>
                    <div className='flex flex-col  justify-between'>
                      <div>
                      </div>
                    </div>
                    {proceedButton.length ?
                      <div>
                        <div className='flex items-center justify-between mt-2'>
                          <p className="text-sm font-semibold">
                            Shore Excursions
                          </p>
                          <p className="text-sm font-semibold">
                            {`₹ ${FormatAmount(grandTotal)}`}
                          </p>
                        </div>
                        <div className='flex items-center justify-between mt-2'>
                        </div>

                        {uniqueCodes.map((code, i) => {
                          const adultCount = proceedButton.filter(item => item.GADataShore.code === code && item.type === 'ADULT').length;
                          const childrenCount = proceedButton.filter(item => item.GADataShore.code === code && item.type === 'CHILD').length;

                          const adultPrice = proceedButton.find(item => item.GADataShore?.code === code)?.GADataShore?.adult_price || 0;
                          const childrenPrice = proceedButton.find(item => item.GADataShore?.code === code)?.GADataShore?.child_price || 0;
                          const totalPrice = (adultCount * adultPrice) + (childrenCount * childrenPrice);

                          return (
                            <div key={i} className='flex items-center justify-between mt-2'>
                              <p className="text-sm font-semibold">

                                {code} : <span className='text-gray-100 text-sm'>{adultCount == 0 ? null : `Adult x ${adultCount}`},{childrenCount == 0 ? null : `Children x ${childrenCount}`}  </span>
                              </p>
                              <p className="text-sm font-semibold">{`₹ ${FormatAmount(totalPrice)}`}</p>

                            </div>
                          );
                        })}


                      </div>
                      : null}
                  </div>
                </div>
                <div className='grid grid-cols-1 lg:mt-4 bg-brand-sky/5 px-2 py-2'>
                  <p className='text-xs font-semibold'>(Excl. GST charges)</p>
                </div>
                {proceedButton.length ?
                  <div>
                    <div className='flex items-center justify-between px-4 py-4'>
                      <p className="text-lg font-bold">
                        Total Fare
                      </p>
                      <div>
                        <p className="text-lg font-bold text-brand-primary">

                          {`₹ ${FormatAmount(grandTotal)}`}
                        </p>
                      </div>
                    </div>
                  </div>
                  : null}

              </div>
              {proceedButton.length ?
                <div className='text-white grid grid-cols-1 lg:grid-cols-1 border-b-2 lg:border-none lg:mb-3.5 z-10 lg:z-0 w-full lg:w-11/12 shadow-[rgba(0,_0,_0,_0.15)_0px_0px_7px_2px] rounded-lg  mt-4 bg-brand-primary text-center py-2.5 rounded cursor-pointer disabled:bg-brand-primary/30' onClick={handelProceed}>
                  <button>Proceed</button>
                </div> :
                null
              }

            </div>
          </div>


          <div className="mx-4 mb-4 lg:col-span-2 col-span-3 lg:mt-0 ">
            <div className="mt-4 lg:mt-0 flex justify-end items-center">
              <div className="cursor-pointer flex justify-between items-center w-full lg:w-auto">
                <div className='flex items-center lg:hidden' onClick={() => navigate(-1)}>
                  <img src="assets/icons/footer/chevon-down-black.svg" className='rotate-90 mr-2 mt-0.5' alt="" />
                  <h1 className="text-lg font-medium">
                    Shore Excursions
                  </h1>
                </div>
              </div>
            </div>
            <div className='mt-6 lg:mt-8'>
              <div className=''>
                {
                  data?.length != 0 ? <ShoreExcursionHeader ports={data?.ports} callback={(e) => {
                    setActivePortIndex(e)
                    setActivePortID(data?.ports[e].port_id)
                  }} /> : []
                }
              </div>
              <div className='bg-white top-shadow1'>
                <div className='grid grid-cols-1 lg:px-8 pt-6 lg:pt-8'>
                  {shoreEx[indexsss]?.shore_excursions ? shoreEx[indexsss]?.shore_excursions.map((v: any, i: number) => {
                    const adu = v?.adults?.every(adult => adult.selected === true)
                    const selectedGuestAdult = gestRecordData.filter((adult => adult.shoreId == v.id))
                    const selectedGuestAdu = gestRecordData.filter((adult => adult.selected == true))
                    const selectedGuestChil = guestChildData.filter((adult => adult.selected == true))
                    const selectedGuestChild = guestChildData.filter((adult => adult.shoreId == v.id))
                    const totalGuest = gestRecordData.length + guestChildData.length
                    const totalGuestSelected = selectedGuestAdu.length + selectedGuestChil.length
                    // const chil = v?.children?.every(children => children.selected === true)
                    return (
                      <div key={i} className='lg:shadow-[rgba(67,_71,_85,_0.25)_0px_0px_0.25em,_rgba(90,_125,_188,_0.05)_0px_0.25em_1em] lg:rounded-md relative grid grid-cols-9 lg:mb-8 border-b border-gray-100/40 lg:border-none mb-6' key={i}>
                        <div className='lg:col-span-4 col-span-9 shore-ex grid grid-cols-9'>
                          <div className='col-span-4 lg:col-span-9 min-h-[230px] lg:min-h-[400px] shoreEx'>
                            <Glider
                              hasArrows
                              hasDots
                              scrollLock
                              slidesToShow={1}
                            >
                              {v.images.map((v: any, i: number) =>
                                <img key={i} className='w-full h-full min-h-[230px] lg:min-h-[400px] rounded-l-md' src={v} placeholder='' />
                              )}
                            </Glider>
                          </div>
                          <div className='col-span-5 lg:hidden px-3 py-2'>
                            <h1 className='text-sm font-bold'>{v.title}</h1>
                            <div className='mt-2'>
                              <ReadMore text={v.description} />
                            </div>
                          </div>
                        </div>
                        <div className='lg:col-span-5 col-span-9 pb-3 lg:pt-3 pt-0 relative'>
                          <div className='col-span-2 px-4 hidden lg:block'>
                            <p className='text-base font-bold'>{v.title}</p>
                            <div className='mt-2'>
                              <ReadMore text={v.description} />
                            </div>
                          </div>
                          {!v.children_allowed ?
                            <div className='px-4 lg:mt-3 mb-3 lg:mb-0 flex items-center lg:border-none lg:border-t border-gray-100/20 pt-5 lg:pt-0'>
                              <img className='h-4 mr-1' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/child-not-allowed-icon.svg" alt="" />
                              <p className='text-xs underline font-semibold'>Child below 12 years are not allowed</p>
                            </div>
                            : null
                          }
                          <div className='lg:absolute lg:bottom-0 lg:right-0 w-full lg:py-4'>
                            <div className='lg:border-b col-span-10 border-gray-100/20 lg:mb-3 mb-1 lg:mt-3 mt-0' />
                            <div className='px-4 py-2 lg:py-0'>
                              <div className='flex justify-between items-center'>
                                <h1 className='text-xs font-semibold'>Transferred by: <span
                                  className='text-brand-primary font-bold'>{v.transfer_types[0]?.name}</span></h1>
                                <p className='text-sm font-bold'>₹ {v.adult_price} / Adult</p>
                              </div>
                              <div className='flex justify-between items-center mt-1 lg:mt-0'>
                                <h1 className='text-xs font-semibold'>Capacity: <span>{v.remaining_capacity}/{v.total_capacity}</span></h1>
                                {v.children_allowed ?
                                  <p className='text-sm font-bold'>₹ {v.child_price} / Children</p>
                                  : null}
                              </div>
                              <div className='flex justify-between items-center mt-3'>
                                <div>
                                  <Button
                                    text={
                                      selectedGuestAdult.length || selectedGuestChild.length
                                        ? 'View Guest'
                                        : 'Select Guests'
                                    }
                                    size="sm"
                                    disabled={totalGuest === totalGuestSelected && !(selectedGuestAdult.length || selectedGuestChild.length)}
                                    type={
                                      selectedGuestAdult.length || selectedGuestChild.length
                                        ? 'primary'
                                        : 'secondary'
                                    }
                                    handleClick={() => {
                                      setSelectedIndex(i);
                                      onSelectGuest(indexsss, i, v.id);
                                    }}
                                  />
                                </div>
                                <div>
                                  <button className="bg-gray-200/20 font-semibold px-4 lg:px-4 py-2 rounded text-xxs">
                                    {selectedGuestAdult.length ? `Adult ${selectedCount}` : 'Adult'}
                                  </button>
                                </div>
                                {v.children_allowed ?
                                  <div>
                                    <button className="bg-gray-200/20 font-semibold px-4 lg:px-4 py-2 rounded text-xxs">
                                      {selectedGuestChild.length ? `Children ${selectedChildCount}` : 'Children'}
                                    </button>
                                  </div>
                                  : null}
                              </div>
                              <div className='mt-3 flex'>
                                <p className='font-semibold cursor-pointer text-brand-primary text-xs lg:text-sm' onClick={() => setInclusive(v)}
                                >Tour Instructions</p>
                                <img className='w-4 ml-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/info-color-icon.svg" alt="" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }) : null}
                </div>
              </div>
            </div>
          </div>

          <Modal show={!!Inclusive} align={'center'} className="max-h-[60%] h-full drop-shadow bg-white w-[90%] lg:w-2/4 center bottom-2/4 rounded-lg lg:rounded border overflow-hidden left-0 right-0 m-auto" onClose={() => setInclusive()}>
            <div className='border-b border-gray-300 p-4 mb-4 flex items-center justify-between'>
              <h1 className='text-base font-semibold'>Tour Instructions</h1>
              <svg
                onClick={() => setInclusive('')}
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-black cursor-pointer"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className='px-6 pb-3 lg:h-[98%] h-[82%] overflow-y-scroll'>
              <InclusiveDetail />
            </div>
          </Modal>


          <Modal show={guestModal} align={'center'} className="max-h-[75vh] lg:max-h-[80vh] h-full drop-shadow bg-white w-[90%] lg:w-6/12 center bottom-2/4 rounded-lg lg:rounded-2xl border overflow-hidden left-0 right-0 m-auto" onClose={() => cancelGuestSelection()}>
            <div className='relative h-full'>
              <div className='top-0 w-full'>
                <div className='pt-2 lg:pt-6 pb-2 lg:pb-5 px-4 lg:px-6 flex lg:items-center justify-between'>
                  <h1 className='text-base lg:text-xl font-semibold'>{selectedShoreEx?.title}</h1>
                  <svg
                    onClick={() => cancelGuestSelection()}
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-black cursor-pointer mt-1 lg:mt-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className='px-4 lg:px-6'>
                  <div className='flex'>
                    <div onClick={() => document.getElementById('adults')?.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                      inline: 'start'
                    })}
                      className=' cursor-pointer px-3 lg:px-5 py-1.5 rounded text-xs lg:text-base text-gray-100 font-semibold'
                      style={{
                        border: 'double 2px transparent',
                        backgroundImage: 'linear-gradient(#fff, #fff), linear-gradient(99.72deg, #92278f -17.25%, #ea725b 105.93%)',
                        backgroundOrigin: 'border-box',
                        backgroundClip: 'padding-box, border-box',
                      }}
                    >
                      Adult <span className='text-brand-primary text-sm lg:text-lg font-semibold'>{gestRecordData.length}</span> / {selectedCount}
                    </div>
                    {selectedShoreEx?.children_allowed ?
                      <div onClick={() => document.getElementById('children')?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                        inline: 'start'
                      })}
                        className='border lg:border-2 cursor-pointer border-brand-primary px-5 py-1 lg:py-1.5 rounded text-xs lg:text-base text-gray-100 font-semibold ml-4'
                        style={{
                          border: 'double 2px transparent',
                          backgroundImage: 'linear-gradient(#fff, #fff), linear-gradient(99.72deg, #92278f -17.25%, #ea725b 105.93%)',
                          backgroundOrigin: 'border-box',
                          backgroundClip: 'padding-box, border-box',
                        }}
                      >
                        Children <span className='text-brand-primary text-sm lg:text-lg font-semibold'>{guestChildData.length}</span> / {selectedChildCount}
                      </div>
                      : null}
                  </div>
                </div>
                <div className='flex bg-brand-sky/10 px-6 py-1.5 mt-4 mb-3'>
                  <img className='w-4 mr-2' src="https://images.cordeliacruises.com/cordelia_v2/public/assets/info-color-icon.svg" alt="" />
                  <p className='text-xs lg:text-sm font-semibold'>Each Guest Is Limited To Selecting A Single Shore Excursion Per Port</p>
                </div>
              </div>
              <div className='pb-3 h-[calc(100%-270px)] overflow-y-scroll'>
                <div id='adults' className='px-4 lg:px-6'>
                  <div className='flex items-center mb-4'>
                    <h1 className='text-lg lg:text-xl font-semibold'>Adult</h1>
                    <div className='flex items-start ml-6'>
                      <input
                        checked={gestRecordData.every((a) => a.selected && a.shoreId == currentShoreID)}
                        disabled={gestRecordData.some((a) => a.selected && a.shoreId != currentShoreID)}
                        type="checkbox"
                        className="rounded-sm cursor-pointer w-4 h-4 lg:w-5 lg:h-5 text-brand-primary"
                        onChange={(e) => {
                          onSelectAll(e.target.checked, 'adult', activePortID);
                        }}
                      />
                      <p className={`text-xs lg:text-sm ml-2 font-medium text-gray-600`}>Select All</p>
                    </div>
                  </div>
                  {gestRecordData?.map((v, i) => (
                    <div key={i}>
                      <div className='flex items-center mb-3'>
                        <input
                          checked={v.selected}
                          disabled={v.selected == true && currentShoreID !== v.shoreId}
                          type="checkbox"
                          className={`rounded-sm mr-3 cursor-pointer w-5 h-5 lg:w-6 lg:h-6 disabled:text-brand-primary/40 `}
                          onChange={(e) => {
                            onSelectShoreEx(e.target.checked, i, 'adult', activePortID);
                          }}
                        />
                        <p className={`text-sm lg:text-lg ml-2 font-medium ${v.selected ? 'text-gray-100' : ''}`}>
                          {v?.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {guestChildData?.length ?
                  <div id='children'>
                    <div className='border-b border-gray-100/20 my-6' />
                    <div className='px-4 lg:px-6'>
                      <div className='flex items-center mb-4'>
                        <h1 className='text-lg lg:text-xl font-semibold'>Children</h1>
                        <div className='flex items-start ml-6'>
                          <input
                            checked={guestChildData.every((a) => a.selected && a.shoreId == currentShoreID)}
                            disabled={guestChildData.some((a) => a.selected && a.shoreId != currentShoreID)}
                            type="checkbox"
                            className="rounded-sm cursor-pointer w-4 h-4 lg:w-5 lg:h-5 text-brand-primary"
                            onChange={(e) => {
                              onSelectAll(e.target.checked, 'children', activePortID);
                            }}
                          />
                          <p className={`text-xs lg:text-sm ml-2 font-medium text-gray-600`}>Select All</p>
                        </div>
                      </div>
                      {guestChildData.map((v: any, i: number) => {

                        return <div>
                          <div className='flex items-center mb-3'>

                            <input
                              checked={v.selected}
                              disabled={v.selected == true && currentShoreID !== v.shoreId}
                              type="checkbox"
                              className={`rounded-sm mr-3 cursor-pointer w-5 h-5 lg:w-6 lg:h-6 disabled:text-brand-primary/40 `}
                              onChange={(e) => {
                                onSelectShoreEx(e.target.checked, i, 'children', activePortID)
                              }}
                            />
                            <p className={`text-sm lg:text-lg ml-2 font-medium ${v?.selected ? 'text-gray-100' : ''}`}>{v?.name} {v?.port_code && <span className='text-brand-primary font-semibold'>({v.code})</span>} </p>
                          </div>
                        </div>

                      })}
                    </div>
                  </div>
                  : null}
              </div>
              <div className='absolute bottom-0 py-3 left-0 right-0 text-center border-t border-gray-100/20 bg-white'>
                <Button text='Save' size='base' handleClick={() => saveGuestSelection()} className='px-10' />
              </div>
            </div>
          </Modal>
        </main>
      </div >

      <div className='fixed w-full bottom-0 z-30 lg:hidden'>
        {
          proceedButton.length ?
            <div className='grid grid-cols-5 bg-white px-4 py-4 shadow-[rgba(0,0,0,0.14)_5px_-2px_5px] border-t border-gray-100/20'>
              <div className='col-span-3 self-center'>

                <div>
                  {uniqueCodes.map((code, i) => {
                    const adultCount = proceedButton.filter(item => item.GADataShore.code === code && item.type === 'ADULT').length;
                    const childrenCount = proceedButton.filter(item => item.GADataShore.code === code && item.type === 'CHILD').length;

                    const adultPrice = proceedButton.find(item => item.GADataShore?.code === code)?.GADataShore?.adult_price || 0;
                    const childrenPrice = proceedButton.find(item => item.GADataShore?.code === code)?.GADataShore?.child_price || 0;
                    const totalPrice = (adultCount * adultPrice) + (childrenCount * childrenPrice);

                    return (
                      <div key={i} className='flex items-center justify-between mt-2'>
                        <p className='text-brand-primary text-base font-bold'>Total Fare: ₹ {totalPrice}</p>
                      </div>
                    );
                  })}
                </div>

                <div className='flex items-center mt-1'
                  onClick={() => {
                    setBreakupModal(true)
                  }}
                >
                  <p className='text-xs font-semibold'>View Price Breakup</p>
                  <img
                    src="assets/icons/footer/chevon-down-black.svg"
                    alt="arrow"
                    className={`rotate-180 ml-1 h-1.5`}
                  />
                </div>
              </div>
              <div className='col-span-2'>
                <button
                  onClick={handelProceed}
                  className="text-white bg-brand-primary font-semibold px-4 py-2 rounded w-full">
                  Proceed
                </button>
              </div>
            </div>
            : null
        }
      </div>

      <Modal show={breakupModal} align={'center'} className="drop-shadow modal-open bg-white w-full center bottom-0 rounded-lg lg:rounded-2xl border right-0 m-auto absolute" onClose={() => setBreakupModal(false)}>
        <div className='relative h-full'>
          <div onClick={() => setBreakupModal(false)} className='flex items-center justify-center shadow-md absolute -top-4 left-0 right-0 mx-auto bg-white w-10 h-10 rounded-full '>
            <img src="https://images.cordeliacruises.com/cordelia_v2/public/assets/down-arrow-icon.svg" alt="" />
          </div>
          <div className=''>
            <div className='px-4'>
              <p className=' font-bold text-lg pt-10'>{Itinerary?.ports?.map((port: any, index: number) => {
                return (
                  <span key={index}>
                    <span>{port['name']}</span>
                    {index < Itinerary?.ports?.length - 1 && (
                      <span className="mx-1">-</span>
                    )}
                  </span>
                );
              })}</p>
              <div className='flex mt-2'>

                <div className='flex items-center'>

                  <img
                    src="https://images.cordeliacruises.com/cordelia_v2/public/assets/time-purple-icon.svg"
                    className="mr-1 mt-0.5 h-4"
                    alt="Cruise"
                  />
                  <p className="text-base font-semibold">
                    {toDate(start_date)[2]} {toDate(start_date)[1]} {toDate(start_date)[3]}
                  </p>
                </div>
                <div className='mx-3'>
                  <p className='text-xl'>-</p>
                </div>
                <div className='flex items-center justify-end'>
                  <p className="text-base font-semibold">
                    {toDate(end_date)[2]} {toDate(end_date)[1]} {toDate(end_date)[3]}
                  </p>
                </div>
              </div>
              <div className="flex mt-3">
                <img
                  src="https://images.cordeliacruises.com/cordelia_v2/public/assets/room-icon.svg"
                  className="mr-1 mt-0.5 h-4"
                  alt="Cruise"
                />
                <p className="text-base font-semibold">
                  {`${store?.rooms?.length} Rooms`}
                </p>
              </div>
            </div>
            <div className=' border-b my-5 border-gray-100/20' />
            <div className='px-4 mb-5'>
              <div className='flex items-center justify-between'>
              </div>
              {shoreExAmount?.port_code?.length ?
                <div>
                  <div className='flex items-center justify-between mt-2'>
                    <p className=" font-semibold">
                      Shore Excursions
                    </p>
                    <p className=" font-semibold">
                      {`₹ ${shoreExAmount.adult + shoreExAmount.children}`}
                    </p>
                  </div>
                  {shoreExAmount?.port_code.map((x, i) =>
                    <div className='flex items-center justify-between mt-2'>
                      <p className="text-sm font-semibold">
                        {x.code} : <span className='text-gray-100 '>Adult x {x.adult}, Children x {x.children}</span>
                      </p>
                    </div>
                  )}

                </div>
                : null}
            </div>

            <div className='px-2 py-2 bg-brand-sky/5'>
              <p className='text-xs font-semibold'>(Excl. GST charges)</p>
            </div>
            <div className='px-4'>
              {proceedButton.length ?
                <div>
                  <div className='flex items-center justify-between mt-2'>
                    <p className="text-sm font-semibold">
                      Shore Excursions
                    </p>
                    <p className="text-sm font-semibold">
                      {`₹ ${FormatAmount(grandTotal)}`}
                    </p>
                  </div>
                  <div className='flex items-center justify-between mt-2'>
                  </div>

                  {uniqueCodes.map((code, i) => {
                    const adultCount = proceedButton.filter(item => item.GADataShore.code === code && item.type === 'ADULT').length;
                    const childrenCount = proceedButton.filter(item => item.GADataShore.code === code && item.type === 'CHILD').length;

                    const adultPrice = proceedButton.find(item => item.GADataShore?.code === code)?.GADataShore?.adult_price || 0;
                    const childrenPrice = proceedButton.find(item => item.GADataShore?.code === code)?.GADataShore?.child_price || 0;
                    const totalPrice = (adultCount * adultPrice) + (childrenCount * childrenPrice);

                    return (
                      <div key={i} className='flex items-center justify-between mt-2'>
                        <p className="text-sm font-semibold">

                          {code} : <span className='text-gray-100 text-sm'>{adultCount == 0 ? null : `Adult x ${adultCount}`},{childrenCount == 0 ? null : `Children x ${childrenCount}`}  </span>
                        </p>
                        <p className="text-sm font-semibold">{`₹ ${FormatAmount(totalPrice)}`}</p>

                      </div>
                    );
                  })}


                </div>
                : null}
              <button onClick={handelProceed} className="text-white w-full bg-brand-primary font-semibold my-5 py-3 rounded mr-3 text-sm">
                Proceed
              </button>
            </div>
          </div>

        </div>
      </Modal>
      <Toaster />
    </Layout >
  );
}