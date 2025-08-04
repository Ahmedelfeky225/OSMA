"use client"; // لو تستخدم Next.js App Router

import React from "react";
import ReactPlayer from "react-player";

const Video = () => {
  return (
    <div className="max-w-6xl  mx-auto sm:py-16">
      <div className="h-[320px] sm:h-[420px]">
        <ReactPlayer
          src="https://res.cloudinary.com/dimabqrjp/video/upload/v1752472347/video1_3zuuoPBv_kx1pei.mp4"
          width="100%"
          height="100%"
          playing
          loop
          muted
          controls={false}
          playsinline
        />
      </div>
    </div>
  );
};

export default Video;
