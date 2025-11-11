import { useEffect, useRef, useState } from "react";

const useHorizontalScroll = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
  
    // Check scroll position
    const checkScroll = () => {
      if (scrollRef.current) {
        setCanScrollLeft(scrollRef.current.scrollLeft > 0);
        setCanScrollRight(
          scrollRef.current.scrollLeft < scrollRef.current.scrollWidth - scrollRef.current.clientWidth
        );
      }
    };
  
    // Scroll Left
    const scrollLeft = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: -150, behavior: "smooth" });
        setTimeout(checkScroll, 300);
      }
    };
  
    // Scroll Right
    const scrollRight = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 150, behavior: "smooth" });
        setTimeout(checkScroll, 300);
      }
    };
  
    useEffect(() => {
      const el = scrollRef.current;
      if (el) {
        el.addEventListener("scroll", checkScroll);
        checkScroll();
      }
      return () => el?.removeEventListener("scroll", checkScroll);
    }, []);
  
    return { scrollRef, canScrollLeft, canScrollRight, scrollLeft, scrollRight };
};

export default useHorizontalScroll;
