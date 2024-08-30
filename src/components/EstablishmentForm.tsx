import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { SubmitHandler, useForm } from "react-hook-form";
import { EstablishmentFormData } from "../types/Establishment.types";
import { User } from "firebase/auth";

interface EstablishmentFormProps {
    handleFormSubmit: (data: EstablishmentFormData) => Promise<void>;
    admin?: User;
}

const EstablishmentForm: React.FC<EstablishmentFormProps> = ({ handleFormSubmit, admin }) => {
    const {
        getValues,
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<EstablishmentFormData>();

    const onFormSubmit: SubmitHandler<EstablishmentFormData> = (data) => {
        handleFormSubmit(data);
        reset();
    }

    return (
        <Form onSubmit={handleSubmit(onFormSubmit)}>
            <Form.Group controlId="establishment-name" className="mb-3">
                <Form.Label>Establishment Name*</Form.Label>
                <Form.Control
                    autoComplete="organization"
                    type="text"
                    {...register("name", {
                        required: "You must enter the name of the establishment",
                    })}
                />
                {errors.name && (
                    <p style={{ color: "red" }}>{errors.name.message ?? "Invalid value"}</p>
                )}
            </Form.Group>

            <Form.Group controlId="address" className="mb-3">
                <Form.Label>Address*</Form.Label>
                <Form.Control
                    autoComplete="street-address"
                    type="text"
                    {...register("address", {
                        required: "You must enter an address",
                    })}
                />
                {errors.address && (
                    <p style={{ color: "red" }}>{errors.address.message ?? "Invalid value"}</p>
                )}
            </Form.Group>

            <Form.Group controlId="city" className="mb-3">
                <Form.Label>City*</Form.Label>
                <Form.Control
                    autoComplete="address-level2"
                    type="text"
                    {...register("city", {
                        required: "You must enter a city",
                    })}
                />
                {errors.city && (
                    <p style={{ color: "red" }}>{errors.city.message ?? "Invalid value"}</p>
                )}
            </Form.Group>

            <Form.Group controlId="description" className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    autoComplete="off"
                    rows={3}
                    type="text"
                    {...register("description", {
                        maxLength: {
                            value: 300,
                            message: "Description can be no longer than 300 characters",
                        },
                    })}
                />
                {errors.description && (
                    <p style={{ color: "red" }}>{errors.description.message ?? "Invalid value"}</p>
                )}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Category*</Form.Label>
                <Form.Check
                    id="category-cafe"
                    label="Cafe"
                    type="checkbox"
                    value="cafe"
                    {...register("category", {
                        validate: () => {
                            const selectedCategories = getValues("category");
                            return (
                                (selectedCategories && selectedCategories.length > 0) ||
                                "You must select at least one category"
                            );
                        },
                    })}
                />
                <Form.Check
                    id="category-restaurant"
                    label="Restaurant"
                    type="checkbox"
                    value="restaurant"
                    {...register("category")}
                />
                <Form.Check
                    id="category-bar"
                    label="Bar"
                    type="checkbox"
                    value="bar"
                    {...register("category")}
                />
                {errors.category && (
                    <p style={{ color: "red" }}>{errors.category.message ?? "Invalid value"}</p>
                )}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Offer</Form.Label>
                <Form.Check
                    id="offer-lunch"
                    label="Lunch"
                    type="checkbox"
                    value="lunch"
                    {...register("offer")}
                />
                <Form.Check
                    id="offer-happy-hour"
                    label="Happy hour"
                    type="checkbox"
                    value="happy-hour"
                    {...register("offer")}
                />
                <Form.Check
                    id="offer-a-la-carte"
                    label="A la carte"
                    type="checkbox"
                    value="a-la-carte"
                    {...register("offer")}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Control
                    aria-label="email"
                    autoComplete="email"
                    className="mb-2"
                    id="email"
                    placeholder="establishment@email.com"
                    size="sm"
                    type="email"
                    {...register("email")}
                />
                <Form.Control
                    aria-label="phone-number"
                    autoComplete="tel"
                    className="mb-2"
                    id="tel"
                    placeholder="+46223456789"
                    size="sm"
                    type="tel"
                    {...register("phone")}
                />
                <Form.Control
                    aria-label="website"
                    autoComplete="url"
                    className="mb-2"
                    id="url"
                    placeholder="establishment.com"
                    size="sm"
                    type="url"
                    {...register("website")}
                />
                <InputGroup size="sm" className="mb-2">
                    <InputGroup.Text>FB</InputGroup.Text>
                    <Form.Control
                        aria-label="facebook"
                        autoComplete="off"
                        id="facebook"
                        placeholder="page name"
                        type="text"
                        {...register("facebook")}
                    />
                </InputGroup>
                <InputGroup className="mb-2" size="sm">
                    <InputGroup.Text>IG</InputGroup.Text>
                    <Form.Control
                        aria-label="instagram"
                        autoComplete="off"
                        id="instagram"
                        placeholder="username"
                        type="text"
                        {...register("instagram")}
                    />
                </InputGroup>
            </Form.Group>

            {admin && (
                <Form.Group controlId="photoFiles" className="mb-3">
                    <Form.Label>Photos</Form.Label>
                    <Form.Control
                        accept="image/gif,image/jpeg,image/png,image/webp"
                        type="file"
                        {...register("photos")}
                        multiple
                    />
                </Form.Group>
            )}

            <Button type="submit">Submit</Button>
        </Form>
    )
}

export default EstablishmentForm
