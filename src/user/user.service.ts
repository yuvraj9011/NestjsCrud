import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.entity';
import { CreatUserDto } from './dto/user.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UserService {
  private usersFilePath = path.resolve(__dirname, 'users.json');

  private readUsersFromFile(): User[] {
    try {
      const data = fs.readFileSync(this.usersFilePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      // If file doesn't exist or other read errors occur, return an empty array
      return [];
    }
  }

  private writeUsersToFile(users: User[]): void {
    try {
      fs.writeFileSync(this.usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error writing users to file:', error);
    }
  }

  findAll(): User[] {
    return this.readUsersFromFile();
  }

  findById(id: string): User {
    const users = this.readUsersFromFile();
    return users.find(user => user.id === id);
  }

  create(user: CreatUserDto): User {
    const id = uuidv4();
    const users = this.readUsersFromFile();
    const newUser: User = { ...user, id };
    users.push(newUser);
    this.writeUsersToFile(users);
    return newUser;
  }

  update(id: string, updatedUser: Partial<User>): User {
    let users = this.readUsersFromFile();
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return null;
    }
    users[userIndex] = { ...users[userIndex], ...updatedUser };
    this.writeUsersToFile(users);
    return users[userIndex];
  }

  delete(id: string): User {
    let users = this.readUsersFromFile();
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return null;
    }
    const deletedUser = users.splice(userIndex, 1)[0];
    this.writeUsersToFile(users);
    return deletedUser;
  }
}
