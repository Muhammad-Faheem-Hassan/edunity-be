import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Campus, CampusDocument } from './entities/campus.entity';
import { CreateCampusDto } from './dto/create-campus.dto';
import { UpdateCampusDto } from './dto/update-campus.dto';

@Injectable()
export class CampusService {
  constructor(
    @InjectModel(Campus.name) private campusModel: Model<CampusDocument>,
  ) { }

  async create(dto: CreateCampusDto): Promise<Campus> {
    return await this.campusModel.create(dto);
  }

  async findAll(): Promise<Campus[]> {
    return await this.campusModel.find().exec();
  }

  async countCampuses(): Promise<number> {
    return this.campusModel.countDocuments().exec();
  }

  async findOne(id: string): Promise<Campus> {
    const campus = await this.campusModel.findById(id).exec();
    if (!campus) throw new NotFoundException('Campus not found');
    return campus;
  }

  async update(id: string, dto: UpdateCampusDto): Promise<Campus> {
    const campus = await this.campusModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    if (!campus) throw new NotFoundException('Campus not found');
    return campus;
  }

  async remove(id: string): Promise<void> {
    const result = await this.campusModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Campus not found');
  }
}
