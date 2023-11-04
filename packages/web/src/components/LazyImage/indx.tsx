import { Image, ImageProps, Skeleton } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";

export default function LazyImage(props: ImageProps) {
  const { src } = props;
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    if (!imageRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageSrc(src!);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "100px",
      }
    );
    observer.observe(imageRef.current);
  }, []);

  return (
    <div>
      {imageSrc ? (
        <Image {...props} src={imageSrc} />
      ) : (
        <Skeleton ref={imageRef} className="w-[200px] space-y-5 p-4 rounded-lg">
          <div className="h-24 rounded-lg bg-default-300"></div>
        </Skeleton>
      )}
    </div>
  );
}
