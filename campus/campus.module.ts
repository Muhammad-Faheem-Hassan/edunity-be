import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Campus, CampusSchema } from './entities/campus.entity';
import { CampusService } from './campus.service';
import { CampusController } from './campus.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Campus.name, schema: CampusSchema }])],
  controllers: [CampusController],
  providers: [CampusService],
})
export class CampusModule {}