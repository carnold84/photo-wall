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
    <div className="h-full w-full columns-2 gap-8 md:columns-3 lg:columns-4 [&>*]:mb-8">
      {photos?.map(({ id, urls }, i) => {
        return (
          <PhotoCard
            imageUrls={urls}
            isOpen={currentId === id}
            key={id}
            to={`/${id}`}
          />
        );
      })}
    </div>
  );
};

export default PhotoGrid;
