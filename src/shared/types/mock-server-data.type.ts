import { Accommodation, Amenities } from './offer.type.js';
import { UserType } from './user.type.js';

export type MockServerData = {
  titles: string[];
  descriptions: string[];
  cities: string[];
  previewImages: string[];
  photos: string[];
  isPremium: boolean[];
  isFavorite: boolean[];
  ratings: number[];
  accommodationTypes: Accommodation[];
  roomsCounts: number[];
  guestsCounts: number[];
  amenities: Amenities[];
  names: string[];
  emails: string[];
  avatars: string[];
  passwords: string[];
  userTypes: UserType[];
  commentsCounts: number[];
  coordinates: [number, number][];
};
