import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export abstract class AbstractSchema {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;
}
