import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';
import { FileReader } from './file-reader.interface.js';
import { Accommodation,Amenities, City, Coordinates, RentalOffer, User, UserType } from '../types/index.js';

export class TSVFileReader extends EventEmitter implements FileReader {
  private CHUNK_SIZE = 16384; // 16KB

  constructor(
    private readonly filename: string
  ) {
    super();
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

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {
      highWaterMark: this.CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;

        const parsedOffer = this.parseLineToOffer(completeRow);
        this.emit('line', parsedOffer);
      }
    }

    this.emit('end', importedRowCount);
  }
}
