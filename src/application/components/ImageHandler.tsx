import React from "react";

type Props = {
  src: string;
  alt: string;
};

const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
  const imageElement = e.target as HTMLImageElement;
  imageElement.onerror = null;
  imageElement.src = "/images/image-placeholder.jpeg";
};

function ImageHandler(props: Props) {
  return (
    <img
      {...props}
      className='w-full h-full object-cover'
      onError={handleImageError}
    />
  );
}

export default ImageHandler;
