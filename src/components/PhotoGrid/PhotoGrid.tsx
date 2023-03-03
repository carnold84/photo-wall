import {
  createRef,
  RefObject,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import PhotoCard from '../PhotoCard';
import './PhotoGrid.css';

interface Photo {
  id: string;
  url: string;
}

interface Props {
  currentPhotoId?: string;
  photos?: Photo[];
}

const PhotoGrid = ({ currentPhotoId, photos }: Props) => {
  return (
    <div className="photo_grid">
      {photos?.map(({ id, url }, i) => {
        return (
          <PhotoCard
            imageUrl={url}
            isOpen={currentPhotoId === id}
            key={id}
            to={`/${id}`}
          />
        );
      })}
    </div>
  );
};

export default PhotoGrid;
