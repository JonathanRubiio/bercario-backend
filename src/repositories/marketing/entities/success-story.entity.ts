import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('success_stories')
export class SuccessStoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  merchant: string;

  @Column({ type: 'varchar', length: 255 })
  location: string;

  @Column({ type: 'varchar', length: 255 })
  owner: string;

  @Column({ type: 'varchar', length: 255 })
  niche: string;

  @Column({ type: 'varchar', length: 100 })
  metric: string;

  @Column({ type: 'varchar', length: 255 })
  metricLabel: string;

  @Column({ type: 'varchar', length: 100 })
  growth: string;

  @Column({ type: 'varchar', length: 255 })
  growthLabel: string;

  @Column({ type: 'text' })
  quote: string;

  @Column({ type: 'varchar', length: 50 })
  avatar: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
