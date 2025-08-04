"use client";
import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";

const CustomMarquee = ({ children, speed = 50, pauseOnHover = true }) => {
  const locale = useLocale();
  const contentRef = useRef(null);
  const [animationDuration, setAnimationDuration] = useState("0s");
  const [marqueeDistance, setMarqueeDistance] = useState("0px"); // حالة لتخزين المسافة بالبكسل

  useEffect(() => {
    const calculateMetrics = () => {
      if (contentRef.current) {
        // حساب العرض الكلي لمجموعة واحدة من المحتوى (بما في ذلك الهوامش بين العناصر)
        // بما أننا نكرر الـ children مرتين، فإن scrollWidth/2 يعطينا العرض الدقيق لمجموعة واحدة.
        const childrenWidth = contentRef.current.scrollWidth / 2;
        if (childrenWidth > 0) {
          const duration = childrenWidth / speed; // السرعة بالبكسل لكل ثانية، المدة بالثواني
          setAnimationDuration(`${duration}s`);
          setMarqueeDistance(`${childrenWidth}px`); // تعيين المسافة كمتغير CSS
        }
      }
    };

    calculateMetrics();
    window.addEventListener("resize", calculateMetrics);
    return () => window.removeEventListener("resize", calculateMetrics);
  }, [children, speed]);

  // ربط اللغة بفئة الـ CSS الصحيحة للـ animation
  const animationClass = locale === "ar" ? "marquee-ar" : "marquee-en";

  return (
    <div
      className="relative w-full overflow-hidden whitespace-nowrap group"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <div
        ref={contentRef}
        className={`custom-marquee-content ${animationClass} ${
          pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""
        }`}
        style={{
          animationDuration: animationDuration,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationPlayState: "running", // دائمًا قيد التشغيل افتراضيًا، يتم إيقافه عند التمرير عبر group-hover
          // تمرير المسافة المحسوبة كمتغير CSS
          "--marquee-distance": marqueeDistance,
        }}
      >
        {/* تكرار الـ children لإنشاء حلقة سلسة */}
        {children}
        {children}
      </div>
    </div>
  );
};
export default CustomMarquee;
