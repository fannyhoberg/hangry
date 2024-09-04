import Image from "react-bootstrap/Image";
import Carousel from "react-bootstrap/Carousel";

interface CarouselProps {
  establishmentName: string;
  photoUrls: string[];
}

const CardCarousel: React.FC<CarouselProps> = ({ establishmentName, photoUrls }) => {
  return (
    <Carousel fade interval={null}>
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

export default CardCarousel;
