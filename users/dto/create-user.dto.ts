// src/users/dto/create-user.dto.ts
import { IsString, IsEnum, IsOptional, IsMongoId, IsNumber, MinLength, Matches } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    email?: string;

    @IsString()
    phone: string;

    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;

    @IsEnum(UserRole, { message: 'Role must be either student, donor, admin, or franchise' })
    role: UserRole;

    @IsOptional()
    @IsMongoId({ message: 'campusId must be a valid ObjectId' })
    campusId?: string;

    @IsOptional()
    @IsString()
    referralCode?: string;

    @IsOptional()
    @IsNumber()
    credits?: number;

    @IsOptional()
    @IsString()
    fatherName?: string;

    @IsOptional()
    @IsString()
    education?: string;

    @IsOptional()
    @IsString()
    cnic?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    profession?: string;
}