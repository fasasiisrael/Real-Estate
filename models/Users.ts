import mongoose, { Schema, Document } from 'mongoose'

interface IUser extends Document {
  username: string
  email: string
  password: string
  roles: string[]
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  roles: { type: [String], default: ['user'] },
})

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
