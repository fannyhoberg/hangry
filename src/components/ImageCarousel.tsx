import Carousel from "react-bootstrap/Carousel"
import Image from "react-bootstrap/Image"

interface ImageCarouselProps {
    establishmentName: string;
    photoUrls: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ establishmentName, photoUrls }) => {
    return (
        <div className="d-flex justify-content-center flex-row p-4">
            <Carousel>
                {photoUrls && photoUrls.map(url => (
                    <Carousel.Item key={url}>
                        <Image src={url} style={{ width: "100%" }} alt={`Image of ${establishmentName}`} />
                    </Carousel.Item>
                ))}

            </Carousel>
        </div>
    )
}

export default ImageCarousel
