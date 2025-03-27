import { User } from './user.type.js';

export enum City {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf',
}

export enum Amenities {
  Breakfast = 'Breakfast',
  AirConditioning = 'Air conditioning',
  LaptopFriendlyWorkspace = 'Laptop friendly workspace',
  BabySeat = 'Baby seat',
  Washer = 'Washer',
  Towels = 'Towels',
  Fridge = 'Fridge',
}

export enum Accommodation {
  Apartment = 'apartment',
  House = 'house',
  Room = 'room',
  Hotel = 'hotel',
}

export type Coordinates = {
  [City.Paris]: {
    latitude: 48.85661,
    longitude: 2.351499
  },
  [City.Cologne]: {
    latitude: 50.938361,
    longitude: 6.959974
  },
  [City.Brussels]: {
    latitude: 50.846557,
    longitude: 4.351697
  },
  [City.Amsterdam]: {
    latitude: 52.370216,
    longitude: 4.895168
  },
  [City.Hamburg]: {
    latitude: 53.550341,
    longitude: 10.000654
  },
  [City.Dusseldorf]: {
    latitude: 51.225402,
    longitude: 6.776314
  },
}

export type RentalOffer = {
  title: string; // Наименование. Обязательное. Мин. длин 10 символов, макс. длина 100;
  description: string; // Описание предложения. Обязательное. Мин. длина 20 символов, макс. длина 1024 символа;
  publicationDate: Date; // Дата публикации предложения. Обязательное.
  city: City; // Город. Обязательное. Один из шести городов.
  previewImage: string; // Превью изображения. Обязательное. Ссылка на изображение, которое используется в качестве превью;
  photos: string[]; // Фотографии жилья. Обязательное. Список ссылок на фотографии жилья. Всегда 6 фотографий;
  isPremium: boolean; // Флаг «Премиум». Обязательное. Признак премиальности предложения;
  isFavorite: boolean; // Флаг «Избранное». Обязательное. Признак того, что предложение принадлежит списку избранных предложений пользователя;
  rating: number; // Рейтинг. Обязательное. Число от 1 до 5. Допускаются числа с запятой (1 знак после запятой);
  accommodationType: Accommodation; // Тип жилья. Обязательное. Один из вариантов: apartment, house, room, hotel;
  roomsCount: number; // Количество комнат. Обязательное. Мин. 1, Макс. 8;
  guestsCount: number; // Количество гостей. Обязательное. Мин. 1, Макс. 10;
  rentCost: number; // Стоимость аренды. Обязательное. Мин. 100, Макс. 100 000;
  amenities: Amenities[]; // Удобства. Обязательное. Список удобств.
  user: User; // Автор предложения. Обязательное. Ссылка на сущность «Пользователь»;
  commentsCount: number; // Количество комментариев. Рассчитывается автоматически;
  coordinates: Coordinates[City]; // Координаты предложения для аренды. Обязательное. Координаты представлены широтой и долготой.
}
