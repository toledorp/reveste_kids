import express from 'express';
import * as chatController from '../controllers/chatController.js';

const router = express.Router();

router.post('/matches', chatController.createMatch);
router.post('/messages', chatController.sendMessage);
router.get('/matches/:matchId/messages', chatController.getMessagesByMatch);

export default router;