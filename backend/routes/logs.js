import express from 'express';
import { getLogs } from '../controller/logs.js';

const router = express.Router();

/* GET users listing. */
router.get('/', getLogs);

router.post('/', getLogs);

export default router;
