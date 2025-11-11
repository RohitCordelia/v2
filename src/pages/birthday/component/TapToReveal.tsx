import { useEffect, useState } from 'react';
import './taptoreveal.css';
import { AnniversaryStartDate } from '../birthdayOffers';

const TapToReveal = ({
  offers,
  setOffers,
  handleOfferClick,
  weekWise = true
}: any) => {
  // Helper: compute current week index (0-based)
  const getCurrentWeekIndex = () => {
    // const start = new Date();
    const start = new Date(AnniversaryStartDate);
    const today = new Date();
    const diffDays = Math.floor(
      (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
    return Math.min(Math.floor(diffDays / 7), offers.length - 1); // max index = offers.length-1
  };

  // Apply week-wise status
  useEffect(() => {
    if (!weekWise) return; // if disabled, skip
    // const weekIndex = 2; // for testing (0 - week1, 1 - week 2, ...)
    const weekIndex = getCurrentWeekIndex();

    const updated = offers.map((offer, idx) => ({
      ...offer,
      isExpired: idx < weekIndex,
      isUpcoming: idx > weekIndex,
      isRevealed: idx < weekIndex ? true : offer.isRevealed ?? false // keep revealed state for past weeks
    }));

    setOffers(updated);
    localStorage.setItem('offersState', JSON.stringify(updated));
  }, [weekWise]);

  const handleReveal = (idx: number) => {
    if (weekWise) {
      // Week-wise mode: flip only the current week card
      const weekIndex = offers.findIndex((o) => !o.isExpired && !o.isUpcoming);
      if (idx !== weekIndex) return;

      setOffers((prev) => {
        const updated = prev.map((offer, i) =>
          i === idx ? { ...offer, isRevealed: true } : offer
        );
        localStorage.setItem('offersState', JSON.stringify(updated));
        return updated;
      });
    } else {
      // Normal mode: sequential flip all cards
      if (offers.every((o) => o.isRevealed)) return;

      offers.forEach((_, i) => {
        setTimeout(() => {
          setOffers((prev) => {
            const updated = prev.map((offer, j) =>
              j <= i ? { ...offer, isRevealed: true } : offer
            );
            localStorage.setItem('offersState', JSON.stringify(updated));
            return updated;
          });
        }, i * 300);
      });
    }
  };

  return (
    <div className="flex gap-3 lg:gap-4 flex-wrap justify-center">
      {offers?.map((offer, idx) => (
        <div
          key={offer.id}
          className="flip-card basis-[158px] lg:basis-[23%] max-w-[158px] lg:max-w-none h-[180px] lg:h-[332px] cursor-pointer transition-transform duration-500 lg:hover:-translate-y-2"
          onClick={() => {
            if (offer.isExpired || offer.isUpcoming) return;
            !offer.isRevealed ? handleReveal(idx) : handleOfferClick(offer);
          }}
        >
          <div
            className={`flip-card-inner ${offer.isRevealed ? 'flipped' : ''}`}
          >
            <div className="flip-card-front border border-gray-300 shadow-allSide bg-white transition-all ease-in duration-500 rounded-xl overflow-hidden">
              <img
                src={offer.scratchImg}
                alt={offer.title}
                className="w-full h-full object-cover"
              />
              {!offer?.isUpcoming && (
                <div className="absolute top-1/2 -translate-y-1/2 p-0 pb-1 lg:py-2 text-center w-full bg-gradient-to-r from-[#D9D9D9] to-[#FFFAFA] opacity-30">
                  <span className="text-xs lg:text-lg font-bold">
                    Tap to Reveal
                  </span>
                </div>
              )}
              {offer.isUpcoming && (
                <div className="absolute top-1/2 -translate-y-1/2 p-0 pb-1 lg:py-2 text-center w-full bg-gradient-to-r from-[#D9D9D9] to-[#FFFAFA] opacity-30">
                  <span className="text-xs lg:text-lg font-bold">{offer?.upcomingText}</span>
                </div>
              )}
            </div>
            <div
              className={`flip-card-back text-left rounded-md border border-gray-300 shadow-allSide bg-white ${
                offer.isExpired ? 'grayscale' : 'grayscale-0'
              }`}
            >
              <div className="relative w-full h-full rounded-md overflow-hidden">
                <img
                  src={offer.img}
                  alt="offer_img"
                  className="w-full h-full object-cover"
                />
                {offer.isExpired && (
                  <div className="absolute top-1/2 -translate-y-1/2 p-0 pb-1 lg:py-2 text-center w-full bg-white opacity-80">
                    <span className="text-xs lg:text-lg font-bold">
                      EXPIRED
                    </span>
                  </div>
                )}
              </div>
              {/* <div className="relative w-full mb-3 rounded-md overflow-hidden">
                <img
                  src={offer.img}
                  alt="offer_img"
                  className="w-full h-full object-cover aspect-[1.67]"
                />
                {offer.isExpired && (
                  <div className="absolute top-1/2 -translate-y-1/2 text-center w-full bg-white/80">
                    <span className="text-xs font-bold">EXPIRED</span>
                  </div>
                )}
              </div>
              <div className="relative h-auto">
                <p className="text-sm lg:text-lg lg:mb-2 font-bold leading-5 line-clamp-2">
                  {offer.title}
                </p>
                <p className="!hidden lg:!block text-base lg:mb-2 line-clamp-2">
                  desc
                </p>
                <p className="hidden lg:block text-brand-primary underline font-bold text-sm relative bottom-auto">
                  Know More
                </p>
              </div> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TapToReveal;
