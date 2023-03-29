import { useEffect, useState } from "react";

import PhotoCard from "../PhotoCard";

interface Photo {
  id: string;
  photographer: string;
  title: string;
  urls: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

interface Props {
  currentPhotoId?: string;
  photos?: Photo[];
}

const PhotoGrid = ({ currentPhotoId, photos }: Props) => {
  const [currentId, setCurrentId] = useState<string>();

  useEffect(() => {
    setTimeout(() => {
      setCurrentId(currentPhotoId);
    }, 100);
  }, [currentPhotoId]);

  return (
    <div className="h-full w-full columns-1 gap-8 sm:columns-2 md:columns-3 lg:columns-4 [&>*]:mb-4 sm:[&>*]:mb-8">
      {photos?.map(({ id, title, urls }, i) => {
        return (
          <PhotoCard
            imageUrls={urls}
            isOpen={currentId === id}
            key={id}
            title={title}
            to={`/${id}`}
          />
        );
      })}
    </div>
  );
};

export default PhotoGrid;
