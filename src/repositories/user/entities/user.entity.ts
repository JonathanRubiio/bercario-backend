import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BusinessProfileEntity } from '../../business-profile/entities/business-profile.entity';
import { MembershipPackageEntity } from '../../membership-package/entities/membership-package.entity';

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

  @Column({ type: 'varchar', length: 36, default: 'de305d54-75b4-431b-adb2-eb6b9e546014' })
  membershipPackageId: string;

  @ManyToOne(() => MembershipPackageEntity, { nullable: true })
  @JoinColumn({ name: 'membershipPackageId' })
  membershipPackage: MembershipPackageEntity;

  @OneToOne(() => BusinessProfileEntity, (profile) => profile.user, { cascade: true })
  profile: BusinessProfileEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
