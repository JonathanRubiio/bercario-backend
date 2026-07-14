import { Entity, PrimaryGeneratedColumn, Column, OneToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BusinessProfileEntity } from '../../business-profile/entities/business-profile.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 50, default: 'mayorista' })
  role: string;

  @OneToOne(() => BusinessProfileEntity, (profile) => profile.user, { cascade: true })
  profile: BusinessProfileEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
