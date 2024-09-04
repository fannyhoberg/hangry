import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { SubmitHandler, useForm } from "react-hook-form";
import { EstablishmentFormData } from "../types/Establishment.types";
import { User } from "firebase/auth";
import { useState } from "react";
import { Alert } from "react-bootstrap";

interface EstablishmentFormProps {
  handleFormSubmit: (data: EstablishmentFormData) => Promise<void>;
  admin?: User;
  initialValues?: Partial<EstablishmentFormData>;
  manageEstablishment?: boolean;
  manageSuggestions?: boolean;
  handleAddEstablishment?: (data: EstablishmentFormData) => Promise<void>;
  handleDelete?: (data: EstablishmentFormData) => Promise<void>;
}

const EstablishmentForm: React.FC<EstablishmentFormProps> = ({
  handleFormSubmit,
  admin,
  initialValues,
  manageEstablishment,
  manageSuggestions,
  handleAddEstablishment,
  handleDelete,
}) => {
  const {
    getValues,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<EstablishmentFormData>({
    defaultValues: {
      ...initialValues,
    },
  });
  const [submissionType, setSubmissionType] = useState<string>("update");
  const [isSuccess, setIsSuccess] = useState(false);

  const managePage = manageEstablishment
    ? true
    : manageSuggestions
      ? true
      : false;

  const onFormSubmit: SubmitHandler<EstablishmentFormData> = async (data) => {
    setIsSuccess(false);
    switch (submissionType) {
      case "add":
        if (handleAddEstablishment) {
          await handleAddEstablishment(data);
        }
        break;

      case "delete":
        if (handleDelete) {
          await handleDelete(data);
        }
        break;

      case "update":
        handleFormSubmit(data);
        break;

      default:
        break;
    }

    if (!initialValues) {
      reset();
    }
    setIsSuccess(true);
  };

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
          <Alert variant="warning">
            {errors.name.message || "Invalid value"}
          </Alert>
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
          <Alert variant="warning">
            {errors.address.message || "Invalid value"}
          </Alert>
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
          <Alert variant="warning">
            {errors.city.message || "Invalid value"}
          </Alert>
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
          <Alert variant="warning">
            {errors.description.message || "Invalid value"}
          </Alert>
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
        <Form.Check
          id="category-kiosk"
          label="Kiosk"
          type="checkbox"
          value="kiosk"
          {...register("category")}
        />
        {errors.category && (
          <Alert variant="warning">
            {errors.category.message || "Invalid value"}
          </Alert>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Offer*</Form.Label>
        <Form.Check
          id="offer-breakfast"
          label="Breakfast"
          type="checkbox"
          value="breakfast"
          {...register("offer", {
            validate: () => {
              const selectedCategories = getValues("offer");
              return (
                (selectedCategories && selectedCategories.length > 0) ||
                "You must select at least one offer"
              );
            },
          })}
        />
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
        <Form.Check
          id="offer-gluten-free"
          label="Gluten free options"
          type="checkbox"
          value="gluten-free"
          {...register("offer")}
        />
        <Form.Check
          id="offer-vegan"
          label="Vegan options"
          type="checkbox"
          value="vegan"
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
          placeholder="https://www.establishment.com"
          size="sm"
          type="url"
          {...register("website")}
        />
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
        <InputGroup className="mb-2" size="sm">
          <InputGroup.Text>FB</InputGroup.Text>
          <Form.Control
            aria-label="facebook"
            autoComplete="off"
            id="facebook"
            placeholder="https://www.facebook.com/my-restaurant"
            type="text"
            {...register("facebook")}
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

      {!manageSuggestions && !manageEstablishment && (
        <Button type="submit">Submit</Button>
      )}

      {managePage && (
        <>
          <Button
            className="me-2 mb-2"
            name="update"
            onClick={(e) => setSubmissionType(e.currentTarget.name)}
            type="submit"
          >
            Update
          </Button>

          <Button
            className="me-2 mb-2"
            name="delete"
            onClick={(e) => setSubmissionType(e.currentTarget.name)}
            type="submit"
            variant="danger"
          >
            Delete
          </Button>
        </>
      )}

      {!manageEstablishment && manageSuggestions && (
        <Button
          className="me-2 mb-2"
          name="add"
          onClick={(e) => setSubmissionType(e.currentTarget.name)}
          type="submit"
          variant="success"
        >
          Add Establishment
        </Button>
      )}

      {isSuccess && <Alert variant="success">Success!</Alert>}
    </Form>
  );
};

export default EstablishmentForm;
