export type SignUpType = {
  email: string;
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
