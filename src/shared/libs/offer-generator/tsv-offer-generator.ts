import dayjs from 'dayjs';

import { OfferGenerator } from './offer-generator.interface.js';
import { Accommodation, MockServerData, Amenities, UserType} from '../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';

const MIN_PRICE = 500;
const MAX_PRICE = 2000;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const city = getRandomItem<string>(this.mockData.cities);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const photos = this.mockData.photos.join(';');
    const isPremium = getRandomItem<boolean>(this.mockData.isPremium);
    const isFavorite = getRandomItem<boolean>(this.mockData.isFavorite);
    const rating = getRandomItem<number>(this.mockData.ratings);
    const accommodationType = getRandomItems<Accommodation>(this.mockData.accommodationTypes).join(';');
    const roomsCount = getRandomItem<number>(this.mockData.roomsCounts);
    const guestsCount = getRandomItem<number>(this.mockData.guestsCounts);
    const rentCost = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const amenities = getRandomItems<Amenities>(this.mockData.amenities).join(';');
    const name = getRandomItem<string>(this.mockData.names);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatar = getRandomItem<string>(this.mockData.avatars);
    const password = getRandomItem<string>(this.mockData.passwords);
    const userType = getRandomItem<UserType>(this.mockData.userTypes);
    const commentsCount = getRandomItem<number>(this.mockData.commentsCounts);
    const coordinates = getRandomItem(this.mockData.coordinates).join(';');

    const publicationDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();

    return [
      title, description, publicationDate, city, previewImage,
      photos, isPremium, isFavorite, rating, accommodationType,
      roomsCount, guestsCount, rentCost, amenities, name, email,
      avatar, password, userType, commentsCount, coordinates
    ].join('\t');
  }
}
