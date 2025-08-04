import Image from "next/image";

const CustomImage = ({
  src,
  alt,
  width,
  height,
  className,
  priority,
  fill,
}) => {
  return (
    <Image
      src={src}
      alt={alt || "image"}
      className={className}
      priority={priority}
      {...(fill ? { fill: true } : { width, height })}
    />
  );
};

export default CustomImage;
