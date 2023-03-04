import PhotoCard from "../PhotoCard";

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
    <div className="h-full w-full columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
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
