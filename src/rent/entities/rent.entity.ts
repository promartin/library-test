import { Book } from "src/books/entities/book.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rent {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Book)
  book: Book;

  @ManyToOne(() => User, (user) => user.rentals, { cascade: true })
  user: User;

  @Column()
  rentalDate: Date;

  @Column()
  returnDate: Date;
}
