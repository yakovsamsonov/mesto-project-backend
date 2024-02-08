import { Request, Response } from 'express';
// import console from 'console';
import user from '../models/user';

export const getAllUsers = (req: Request, res: Response) => {
  user.find().then((us) => res.send({ data: us })).catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  return user.create({ name, about, avatar }).then((us) => res.send({ data: us })).catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const getUser = (req: Request, res: Response) => {
  const { id } = req.params;

  return user.findById(id).then((us) => res.send({ data: us })).catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const updateRequestor = (req: Request, res: Response) => {
  const { name, about, user: userData } = req.body;
  const { _id: userId } = userData;

  return user.findByIdAndUpdate(userId, { name, about }, { new: true }).then((us) => res.send({ data: us })).catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const updateRequestorAvatar = (req: Request, res: Response) => {
  const { avatar, user: userData } = req.body;
  const { _id: userId } = userData;

  return user.findByIdAndUpdate(userId, { avatar }, { new: true }).then((us) => res.send({ data: us })).catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
