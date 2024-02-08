import { Router } from 'express';
import {
  createCard,
  deleteCard,
  getCards,
  likeCard,
  dislikeCard,
} from '../controllers/cards';

const router = Router();

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:id', deleteCard);
router.put(':id/likes', likeCard);
router.delete(':id/likes', dislikeCard);

export default router;
