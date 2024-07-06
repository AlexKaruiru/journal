import express from 'express';

import {
  createJournal,
  getJournals,
  getJournalsByUserId,
  getJournalById,
  updateJournal,
  deleteJournal,
} from '../controllers/journalController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, createJournal)
router.route('/') .get(getJournals);
router.route('/myjournals/:userId').get(protect, getJournalsByUserId);
router.route('/:id').get(protect, getJournalById)
router.route('/:id').put(protect, updateJournal)
router.route('/:id').delete(protect, deleteJournal);

export default router;
