"use client";

import React from "react";
import ReactPlayer from "react-player";
import { useInView } from "react-intersection-observer";

const Video = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div ref={ref} className="max-w-6xl mx-auto sm:py-16 px-3 md:px-0">
      <div className="h-[320px] sm:h-[420px]">
        {inView && (
          <ReactPlayer
            src="https://res.cloudinary.com/dimabqrjp/video/upload/f_auto,q_auto/video1_3zuuoPBv_kx1pei.mp4"
            width="100%"
            height="100%"
            playing={inView}
            loop
            muted
            controls={false}
            playsinline
            config={{
              file: {
                attributes: {
                  preload: "none",
                },
              },
            }}
            style={{ pointerEvents: "none" }} // يمنع أي تفاعل غير ضروري ويقلل  re-render
          />
        )}
      </div>
    </div>
  );
};

export default Video;
