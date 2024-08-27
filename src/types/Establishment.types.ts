import { GeoPoint } from "firebase/firestore";

export interface Establishment {
    name: string,
    address: string,
    post_code: string,
    city: string,
    _id: string,
    geopoint: GeoPoint,
}