import { Router } from 'express';
import * as historyController from '../controllers/history.controller';

const router = new Router();

// Get all histories
router.route('/histories').get(historyController.getHistories);

export default router;
