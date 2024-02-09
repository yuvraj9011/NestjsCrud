import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.entity';
import { CreatUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  private users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  findById(id: string): User {
    return this.users.find(user => user.id === id);
  }

  create(user: CreatUserDto): User {
    const id =uuidv4()
    this.users.push({...user,id});
    return {...user,id};
  }
  update(id: string, updatedUser: Partial<User>): User {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return null;
    }
    this.users[userIndex] = { ...this.users[userIndex], ...updatedUser };
    return this.users[userIndex];
  }

  delete(id: string): User {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return null;
    }
    const deletedUser = this.users.splice(userIndex, 1)[0];
    return deletedUser;
  }
}
