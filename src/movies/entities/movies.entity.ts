// entities/movie.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  @Index()
  id: number;

  @Column()
  @ApiProperty()
  title: string;

  @Column()
  @ApiProperty()
  director: string;

  @Column()
  @ApiProperty()
  yearRelease: number;

  @Column()
  @ApiProperty()
  genre: string;

  @Column()
  @ApiProperty()
  synopsis: string;

  @Column()
  @ApiProperty()
  ageRating: string;

  @Column()
  @ApiProperty()
  rating: string;

  @ManyToOne(() => User, (user) => user.moviesAdded)
  @ApiProperty({ type: () => User })
  addedByUser?: User;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;
}
