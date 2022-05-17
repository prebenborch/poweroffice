import {
  Entity,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  Id!: number;

  @Column({type: 'text'})
  access_token!: string;

  @Column({type: 'text'})
  refresh_token!: string;

  @Column()
  expires_in!: number;

  @Column({type: 'timestamp'})
  created!: Date;

  @Column({type: 'timestamp'})
  updated!: Date;

  @Column()
  user!: string;

  @Column()
  password!: string;

  @Column({nullable: true})
  companyId!: string;
}
