import { DeepPartial } from 'typeorm';
import { LeadEntity } from '../entities/lead.entity';

export type LeadDto = DeepPartial<LeadEntity>;
