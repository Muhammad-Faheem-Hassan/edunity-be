import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const passwordHash = await bcrypt.hash(createUserDto.password, 10);
      const createdUser = new this.userModel({
        ...createUserDto,
        password: passwordHash,
      });
      return createdUser.save();
    } catch (error) {
      if (error.name === 'ValidationError') {
        const errors = Object.keys(error.errors).map((field) => ({
          field,
          message: error.errors[field].message,
        }));
        throw new BadRequestException({
          message: 'Mongoose validation failed',
          errors,
        });
      }
      throw error;
    }
  }

  async findAll() {
    return await this.userModel.find().exec();
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto = {
        ...updateUserDto,
        password: await bcrypt.hash(updateUserDto.password, 10),
      };
    }
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
