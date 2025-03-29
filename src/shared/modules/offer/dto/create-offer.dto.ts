import { Accommodation, Amenities, City, Coordinates } from '../../../types/offer.type.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public publicationDate: Date;
  public city: City;
  public previewImage: string;
  public photos: string[];
  public isPremium: boolean;
  public rating: number;
  public accommodationType: Accommodation;
  public roomsCount: number;
  public guestsCount: number;
  public rentCost: number;
  public amenities: Amenities[];
  public userId: string;
  public commentsCount: number;
  public coordinates: Coordinates[City];
}
