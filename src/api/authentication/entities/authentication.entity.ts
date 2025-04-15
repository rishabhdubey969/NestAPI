import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DataBaseConst } from '../../../database/mongo.constant';

// Mongoose schema document interface
export type AuthenticationDocument = Authentication & Document;

@Schema({ collection: DataBaseConst.USER, timestamps: true })
export class Authentication {

    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    role: number;

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ default: 0 })
    soft_delete: number;

}

// Create the Mongoose schema
export const AuthenticationSchema = SchemaFactory.createForClass(Authentication);
