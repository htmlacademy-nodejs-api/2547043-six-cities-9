import { readFileSync } from 'node:fs';
import { FileReader } from './file-reader.interface.js';

import { Accommodation, Amenities, City, Coordinates, RentalOffer, User, UserType } from '../types/index.js';


export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filepath: string
  ) {}

  private validateRawData(): void {
    if (! this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseRawDataToOffers(): RentalOffer[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseLineToOffer(line: string): RentalOffer {
    const [
      title,
      description,
      createdDate,
      city,
      previewImage,
      photos,
      isPremium,
      isFavorite,
      rating,
      accommodationType,
      roomsCount,
      guestsCount,
      rentCost,
      amenities,
      name,
      email,
      avatar,
      password,
      userType,
      commentsCount,
      coordinates
    ] = line.split('\t');

    return {
      title,
      description,
      publicationDate: new Date(createdDate),
      city: city as City,
      previewImage,
      photos: this.parsePhotos(photos),
      isPremium: (isPremium === 'true'),
      isFavorite: (isFavorite === 'true'),
      rating: Number.parseFloat(rating),
      accommodationType: accommodationType as Accommodation,
      roomsCount: Number.parseInt(roomsCount, 10),
      guestsCount: Number.parseInt(guestsCount, 10),
      rentCost: Number.parseInt(rentCost, 10),
      amenities: this.parseAmenities(amenities) as Amenities[],
      user: this.parseUser(name, email, avatar, password, userType),
      commentsCount: Number.parseInt(commentsCount, 10),
      coordinates: this.parseCoordinates(coordinates) as Coordinates[City],
    };
  }

  private parsePhotos(photos: string): string[] {
    const parsedPhotos = photos.split(';');
    return parsedPhotos;
  }

  private parseAmenities(amenities: string): string[] {
    const parsedAmenities = amenities.split(';');
    return parsedAmenities;
  }

  private parseCoordinates(coordinates: string): {latitude: number, longitude: number} {
    const parsedCoordinates = coordinates.split(';').map((value) => Number.parseFloat(value));
    return { latitude: parsedCoordinates[0], longitude: parsedCoordinates[1] };
  }

  private parseUser(name: string, email: string, avatar: string, password: string, userType: string): User {
    return {name, email, avatar, password, userType: userType as UserType};
  }

  public read(): void {
    this.rawData = readFileSync(this.filepath, { encoding: 'utf-8' });
  }

  public toArray(): RentalOffer[] {
    this.validateRawData();
    return this.parseRawDataToOffers();
  }
}
