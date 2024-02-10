import express from 'express';
import { test, deleteUser } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/test', test);
router.delete('/delete/:id', deleteUser);

export default router;