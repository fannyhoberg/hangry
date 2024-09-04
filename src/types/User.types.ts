export type SignUpType = {
  name: string;
  email: string;
  photos: FileList;
  password: string;
  confirmPassword: string;
};

export type LoginType = {
  email: string;
  password: string;
};

export type UpdateProfileType = {
  name: string;
  photos: FileList;
  email: string;
  password: string;
  confirmPassword: string;
};

export type User = {
  _id: string;
  name?: string;
  photoUrls?: string;
  email: string;
};

export type NewUser = Omit<User, "_id">;

export type Admin = {
  _id: string;
  name?: string;
  photoUrls?: string;
  email: string;
};

export type UserLocation = {
  geolocation: GeolocationPosition;
  cityName: string;
};
