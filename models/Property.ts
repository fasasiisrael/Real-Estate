import mongoose, { Schema, Document } from 'mongoose';

interface IProperty extends Document {
  title: string;
  description: string;
  price: number;
  location: string;
  createdAt: Date;
  updatedAt: Date;
  isNew: boolean;
}

const PropertySchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isNew: { type: Boolean, default: false },
});

export default mongoose.models.Property || mongoose.model<IProperty>('Property', PropertySchema);
