import { Router } from 'express';
import { createInquiry, inquiryValidation } from '../controllers/inquiryController.js';

const router = Router();

router.post('/', inquiryValidation, createInquiry);

export default router;
