import { useParams } from "react-router-dom";

import PhotoGrid from "../../components/PhotoGrid";

const photos = [
  {
    id: "image-1",
    photographer: "Zayn Shah",
    title: "Las Vegas, Las Vegas, United States",
    urls: {
      xs: "images/image1/1_xs.jpg",
      sm: "images/image1/2_sm.jpg",
      md: "images/image1/3_md.jpg",
      lg: "images/image1/4_lg.jpg",
      xl: "images/image1/5_xl.jpg",
    },
  },
  {
    id: "image-2",
    photographer: "Thilak Mohan",
    title: "Nusa Penida, Klungkung Regency, Bali, Indonesia",
    urls: {
      xs: "images/image2/1_xs.jpg",
      sm: "images/image2/2_sm.jpg",
      md: "images/image2/3_md.jpg",
      lg: "images/image2/4_lg.jpg",
      xl: "images/image2/5_xl.jpg",
    },
  },
  {
    id: "image-5",
    photographer: "Nhan Hoang",
    title: "Sapa, Sa Pa, Lao Cai, Vietnam",
    urls: {
      xs: "images/image5/1_xs.jpg",
      sm: "images/image5/2_sm.jpg",
      md: "images/image5/3_md.jpg",
      lg: "images/image5/4_lg.jpg",
      xl: "images/image5/5_xl.jpg",
    },
  },
  {
    id: "image-3",
    photographer: "Marek Piwnicki",
    title:
      "Seceda, Urtijëi, Autonomous Province of Bolzano - South Tyrol, Italy",
    urls: {
      xs: "images/image3/1_xs.jpg",
      sm: "images/image3/2_sm.jpg",
      md: "images/image3/3_md.jpg",
      lg: "images/image3/4_lg.jpg",
      xl: "images/image3/5_xl.jpg",
    },
  },
  {
    id: "image-4",
    photographer: "Yuanpang Wa",
    title: "Yosemite Waterfall, Yosemite National Park, California",
    urls: {
      xs: "images/image4/1_xs.jpg",
      sm: "images/image4/2_sm.jpg",
      md: "images/image4/3_md.jpg",
      lg: "images/image4/4_lg.jpg",
      xl: "images/image4/5_xl.jpg",
    },
  },
  {
    id: "image-6",
    photographer: "AXP Photography",
    title: "Burano, Venice, Metropolitan City of Venice, Italy",
    urls: {
      xs: "images/image6/1_xs.jpg",
      sm: "images/image6/2_sm.jpg",
      md: "images/image6/3_md.jpg",
      lg: "images/image6/4_lg.jpg",
      xl: "images/image6/5_xl.jpg",
    },
  },
  {
    id: "image-8",
    photographer: "Nk Ni",
    title: "Berlin, Germany",
    urls: {
      xs: "images/image8/1_xs.jpg",
      sm: "images/image8/2_sm.jpg",
      md: "images/image8/3_md.jpg",
      lg: "images/image8/4_lg.jpg",
      xl: "images/image8/5_xl.jpg",
    },
  },
  {
    id: "image-7",
    photographer: "Tom Podmore",
    title: "Metropol Parasol, Plaza de la Encarnación, Seville, Spain",
    urls: {
      xs: "images/image7/1_xs.jpg",
      sm: "images/image7/2_sm.jpg",
      md: "images/image7/3_md.jpg",
      lg: "images/image7/4_lg.jpg",
      xl: "images/image7/5_xl.jpg",
    },
  },
];

const Home = () => {
  const { id } = useParams();

  return <PhotoGrid currentPhotoId={id} photos={photos} />;
};

export default Home;
