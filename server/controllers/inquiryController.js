import { body, validationResult } from 'express-validator';
import mongoose from 'mongoose';
import Inquiry from '../models/Inquiry.js';
import { isValidIndianPhone, normalizePhone } from '../utils/phone.js';

export const inquiryValidation = [
  body('customerName')
    .trim()
    .notEmpty()
    .withMessage('Please enter your name.')
    .isLength({ min: 2, max: 80 })
    .withMessage('Name should be between 2 and 80 characters.'),
  body('phone')
    .trim()
    .custom((value) => {
      if (!isValidIndianPhone(value)) {
        throw new Error('Enter a valid 10-digit Indian mobile number.');
      }
      return true;
    }),
  body('inquiryType')
    .trim()
    .isIn(['order', 'custom', 'contact'])
    .withMessage('Unknown inquiry type.'),
  body('productName').optional({ checkFalsy: true }).trim().isLength({ max: 120 }),
  body('quantity')
    .optional({ checkFalsy: true })
    .isInt({ min: 1, max: 99 })
    .withMessage('Quantity should be between 1 and 99.')
    .toInt(),
  body('occasion').optional({ checkFalsy: true }).trim().isLength({ max: 80 }),
  body('customization').optional({ checkFalsy: true }).trim().isLength({ max: 1000 }),
  body('budget').optional({ checkFalsy: true }).trim().isLength({ max: 60 }),
  body('deliveryDate')
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage('Enter a valid delivery date.')
    .custom((value) => {
      const selected = new Date(`${value}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        throw new Error('Delivery date cannot be in the past.');
      }
      return true;
    }),
  body('city').optional({ checkFalsy: true }).trim().isLength({ max: 80 }),
  body('message').optional({ checkFalsy: true }).trim().isLength({ max: 1000 }),
];

export async function createInquiry(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Please check the form and try again.',
        errors: errors.array().map((error) => ({ field: error.path, message: error.msg })),
      });
    }

    const type = req.body.inquiryType;
    if (type === 'order' && !String(req.body.productName || '').trim()) {
      return res.status(400).json({ message: 'Please tell us which product you would like.' });
    }
    if (type === 'order' && !req.body.quantity) {
      return res.status(400).json({ message: 'Please enter a quantity.' });
    }
    if (type === 'custom' && !String(req.body.customization || '').trim()) {
      return res.status(400).json({ message: 'Please share your gift idea.' });
    }
    if (type === 'contact' && !String(req.body.message || '').trim()) {
      return res.status(400).json({ message: 'Please write a short message.' });
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        message: 'We could not save your inquiry right now. You can still continue on WhatsApp.',
      });
    }

    const inquiry = await Inquiry.create({
      customerName: req.body.customerName.trim(),
      phone: normalizePhone(req.body.phone),
      productName: String(req.body.productName || '').trim(),
      quantity: Number(req.body.quantity) || 1,
      occasion: String(req.body.occasion || '').trim(),
      customization: String(req.body.customization || '').trim(),
      budget: String(req.body.budget || '').trim(),
      deliveryDate: String(req.body.deliveryDate || '').trim(),
      city: String(req.body.city || '').trim(),
      message: String(req.body.message || '').trim(),
      inquiryType: type,
    });

    res.status(201).json({
      message: 'Inquiry saved.',
      inquiry,
    });
  } catch (error) {
    next(error);
  }
}
