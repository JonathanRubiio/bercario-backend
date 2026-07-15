import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('business_profile')
export class BusinessProfileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  userId: string;

  @OneToOne(() => UserEntity, (user) => user.profile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  tagline: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  phone: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'varchar', length: 255 })
  banner: string;

  @Column({ type: 'varchar', length: 255 })
  logo: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  slug: string;

  @Column({ type: 'simple-json' })
  products: any[];

  @Column({ type: 'simple-json' })
  testimonials: any[];

  @Column({ type: 'simple-json' })
  faqs: any[];

  @Column({ type: 'simple-json' })
  gallery: string[];

  @Column({ type: 'simple-json' })
  sections: any[];

  @Column({ type: 'json', nullable: true })
  landingConfig: any[];

  @Column({ type: 'varchar', length: 255, nullable: true })
  templateId: string;

  @Column({ type: 'json', nullable: true })
  globalStyles: any;

  @Column({ type: 'varchar', length: 255, default: 'Servicios Profesionales' })
  niche: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 255, nullable: true })
  customDomain: string;

  @Index({ unique: true })
  @Column({ type: 'varchar', length: 100, nullable: true })
  subdomain: string;

  @Column({ type: 'boolean', default: false })
  domainVerified: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
