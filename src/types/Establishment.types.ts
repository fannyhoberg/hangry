import { GeoPoint } from "firebase/firestore";

export type Establishment = {
  _id: string;
  name: string;
  address: string;
  geopoint: GeoPoint;
  post_code: number;
  city: string;
  description?: string;
  category: string[]; // Type specific categories
  offer: string[]; // Type specific
  email?: string;
  phone?: string;
  website?: string;
  facebook?: string;
  instagram?: string;
  // photos?: FileList;  // Or should I save only the photo Url ?? in DB and have photoFiles separate?
};

export type PositionCoords = {
  lat: number;
  lng: number;
};

export type NewEstablishment = Omit<Establishment, "_id">;

export type EstablishmentFormData = Omit<NewEstablishment, "geopoint">;
