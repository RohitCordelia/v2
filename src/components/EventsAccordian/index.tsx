import { useState, useMemo } from 'react';

type AccordionItem = {
  title: string;
  content: string;
};

type AccordionProps = {
  items: AccordionItem[];
  isBgDark?: boolean;
  isSEPage?: boolean;
  initialItems?: number;
  itemsToLoad?: number;
  isLoadMoreEnabled?: boolean;
};

export default function Accordion({
  items,
  isBgDark = true,
  isSEPage = false,
  initialItems = 5,
  itemsToLoad = 5,
  isLoadMoreEnabled = false
}: AccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [visibleItemsCount, setVisibleItemsCount] = useState(initialItems);

  const toggleItem = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  const handleLoadMore = () => {
    setVisibleItemsCount((prevCount) => prevCount + itemsToLoad);
  };

  const handleLoadLess = () => {
    setVisibleItemsCount(initialItems);
    setActiveIndex(null); // collapse any open accordion on reset
  };

  // Determine the items to display: If load more is enabled, use slice; otherwise, show all items.
  const displayedItems = useMemo(() => {
    return isLoadMoreEnabled ? items.slice(0, visibleItemsCount) : items;
  }, [items, visibleItemsCount, isLoadMoreEnabled]);

  // Check if there are more items to load (only relevant if load more is enabled)
  const hasMoreItems = isLoadMoreEnabled && items.length > visibleItemsCount;
  const isLastPage = isLoadMoreEnabled && visibleItemsCount >= items.length;
  const isOverInitialCount = items.length > initialItems;

  const shouldShowLoadLess = isLastPage && isOverInitialCount;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-3">
      {displayedItems.map((item, index) => {
        const isActive = activeIndex === index;
        const isDarkIcon = isBgDark ? 'right-arrow.svg' : 'Arrow+Black.svg';
        const iconRotation = isBgDark
          ? isActive
            ? '-rotate-90'
            : 'rotate-90'
          : isActive
          ? 'rotate-180'
          : 'rotate-0';

        return (
          <div
            key={index}
            className={`rounded-xl overflow-hidden ${
              isSEPage ? 'border-0 shadow-md' : 'border border-white/20 '
            }`}
          >
            <button
              onClick={() => toggleItem(index)}
              className={`flex justify-between items-center gap-3 w-full text-left p-5 lg:p-8 font-medium transition backdrop-blur-sm ${
                isBgDark
                  ? 'bg-gradient-to-b from-white/20 to-[#0C123B]'
                  : isSEPage
                  ? 'bg-gray-400 text-black/80'
                  : 'bg-white text-black'
              }`}
            >
              <p className="text-sm lg:text-lg basis-[95%]">{item.title}</p>
              <div
                className={`w-3 h-3 lg:w-5 lg:h-5 transform transition-transform duration-300 basis-[5%] lg:basis-[2.5%] ${iconRotation}`}
              >
                <img
                  src={`https://images.cordeliacruises.com/cordelia_v2/public/assets/${isDarkIcon}`}
                  alt=""
                  className="w-full h-full"
                />
              </div>
            </button>

            {isActive && (
              <div
                className={`p-5 lg:p-8 text-xs lg:text-base leading-5 lg:leading-8 text-left ${
                  isBgDark
                    ? 'bg-gradient-to-b from-white/20 text-white/80 border-t border-gray-200'
                    : isSEPage
                    ? 'bg-white text-black'
                    : 'bg-gray-400 text-black/80'
                }`}
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}

      {isLoadMoreEnabled && (
        <div className="flex justify-center gap-4 pt-6">
          {hasMoreItems && (
            <button
              onClick={handleLoadMore}
              className={`px-6 py-3 rounded-full font-semibold transition duration-300 ease-in-out border-1 ${
                isBgDark
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-white text-black hover:bg-gray-400'
              }`}
            >
              Load More
            </button>
          )}

          {shouldShowLoadLess && (
            <button
              onClick={handleLoadLess}
              className={`px-6 py-3 rounded-full font-semibold transition duration-300 ease-in-out border-1 ${
                isBgDark
                  ? 'bg-blue-600 text-white hover:bg-gray-700'
                  : 'bg-white text-black hover:bg-gray-400'
              }`}
            >
              Load Less
            </button>
          )}
        </div>
      )}
    </div>
  );
}
