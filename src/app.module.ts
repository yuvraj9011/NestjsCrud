// app.module.ts
import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { User } from './user/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(
    {
      isGlobal: true,
      load: [loadConfig],
    }
  )],
  controllers: [UserController],
  providers: [UserService, User],
})
export class AppModule {}
function loadConfig() {
  const env = process.env.NODE_ENV || 'development';
  return require(`./config/${env}`).default;
}