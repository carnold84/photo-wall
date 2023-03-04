import { useParams } from "react-router-dom";

import PhotoGrid from "../../components/PhotoGrid";

const photos = [
  {
    id: "image-1",
    url: "images/image1.jpg",
  },
  {
    id: "image-10",
    url: "images/image10.jpg",
  },
  {
    id: "image-2",
    url: "images/image2.jpg",
  },
  {
    id: "image-14",
    url: "images/image14.jpg",
  },
  {
    id: "image-3",
    url: "images/image3.jpg",
  },
  {
    id: "image-4",
    url: "images/image4.jpg",
  },
  {
    id: "image-13",
    url: "images/image13.jpg",
  },
  {
    id: "image-12",
    url: "images/image12.jpg",
  },
  {
    id: "image-5",
    url: "images/image5.jpg",
  },
  {
    id: "image-11",
    url: "images/image11.jpg",
  },
  {
    id: "image-7",
    url: "images/image7.jpg",
  },
  {
    id: "image-8",
    url: "images/image8.jpg",
  },
  {
    id: "image-9",
    url: "images/image9.jpg",
  },
];

const Home = () => {
  const { id } = useParams();

  return <PhotoGrid currentPhotoId={id} photos={photos} />;
};

export default Home;
