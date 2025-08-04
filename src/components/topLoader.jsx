"use client";

import NextTopLoader from "nextjs-toploader";

export default function TopLoader() {
  return (
    <NextTopLoader
      color="#7a99c0"
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      crawl={true}
      showSpinner={false}
      easing="ease"
      speed={200}
      shadow="0 0 10px rgba(122, 153, 192, 0.5), 0 0 5px rgba(122, 153, 192, 0.3)"
      template='<div class="bar" role="bar"><div class="peg"></div></div> 
                <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
      zIndex={9999}
      showAtBottom={false}
    />
  );
}
