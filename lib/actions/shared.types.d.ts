interface CreateUserParams {
  clerkUserId: string;
  name: string;
  email: string;
  picture: string;
  isAdmin: boolean;
  isActive: boolean;
}

export interface UserType {
  _id: string;
  clerkUserId: string;
  name: string;
  email: string;
  picture: string;
  isAdmin: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface HotelType {
  _id: string;
  name: string;
  owner: string;
  email: string;
  phone: string;
  address: string;
  media: string[];
  createdAt: string;
  updatedAt: string;
}
