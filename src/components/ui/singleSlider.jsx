// "use client";

// import { useCallback, useEffect, useRef, useState } from "react";
// import { useLocale } from "next-intl";

// export const SingleSlider = ({
//   min,
//   max,
//   value,
//   onChange,
//   step = 1,
//   formatValue = (v) => v.toString(),
//   className = "",
//   color = "#7a99c0",
//   showStars = false,
// }) => {
//   const locale = useLocale();
//   const isRTL = locale === "ar";
//   const trackRef = useRef(null);
//   const [isDragging, setIsDragging] = useState(false);

//   // حساب النسبة المئوية
//   const getPercentage = useCallback(() => {
//     return ((value - min) / (max - min)) * 100;
//   }, [value, min, max]);

//   // تحويل النسبة المئوية إلى قيمة
//   const getValueFromPercentage = useCallback(
//     (percentage) => {
//       const rawValue = min + (percentage / 100) * (max - min);
//       return Math.round(rawValue / step) * step;
//     },
//     [min, max, step]
//   );

//   // التعامل مع السحب
//   const handleMouseDown = (e) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleMouseMove = useCallback(
//     (e) => {
//       if (!isDragging || !trackRef.current) return;

//       const rect = trackRef.current.getBoundingClientRect();
//       let percentage;

//       if (isRTL) {
//         percentage = ((rect.right - e.clientX) / rect.width) * 100;
//       } else {
//         percentage = ((e.clientX - rect.left) / rect.width) * 100;
//       }

//       percentage = Math.max(0, Math.min(100, percentage));
//       const newValue = getValueFromPercentage(percentage);

//       if (newValue >= min && newValue <= max) {
//         onChange(newValue);
//       }
//     },
//     [isDragging, isRTL, getValueFromPercentage, onChange, min, max]
//   );

//   const handleMouseUp = useCallback(() => {
//     setIsDragging(false);
//   }, []);

//   // إضافة event listeners
//   useEffect(() => {
//     if (isDragging) {
//       document.addEventListener("mousemove", handleMouseMove);
//       document.addEventListener("mouseup", handleMouseUp);
//       document.body.style.userSelect = "none";

//       return () => {
//         document.removeEventListener("mousemove", handleMouseMove);
//         document.removeEventListener("mouseup", handleMouseUp);
//         document.body.style.userSelect = "";
//       };
//     }
//   }, [isDragging, handleMouseMove, handleMouseUp]);

//   const percentage = getPercentage();
//   const thumbPosition = isRTL ? 100 - percentage : percentage;

//   return (
//     <div className={`space-y-4 ${className}`} dir={isRTL ? "rtl" : "ltr"}>
//       {/* عرض القيمة */}
//       <div className="flex justify-between text-sm text-slate-600 dark:text-gray-400">
//         <span>القيمة: {formatValue(value)}</span>
//       </div>

//       {/* المسار */}
//       <div className="relative px-2">
//         <div
//           ref={trackRef}
//           className="relative h-2 bg-slate-200 dark:bg-gray-600 rounded-full cursor-pointer"
//           onClick={(e) => {
//             const rect = trackRef.current.getBoundingClientRect();
//             let clickPercentage;

//             if (isRTL) {
//               clickPercentage = ((rect.right - e.clientX) / rect.width) * 100;
//             } else {
//               clickPercentage = ((e.clientX - rect.left) / rect.width) * 100;
//             }

//             clickPercentage = Math.max(0, Math.min(100, clickPercentage));
//             const clickValue = getValueFromPercentage(clickPercentage);

//             if (clickValue >= min && clickValue <= max) {
//               onChange(clickValue);
//             }
//           }}
//         >
//           {/* المسار النشط */}
//           <div
//             className="absolute top-0 h-2 rounded-full transition-all duration-200"
//             style={{
//               background: `linear-gradient(to ${
//                 isRTL ? "left" : "right"
//               }, ${color}, ${color}dd)`,
//               width: `${percentage}%`,
//               left: isRTL ? "auto" : "0",
//               right: isRTL ? "0" : "auto",
//             }}
//           />

//           {/* المقبض */}
//           <div
//             className="absolute top-1/2 w-5 h-5 bg-white border-2 rounded-full shadow-lg cursor-grab hover:scale-110 transition-all duration-200 z-10"
//             style={{
//               borderColor: color,
//               left: `${thumbPosition}%`,
//               transform: "translate(-50%, -50%)",
//             }}
//             onMouseDown={handleMouseDown}
//           >
//             <div
//               className="absolute inset-1 rounded-full"
//               style={{ backgroundColor: color, opacity: 0.3 }}
//             />
//           </div>
//         </div>
//       </div>

//       {/* عرض النجوم إذا كان مطلوب */}
//       {showStars && (
//         <div className="flex items-center justify-center gap-1">
//           {[1, 2, 3, 4, 5].map((star) => (
//             <div
//               key={star}
//               className={`w-6 h-6 transition-colors duration-200 ${
//                 star <= value
//                   ? "text-yellow-400"
//                   : "text-slate-300 dark:text-gray-600"
//               }`}
//             >
//               ⭐
//             </div>
//           ))}
//         </div>
//       )}

//       {/* عرض القيمة في صندوق */}
//       <div className="text-center">
//         <div className="inline-block bg-slate-100 dark:bg-gray-700 px-3 py-1 rounded-lg">
//           <span className="text-sm font-medium text-slate-700 dark:text-gray-300">
//             {formatValue(value)}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";

export const SingleSlider = ({
  min,
  max,
  value,
  onChange,
  step = 1,
  formatValue = (v) => v.toString(),
  className = "",
  color = "#7a99c0",
  showStars = false,
}) => {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // حساب النسبة المئوية
  const getPercentage = useCallback(() => {
    return ((value - min) / (max - min)) * 100;
  }, [value, min, max]);

  // تحويل النسبة المئوية إلى قيمة
  const getValueFromPercentage = useCallback(
    (percentage) => {
      const rawValue = min + (percentage / 100) * (max - min);
      return Math.round(rawValue / step) * step;
    },
    [min, max, step]
  );

  // التعامل مع بداية السحب
  const handleStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // حساب القيمة أثناء السحب
  const calculateValue = useCallback(
    (clientX) => {
      if (!trackRef.current) return;

      const rect = trackRef.current.getBoundingClientRect();
      let percentage;

      if (isRTL) {
        percentage = ((rect.right - clientX) / rect.width) * 100;
      } else {
        percentage = ((clientX - rect.left) / rect.width) * 100;
      }

      percentage = Math.max(0, Math.min(100, percentage));
      const newValue = getValueFromPercentage(percentage);

      if (newValue >= min && newValue <= max) {
        onChange(newValue);
      }
    },
    [isRTL, getValueFromPercentage, onChange, min, max]
  );

  // التعامل مع السحب بالماوس أو اللمس
  const handleMove = useCallback(
    (e) => {
      if (!isDragging) return;
      if (e.type.startsWith("mouse")) {
        calculateValue(e.clientX);
      } else if (e.type.startsWith("touch") && e.touches.length > 0) {
        calculateValue(e.touches[0].clientX);
      }
    },
    [isDragging, calculateValue]
  );

  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // إضافة وإزالة الـ event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMove);
      document.addEventListener("mouseup", handleEnd);
      document.addEventListener("touchmove", handleMove);
      document.addEventListener("touchend", handleEnd);
      document.body.style.userSelect = "none";

      return () => {
        document.removeEventListener("mousemove", handleMove);
        document.removeEventListener("mouseup", handleEnd);
        document.removeEventListener("touchmove", handleMove);
        document.removeEventListener("touchend", handleEnd);
        document.body.style.userSelect = "";
      };
    }
  }, [isDragging, handleMove, handleEnd]);

  const percentage = getPercentage();
  const thumbPosition = isRTL ? 100 - percentage : percentage;

  return (
    <div className={`space-y-4 ${className}`} dir={isRTL ? "rtl" : "ltr"}>
      {/* عرض القيمة */}
      <div className="flex justify-between text-sm text-slate-600 dark:text-gray-400">
        <span>القيمة: {formatValue(value)}</span>
      </div>

      {/* المسار */}
      <div className="relative px-2">
        <div
          ref={trackRef}
          className="relative h-2 bg-slate-200 dark:bg-gray-600 rounded-full cursor-pointer"
          onClick={(e) => {
            if (!trackRef.current) return; // ✅ حماية من null
            const rect = trackRef.current.getBoundingClientRect();
            let clickPercentage;

            if (isRTL) {
              clickPercentage = ((rect.right - e.clientX) / rect.width) * 100;
            } else {
              clickPercentage = ((e.clientX - rect.left) / rect.width) * 100;
            }

            clickPercentage = Math.max(0, Math.min(100, clickPercentage));
            const clickValue = getValueFromPercentage(clickPercentage);

            if (clickValue >= min && clickValue <= max) {
              onChange(clickValue);
            }
          }}
        >
          {/* المسار النشط */}
          <div
            className="absolute top-0 h-2 rounded-full transition-all duration-200"
            style={{
              background: `linear-gradient(to ${
                isRTL ? "left" : "right"
              }, ${color}, ${color}dd)`,
              width: `${percentage}%`,
              left: isRTL ? "auto" : "0",
              right: isRTL ? "0" : "auto",
            }}
          />

          {/* المقبض */}
          <div
            className="absolute top-1/2 w-5 h-5 bg-white border-2 rounded-full shadow-lg cursor-grab hover:scale-110 transition-all duration-200 z-10"
            style={{
              borderColor: color,
              left: `${thumbPosition}%`,
              transform: "translate(-50%, -50%)",
            }}
            onMouseDown={handleStart}
            onTouchStart={handleStart} // ✅ دعم اللمس
          >
            <div
              className="absolute inset-1 rounded-full"
              style={{ backgroundColor: color, opacity: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* عرض النجوم إذا كان مطلوب */}
      {showStars && (
        <div className="flex items-center justify-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <div
              key={star}
              className={`w-6 h-6 transition-colors duration-200 ${
                star <= value
                  ? "text-yellow-400"
                  : "text-slate-300 dark:text-gray-600"
              }`}
            >
              ⭐
            </div>
          ))}
        </div>
      )}

      {/* عرض القيمة في صندوق */}
      <div className="text-center">
        <div className="inline-block bg-slate-100 dark:bg-gray-700 px-3 py-1 rounded-lg">
          <span className="text-sm font-medium text-slate-700 dark:text-gray-300">
            {formatValue(value)}
          </span>
        </div>
      </div>
    </div>
  );
};
