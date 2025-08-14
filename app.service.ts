
import * as bcrypt from 'bcrypt';
import { UserRole } from './users/entities/user.entity';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UsersService } from './users/users.service';



import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import fs from 'fs';


@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(private readonly userService: UsersService) { }

  onApplicationBootstrap() {
    this.seedTheDb();
  }

  async seedTheDb() {
    try {
      const existingAdmin = await this.userService.findByEmail('admin@test.com');
      if (existingAdmin) {
        console.log('✅ Admin already exists. Skipping initial setup.');
        return;
      }

      console.log('🚀 Running initial backend setup...');


      // Create super admin user
      const adminUser: CreateUserDto = {
        name: "Super Admin",
        email: "admin@test.com",
        password: "hello@12",
        role: UserRole.ADMIN,
        phone: "+923086011481"
      };

      await this.userService.create(adminUser);

      console.log('✅ Initial admin user created: admin@test.com / hello@12');
    } catch (error) {
      console.log("--------------->", error);
    }
  }
}