import React from 'react';

const fullStar =
  'https://images.cordeliacruises.com/cordelia_v2/public/assets/SEA-review-star-highlight-icon.svg';
const halfStar =
  'https://images.cordeliacruises.com/cordelia_v2/public/assets/SEA-review-star-half-icon.svg';
const emptyStar =
  'https://images.cordeliacruises.com/cordelia_v2/public/assets/SEA-review-star-disable-icon.svg';

interface StarRatingProps {
  rating: number; // e.g. 3.7
  maxStars?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxStars = 5 }) => {
  const stars = [];

  for (let i = 1; i <= maxStars; i++) {
    if (rating >= i) {
      // full star
      stars.push(
        <div key={i} className="w-4 h-4">
          <img src={fullStar} alt="full star" className="w-full h-full" />
        </div>
      );
    } else if (rating >= i - 0.5) {
      // half star
      stars.push(
        <div key={i} className="w-4 h-4">
          <img src={halfStar} alt="half star" className="w-full h-full" />
        </div>
      );
    } else {
      // empty star
      stars.push(
        <div key={i} className="w-4 h-4">
          <img src={emptyStar} alt="empty star" className="w-full h-full" />
        </div>
      );
    }
  }

  return <div className="flex gap-1">{stars}</div>;
};

export default StarRating;
