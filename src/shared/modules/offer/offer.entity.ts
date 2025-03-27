import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';

import { Accommodation, Amenities, City, Coordinates} from '../../types/index.js';
import { UserEntity } from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({ trim: true, required: true })
  public title!: string;

  @prop({ trim: true, required: true })
  public description!: string;

  @prop({ required: true })
  public publicationDate!: Date;

  @prop({ type: () => String, enum: City, required: true })
  public city!: City;

  @prop({ required: true })
  public previewImage!: string;

  @prop({ type: [String], required: true })
  public photos!: string[];

  @prop({ required: true })
  public isPremium!: boolean;

  @prop({ default: false, required: true})
  public isFavorite!: boolean;

  @prop({ required: true })
  public rating!: number;

  @prop({ type: () => String, enum: Accommodation, required: true })
  public accommodationType: Accommodation;

  @prop({ required: true })
  public roomsCount!: number;

  @prop({ required: true })
  public guestsCount!: number;

  @prop({ required: true })
  public rentCost!: number;

  @prop({ type: () => String, enum: Amenities, required: true })
  public amenities!: Amenities[];

  @prop({ ref: UserEntity, required: true })
  public userId!: Ref<UserEntity>;

  @prop({ default: 0 })
  public commentsCount!: number;

  @prop({ required: true })
  public coordinates!: Coordinates[City];
}

export const OfferModel = getModelForClass(OfferEntity);
