import { Request, Response } from 'express';

import card from '../models/card';

export const createCard = (req: Request, res: Response) => {
  const { name, link, user } = req.body;

  return card.create({ name, link, owner: user._id }).then((c) => res.send({ data: c })).catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const getCards = (req: Request, res: Response) => {
  card.find().then((c) => res.send({ data: c })).catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const deleteCard = (req: Request, res: Response) => {
  const { id } = req.params;

  return card.findByIdAndDelete(id).then(() => res.send()).catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const likeCard = (req: Request, res: Response) => {
  const { id } = req.params;
  const { _id: userId } = req.body.user;

  return card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: userId } },
    { new: true },
  ).then((c) => res.send({ data: c })).catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const dislikeCard = (req: Request, res: Response) => {
  const { id } = req.params;
  const { _id: userId } = req.body.user;

  return card.findByIdAndUpdate(
    id,
    { $pull: { likes: userId } },
    { new: true },
  ).then((c) => res.send({ data: c })).catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
