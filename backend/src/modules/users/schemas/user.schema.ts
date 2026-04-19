import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false, unique: true, sparse: true })
  googleId?: string;

  @Prop({ default: '' })
  avatar: string;

  @Prop({ default: '' })
  bio: string;

  @Prop({ default: '' })
  city: string;

  @Prop({ default: '' })
  state: string;

  @Prop({ type: [String], default: [] })
  childrenAgeRanges: string[];

  @Prop({ type: [String], default: [] })
  preferredSizes: string[];

  @Prop({ default: 0 })
  rating: number;

  @Prop({ default: 0 })
  totalSwaps: number;
}

export const UserSchema = SchemaFactory.createForClass(User);