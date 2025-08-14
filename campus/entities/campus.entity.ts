import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CampusDocument = Campus & Document;

@Schema({ timestamps: true })
export class Campus {
    @Prop({ required: true })
    name: string;

    @Prop()
    address: string;

    @Prop()
    referralCode?: string;

    @Prop()
    phone: string;
}

export const CampusSchema = SchemaFactory.createForClass(Campus);
