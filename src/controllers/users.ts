import { Request, Response } from 'express';

export const getAllUsers = (req: Request, res: Response) => {};

export const createUser = (req: Request, res: Response) => {};

export const getUser = (req: Request, res: Response) => {
  const { id } = req.params;

  res.send();
};

export const updateRequestor = (req: Request, res: Response) => {};

export const updateRequestorAvatar = (req: Request, res: Response) => {};
