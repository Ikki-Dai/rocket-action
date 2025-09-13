import { IsEmail, IsNotEmpty, IsString, IsOptional, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '用户名' })
  username: string;

  @IsEmail()
  @ApiProperty({ description: '邮箱地址' })
  email: string;

  @IsString()
  @ApiProperty({ description: '密码哈希' })
  passwordHash: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '全名' })
  fullName: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: '头像URL' })
  avatarUrl?: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: '全名' })
  fullName?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: '头像URL' })
  avatarUrl?: string;
}

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '当前密码' })
  currentPassword: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({ description: '新密码' })
  newPassword: string;
}