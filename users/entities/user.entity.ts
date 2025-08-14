// src/users/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
export type UserDocument = User & Document;

export enum UserRole {
  STUDENT = 'student',
  DONOR = 'donor',
  ADMIN = 'admin',
  FRANCHISE = 'franchise',
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  email: string;

  @Prop({ required: true, })
  phone: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: UserRole, required: true })
  role: UserRole;

  @Prop({ type: Types.ObjectId, ref: 'Campus', default: null })
  campusId?: Types.ObjectId | null;

  @Prop()
  referralCode?: string;

  @Prop({ type: Number, default: 0 })
  credits: number;

  @Prop()
  fatherName: string;

  @Prop()
  education: string;

  @Prop()
  cnic: string;

  @Prop()
  address: string;

  @Prop()
  profession: string;
}

export const UserSchema = SchemaFactory.createForClass(User);