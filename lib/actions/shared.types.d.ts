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

export interface RoomType {
  _id: string;
  name: string;
  hotel: HotelType;
  rentPerDay: number;
  type: string;
  roomNumber: number;
  bedrooms: number;
  amenities: string;
  media: string[];
  createdAt: string;
  updatedAt: string;
}
