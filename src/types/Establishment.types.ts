import { GeoPoint } from "firebase/firestore";

export type Establishment = {
  _id: string;
  name: string;
  address: string;
  geopoint: GeoPoint;
  place_id: string;
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
  photoUrls?: string[];
};

export type PositionCoords = {
  lat: number;
  lng: number;
};

export type NewEstablishment = Omit<Establishment, "_id">;

type EstablishmentWOPlaceId = Omit<NewEstablishment, "place_id">;
export type EstablishmentTextData = Omit<EstablishmentWOPlaceId, "geopoint">;

export interface EstablishmentFormData extends EstablishmentTextData {
  photos: FileList;
}
