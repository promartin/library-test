import { User } from "src/users/entities/user.entity";
import { faker } from "@faker-js/faker"

export function createRandomUser(): User {
  const user = new User();
  user.username = faker.internet.userName();
  user.password = faker.internet.password();
  user.employee = faker.datatype.boolean();
  return user;
};

export const USERS: User[] = faker.helpers.multiple(createRandomUser, {
  count: 10,
});

