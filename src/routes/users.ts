import { Router } from 'express';
import {
  getAllUsers,
  createUser,
  getUser,
  updateRequestor,
  updateRequestorAvatar,
} from '../controllers/users';

const router = Router();

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:id', getUser);
router.patch('/me', updateRequestor);
router.patch('/me/avatar', updateRequestorAvatar);

export default router;
