import { DeepPartial } from 'typeorm';
import { BusinessProfileEntity } from '../entities/business-profile.entity';
export type BusinessProfileDto = DeepPartial<BusinessProfileEntity>;
