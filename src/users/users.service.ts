import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private rentRepository: Repository<User>
  ) { }

  private readonly users: User[] = [
    {
      id: 1,
      username: 'john',
      password: 'changeme',
      employee: true,
      rentals: [],
    },
    {
      id: 2,
      username: 'maria',
      password: 'guess',
      employee: false,
      rentals: [],
    },
    {
      id: 3,
      username: 'alice',
      password: 'secret',
      employee: false,
      rentals: [],
    },
    {
      id: 4,
      username: 'bob',
      password: 'password',
      employee: true,
      rentals: [],
    },
    {
      id: 5,
      username: 'charlie',
      password: '123456',
      employee: false,
      rentals: [],
    },
  ];

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(username: string) {
    return this.users.find(user => user.username === username);
  }

  findOneById(id: number) {
    return this.users.find(user => user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
