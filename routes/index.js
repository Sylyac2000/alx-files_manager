import { Router } from 'express';
import AppController from '../controllers/AppController';

const router = Router();

// GET /status => AppController.getStatus
router.get('/status', AppController.getStatus);

// GET /stats => AppController.getStats
router.get('/stats', AppController.getStats);

module.exports = router;
