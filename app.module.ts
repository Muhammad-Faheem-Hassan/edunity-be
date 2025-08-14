import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { CampusModule } from './campus/campus.module';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/edunity'),
    UsersModule,
    CampusModule,
    AuthModule,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule { }
