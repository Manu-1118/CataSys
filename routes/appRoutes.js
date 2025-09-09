import express from 'express';

import { noEncontrado } from '../controllers/appController.js';

const router = express.Router();

// pagina 404
router.get('/404', noEncontrado);

export default router;