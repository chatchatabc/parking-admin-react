type Props = {
  alt: string;
  src: string;
  className?: string;
};

function ImageComp(props: Props) {
  return (
    <img
      onError={(e) => {
        e.currentTarget.src = "/images/image-placeholder.jpeg";
      }}
      {...props}
    />
  );
}

export default ImageComp;
