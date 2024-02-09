
import { IsUUID, IsNotEmpty, IsArray } from 'class-validator';


export class CreatUserDto{
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  age: number;

  @IsArray()
  hobbies: string[]; 
}


