import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail()
  @ApiProperty({ description: '邮箱地址', example: 'user@example.com' })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '密码', example: 'password123' })
  password: string;
}

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty({ description: '用户名', example: 'johndoe' })
  username: string;

  @IsEmail()
  @ApiProperty({ description: '邮箱地址', example: 'john@example.com' })
  email: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({ description: '密码', example: 'password123' })
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '全名', example: 'John Doe' })
  fullName: string;
}