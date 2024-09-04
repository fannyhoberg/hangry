// import Carousel from "react-bootstrap/Carousel";
// import Image from "react-bootstrap/Image";

// interface ImageCarouselProps {
//   establishmentName: string;
//   photoUrls: string[];
// }

// const ImageCarousel: React.FC<ImageCarouselProps> = ({ establishmentName, photoUrls }) => {
//   return (
//     <div className="carousel-wrapper">
//       <Carousel className="w-100 h-100">
//         {photoUrls &&
//           photoUrls.map((url) => (
//             <Carousel.Item key={url} className="w-100 h-100">
//               <div className="carousel-slide">
//                 <Image src={url} className="carousel-image" alt={`Image of ${establishmentName}`} />
//               </div>
//             </Carousel.Item>
//           ))}
//       </Carousel>
//     </div>
//   );
// };

// export default ImageCarousel;

import Image from "react-bootstrap/Image";
import Carousel from "react-bootstrap/Carousel";

interface ImageCarouselProps {
  establishmentName: string;
  photoUrls: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ establishmentName, photoUrls }) => {
  return (
    <Carousel fade interval={null} id="admin-carousel">
      {photoUrls &&
        photoUrls.map((url) => (
          <Carousel.Item key={url}>
            <div className="carousel-slide">
              <Image src={url} className="carousel-img" alt={`Image of ${establishmentName}`} />
            </div>
          </Carousel.Item>
        ))}
    </Carousel>
  );
};

export default ImageCarousel;
