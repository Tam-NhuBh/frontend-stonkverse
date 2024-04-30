"use client";

import { FC, useState } from "react";

interface Props {
  src: string;
  title: string; // Use 'title' instead of 'alt'
  className?: string;
}

const common = "duration-700 ease-in-out";

const ContainNextImage: FC<Props> = ({
  src,
  title, // Use 'title' instead of 'alt'
  className,
}): JSX.Element => {
  const [isLoading, setLoading] = useState(true);

  return (
    <iframe
      src={src}
      title={title} 
      style={{width: '100%', height: '100%'}}
      className={`${className} ${common} ${isLoading ? "opacity-50" : "opacity-100"}`}
      onLoad={() => setLoading(false)}
    />
  );
};

export default ContainNextImage;