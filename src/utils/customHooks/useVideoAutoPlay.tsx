import { useEffect } from "react";

const useVideoAutoPlay = () => {
  useEffect(() => {
    const videos = document.querySelectorAll("video[data-src]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;

          if (entry.isIntersecting) {
            // Lazy load: Set video src
            if (!video.src) {
              video.src = video.dataset.src;
            }

            // Play the video when visible
            video.play();
          } else {
            // Pause when out of view
            video.pause();
          }
        });
      },
      { threshold: 0.3 } // Play when 30% of video is visible
    );

    videos.forEach((video) => observer.observe(video));

    return () => {
      videos.forEach((video) => observer.unobserve(video));
    };
  }, []);
};

export default useVideoAutoPlay;
