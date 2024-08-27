import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";

const AddRestaurant = () => {
    const { register } = useForm();

    return (
        <Container className="py-3 center-y">
            <Card className="mb-3 mt-5">
                <Card.Body>
                    <Card.Title className="mb-3">
                        Add Restaurant
                    </Card.Title>

                    <Form>
                        <Form.Group controlId="restaurant-name" className="mb-3">
                            <Form.Label>Restaurant Name</Form.Label>
                            <Form.Control
                                type="text"
                                autoComplete="restaurant"
                                {...register}
                            />

                        </Form.Group>

                        <Form.Group controlId="address" className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                autoComplete="address"
                                {...register}
                            />

                        </Form.Group>

                        <Form.Group controlId="city" className="mb-3">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                autoComplete="city"
                                {...register}
                            />

                        </Form.Group>

                        <Form.Group controlId="description" className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                as="textarea"
                                rows={3}
                                autoComplete="description"
                                {...register}
                            />

                        </Form.Group>

                        <Form.Group controlId="category" className="mb-3">
                            <Form.Label>Category</Form.Label>
                            <Form.Check
                                type="checkbox"
                                label="Cafe"
                            />
                            <Form.Check
                                type="checkbox"
                                label="Restaurant"
                            />
                            <Form.Check
                                type="checkbox"
                                label="Bar"
                            />
                        </Form.Group>

                        <Form.Group controlId="offer" className="mb-3">
                            <Form.Label>Offer</Form.Label>
                            <Form.Check
                                type="checkbox"
                                label="Lunch"
                            />
                            <Form.Check
                                type="checkbox"
                                label="Happy hour"
                            />
                            <Form.Check
                                type="checkbox"
                                label="A la carte"
                            />
                        </Form.Group>

                        <Form.Group controlId="contact" className="mb-3">
                            <Form.Control className="mb-2" size="sm" type="email" placeholder="restaurant@email.com" aria-label="email" />
                            <Form.Control className="mb-2" size="sm" type="tel" placeholder="+46223456789" aria-label="phone-number" />
                            <Form.Control className="mb-2" size="sm" type="url" placeholder="restaurant.com" aria-label="website" />
                            <Form.Control className="mb-2" size="sm" type="text" placeholder="facebook" aria-label="facebook" />
                            <Form.Control className="mb-2" size="sm" type="text" placeholder="instagram" aria-label="instagram" />
                        </Form.Group>

                        <Form.Group controlId="photoFiles" className="mb-3">
                            <Form.Label>Photos</Form.Label>
                            <Form.Control
                                accept="image/gif,image/jpeg,image/png,image/webp"
                                type="file"
                                {...register}
                            />
                        </Form.Group>

                        <Button>Submit</Button>
                    </Form>

                </Card.Body>

            </Card>
        </Container>
    )
}

export default AddRestaurant
