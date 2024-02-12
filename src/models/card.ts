import mongoose, { model, Schema } from 'mongoose';

interface ICard {
  name: string,
  link: string,
  owner: Schema.Types.ObjectId,
  likes: Array<Schema.Types.ObjectId>,
  createdAt: Date
}

export type TCardDocument = ICard & { _id: mongoose.Types.ObjectId }

const cardSchema = new Schema<ICard>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  likes: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Card = model<ICard>('card', cardSchema);
