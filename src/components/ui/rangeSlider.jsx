"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";

export const RangeSlider = ({
  min,
  max,
  value,
  onChange,
  step = 1,
  formatValue = (v) => v.toString(),
  className = "",
  color = "#7a99c0",
}) => {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(null);

  // حساب النسب المئوية للقيم
  const getPercentage = useCallback(
    (val) => {
      return ((val - min) / (max - min)) * 100;
    },
    [min, max]
  );

  // تحويل النسبة المئوية إلى قيمة
  const getValueFromPercentage = useCallback(
    (percentage) => {
      const rawValue = min + (percentage / 100) * (max - min);
      return Math.round(rawValue / step) * step;
    },
    [min, max, step]
  );

  // التعامل مع النقر والسحب
  const handleMouseDown = (type) => (e) => {
    e.preventDefault();
    setIsDragging(type);
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging || !trackRef.current) return;

      const rect = trackRef.current.getBoundingClientRect();
      let percentage;

      if (isRTL) {
        percentage = ((rect.right - e.clientX) / rect.width) * 100;
      } else {
        percentage = ((e.clientX - rect.left) / rect.width) * 100;
      }

      percentage = Math.max(0, Math.min(100, percentage));
      const newValue = getValueFromPercentage(percentage);

      if (isDragging === "min") {
        const newMin = Math.min(newValue, value[1] - step);
        if (newMin >= min) {
          onChange([newMin, value[1]]);
        }
      } else {
        const newMax = Math.max(newValue, value[0] + step);
        if (newMax <= max) {
          onChange([value[0], newMax]);
        }
      }
    },
    [isDragging, isRTL, getValueFromPercentage, value, onChange, step, min, max]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  // إضافة وإزالة event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "none";

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.userSelect = "";
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // حساب المواضع
  const minPercentage = getPercentage(value[0]);
  const maxPercentage = getPercentage(value[1]);

  // في RTL نعكس المواضع
  const leftPosition = isRTL ? 100 - maxPercentage : minPercentage;
  const rightPosition = isRTL ? 100 - minPercentage : maxPercentage;
  const width = Math.abs(maxPercentage - minPercentage);

  return (
    <div className={`space-y-4 ${className}`} dir={isRTL ? "rtl" : "ltr"}>
      {/* عرض القيم */}
      <div className="flex justify-between text-sm text-slate-600 dark:text-gray-400">
        <span>الحد الأدنى: {formatValue(value[0])}</span>
        <span>الحد الأقصى: {formatValue(value[1])}</span>
      </div>

      {/* المسار الرئيسي */}
      <div className="relative px-2">
        <div
          ref={trackRef}
          className="relative h-2 bg-slate-200 dark:bg-gray-600 rounded-full cursor-pointer"
          onClick={(e) => {
            const rect = trackRef.current.getBoundingClientRect();
            let percentage;

            if (isRTL) {
              percentage = ((rect.right - e.clientX) / rect.width) * 100;
            } else {
              percentage = ((e.clientX - rect.left) / rect.width) * 100;
            }

            percentage = Math.max(0, Math.min(100, percentage));
            const clickValue = getValueFromPercentage(percentage);

            // تحديد أي مقبض أقرب للنقرة
            const distanceToMin = Math.abs(clickValue - value[0]);
            const distanceToMax = Math.abs(clickValue - value[1]);

            if (distanceToMin < distanceToMax) {
              const newMin = Math.min(clickValue, value[1] - step);
              if (newMin >= min) onChange([newMin, value[1]]);
            } else {
              const newMax = Math.max(clickValue, value[0] + step);
              if (newMax <= max) onChange([value[0], newMax]);
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
              left: `${leftPosition}%`,
              width: `${width}%`,
            }}
          />

          {/* مقبض الحد الأدنى */}
          <div
            className="absolute top-1/2 w-5 h-5 bg-white border-2 rounded-full shadow-lg transform -translate-y-1/2 cursor-grab hover:scale-110 transition-all duration-200 z-10"
            style={{
              borderColor: color,
              left: `${isRTL ? 100 - maxPercentage : minPercentage}%`,
              transform: "translate(-50%, -50%)",
            }}
            onMouseDown={handleMouseDown("min")}
          >
            <div
              className="absolute inset-1 rounded-full"
              style={{ backgroundColor: color, opacity: 0.3 }}
            />
          </div>

          {/* مقبض الحد الأقصى */}
          <div
            className="absolute top-1/2 w-5 h-5 bg-white border-2 rounded-full shadow-lg transform -translate-y-1/2 cursor-grab hover:scale-110 transition-all duration-200 z-10"
            style={{
              borderColor: color,
              left: `${isRTL ? 100 - minPercentage : maxPercentage}%`,
              transform: "translate(-50%, -50%)",
            }}
            onMouseDown={handleMouseDown("max")}
          >
            <div
              className="absolute inset-1 rounded-full"
              style={{ backgroundColor: color, opacity: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* عرض القيم في صناديق */}
      <div className="flex justify-between">
        <div className="bg-slate-100 dark:bg-gray-700 px-3 py-1 rounded-lg">
          <span className="text-sm font-medium text-slate-700 dark:text-gray-300">
            {formatValue(value[0])}
          </span>
        </div>
        <div className="bg-slate-100 dark:bg-gray-700 px-3 py-1 rounded-lg">
          <span className="text-sm font-medium text-slate-700 dark:text-gray-300">
            {formatValue(value[1])}
          </span>
        </div>
      </div>
    </div>
  );
};
