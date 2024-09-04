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
