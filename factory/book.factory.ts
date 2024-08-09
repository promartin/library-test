import { faker } from "@faker-js/faker"
import { Book } from "src/books/entities/book.entity";

export function createRandomBook(): Book {
  const book = new Book();
  book.author = faker.person.fullName();
  book.publishedAt = faker.date.past({ years: 100 }).getFullYear();
  book.title = faker.lorem.words({ min: 2, max: 5 })
  return book;
};

export const BOOKS: Book[] = faker.helpers.multiple(createRandomBook, {
  count: 10,
});

