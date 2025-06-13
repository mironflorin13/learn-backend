import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = {
  userId: number;
  userName: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: 1,
      userName: 'john',
      password: 'asd',
    },
    {
      userId: 2,
      userName: 'maria',
      password: 'asd',
    },
  ];

  async findOne(userName: string): Promise<User | undefined> {
    return Promise.resolve(
      this.users.find((user) => user.userName === userName),
    );
  }
}
