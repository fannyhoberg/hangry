import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import HungryKitty from "../assets/images/hungry-kitten.webp"
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();

    setTimeout(() => {
        navigate("/")
    }, 5000);

    return (
        <Container className="py-3 center-y">
            <h1>Page Not Found</h1>

            <Image
                src={HungryKitty}
                alt="Hungry kitten gif"
                className="mt-4"
            />

            <p className="info mt-4">You will be navigated to the map in 5 seconds...</p>

        </Container >
    )
}

export default NotFoundPage
