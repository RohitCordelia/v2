import React from 'react';

interface MediaItem {
  type: 'image' | 'video';
  src: string;
  alt?: string; // optional, used for images
}

interface Card {
  id: number | string;
  title: string;
  description?: string;
  media?: MediaItem;
}

interface CardListProps {
  cards: Card[];
}

const SocialMediaCards: React.FC<CardListProps> = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-white shadow-md rounded-xl overflow-hidden border"
        >
          {card.media &&
            (card.media.type === 'image' ? (
              <img
                src={card.media.src}
                alt={card.media.alt || card.title}
                className="w-full h-48 object-cover"
              />
            ) : (
              <video
                controls
                className="w-full h-48 object-cover"
                preload="metadata"
              >
                <source src={card.media.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ))}
        </div>
      ))}
    </div>
  );
};

export default SocialMediaCards;
