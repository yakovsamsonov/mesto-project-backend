import { Request, Response } from 'express';
import console from 'console';

import { Card as card, TCardDocument } from '../models/card';

const internalServerError = (res: Response) => {
  res.status(500).send({ message: 'Ошибка по умолчанию' });
};

const incorrectRequest = (res: Response, reason: string) => {
  res.status(400).send({ message: `Переданы некорректные данные ${reason}` });
};

const dataNotFound = (res: Response, reason: string) => {
  res.status(404).send({ message: `${reason}` });
};

const returnCardData = (res: Response, c: TCardDocument | null) => {
  if (!c) {
    return dataNotFound(res, 'Карточка с указанным _id не найдена.');
  }
  return res.send({ data: c });
};

export const createCard = (req: Request, res: Response) => {
  const { name, link, user } = req.body;
  console.log(name, link, user);

  if (!name || !link || !user) {
    return incorrectRequest(res, 'при создании карточки');
  }

  return card.create({ name, link, owner: user._id })
    .then((c) => {
      res.send({ data: c });
    })
    .catch(() => { internalServerError(res); });
};

export const getCards = (req: Request, res: Response) => {
  card.find()
    .then((c) => res.send({ data: c }))
    .catch(() => { internalServerError(res); });
};

export const deleteCard = (req: Request, res: Response) => {
  const { id } = req.params;

  return card.findByIdAndDelete(id)
    .then((c) => returnCardData(res, c))
    .catch(() => { internalServerError(res); });
};

export const likeCard = (req: Request, res: Response) => {
  const { id } = req.params;
  const { _id: userId } = req.body.user;

  return card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .then((c) => returnCardData(res, c))
    .catch(() => { internalServerError(res); });
};

export const dislikeCard = (req: Request, res: Response) => {
  const { id } = req.params;
  const { _id: userId } = req.body.user;

  return card.findByIdAndUpdate(
    id,
    { $pull: { likes: userId } },
    { new: true },
  )
    .then((c) => returnCardData(res, c))
    .catch(() => { internalServerError(res); });
};
