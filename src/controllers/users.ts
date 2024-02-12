import { Request, Response } from 'express';
import { User as user, TUserDocument } from '../models/user';

const internalServerError = (res: Response) => {
  res.status(500).send({ message: 'Ошибка по умолчанию' });
};

const incorrectRequest = (res: Response, reason: string) => {
  res.status(400).send({ message: `Переданы некорректные данные ${reason}` });
};

const dataNotFound = (res: Response, reason: string) => {
  res.status(404).send({ message: `${reason}` });
};

const returnUserData = (res: Response, us: TUserDocument | null) => {
  if (!us) {
    return dataNotFound(res, 'Пользователь по указанному _id не найден.');
  }
  return res.send({ data: us });
};

export const getAllUsers = (req: Request, res: Response) => {
  user.find()
    .then((us) => res.send({ data: us }))
    .catch(() => { internalServerError(res); });
};

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;

  if (!name || !about || !avatar) {
    return incorrectRequest(res, 'при создании пользователя');
  }

  return user.create({ name, about, avatar })
    .then((us) => res.send({ data: us }))
    .catch(() => { internalServerError(res); });
};

export const getUser = (req: Request, res: Response) => {
  const { id } = req.params;

  return user.findById(id)
    .then((us) => returnUserData(res, us))
    .catch(() => { internalServerError(res); });
};

export const updateRequestor = (req: Request, res: Response) => {
  const { name, about, user: userData } = req.body;
  const { _id: userId } = userData;

  if (!name || !about || !user) {
    return incorrectRequest(res, 'при обновлении профиля');
  }

  return user.findByIdAndUpdate(userId, { name, about }, { new: true })
    .then((us) => returnUserData(res, us))
    .catch(() => { internalServerError(res); });
};

export const updateRequestorAvatar = (req: Request, res: Response) => {
  const { avatar, user: userData } = req.body;
  const { _id: userId } = userData;

  if (!avatar || !user) {
    return incorrectRequest(res, 'при обновлении аватара');
  }

  return user.findByIdAndUpdate(userId, { avatar }, { new: true })
    .then((us) => returnUserData(res, us))
    .catch(() => { internalServerError(res); });
};
