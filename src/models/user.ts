import { model, Schema } from 'mongoose';

interface IUser {
  name: string,
  about: string,
  avatar: string
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  avatar: {
    type: String,
    required: true,
  },
});

export default model<IUser>('user', userSchema);
