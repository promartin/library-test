import { Rent } from "src/rent/entities/rent.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ type: 'boolean' })
  employee: boolean;

  @OneToMany(() => Rent, (rental) => rental.user)
  rentals: Rent[];
}
