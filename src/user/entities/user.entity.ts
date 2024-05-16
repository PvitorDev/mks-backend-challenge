import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Movie } from 'src/movies/entities';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  username: string;

  @Column()
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  password: string;

  @OneToMany(() => Movie, (movie) => movie.addedByUser)
  @ApiProperty()
  moviesAdded?: Movie[];

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;
}
