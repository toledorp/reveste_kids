import * as chatService from '../services/chatService.js';

const createMatch = async (req, res) => {
  try {
    const { postId, ownerId, interestedUserId } = req.body;

    const match = await chatService.createMatch({
      postId,
      ownerId,
      interestedUserId,
    });

    return res.status(201).json({
      message: 'Match criado com sucesso',
      match,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || 'Erro ao criar match',
    });
  }
};

const sendMessage = async (req, res) => {
  try {
    const { matchId, senderId, content } = req.body;

    const message = await chatService.sendMessage({
      matchId,
      senderId,
      content,
    });

    return res.status(201).json({
      message: 'Mensagem enviada com sucesso',
      data: message,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message || 'Erro ao enviar mensagem',
    });
  }
};

const getMessagesByMatch = async (req, res) => {
  try {
    const { matchId } = req.params;
    const { userId } = req.query;

    const messages = await chatService.getMessagesByMatch({
      matchId,
      userId,
    });

    return res.status(200).json(messages);
  } catch (error) {
    return res.status(400).json({
      message: error.message || 'Erro ao buscar mensagens',
    });
  }
};

export { createMatch, sendMessage, getMessagesByMatch };