import express from 'express';
import { postJournalPrivate,postJournalCommunity,getJournal,deleteJournal } from '../controllers/journal.js';
import { authenticate } from '../middlewares/auth.js';
const router = express.Router();
router.get('/',authenticate,getJournal);
router.post('/save',authenticate,postJournalPrivate);
router.post('/post',authenticate,postJournalCommunity);
router.delete('/:id',authenticate,deleteJournal);
export default router;