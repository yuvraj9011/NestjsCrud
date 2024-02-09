// user.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete, NotFoundException,ParseUUIDPipe } from '@nestjs/common';
import { User } from './user.entity';
import { CreatUserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): User[] {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id',ParseUUIDPipe) id: string): Promise<User> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Post()
  create(@Body() user: CreatUserDto): User {
    return this.userService.create(user);
  }

  @Put(':id')
  update(@Param('id',ParseUUIDPipe)id: string, @Body() updatedUser: CreatUserDto): User {
    const user = this.userService.update(id, updatedUser);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Delete(':id')
  remove(@Param('id',ParseUUIDPipe)id: string): User {
    const user = this.userService.delete(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
