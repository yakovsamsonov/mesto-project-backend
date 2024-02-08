import { Request, Response } from 'express';

export const createCard = (req: Request, res: Response) => {};

export const getCards = (req: Request, res: Response) => {};

export const deleteCard = (req: Request, res: Response) => {
  const id = req.params.id;

  res.send();
};

export const likeCard = (req: Request, res: Response) => {};

export const dislikeCard = (req: Request, res: Response) => {};
