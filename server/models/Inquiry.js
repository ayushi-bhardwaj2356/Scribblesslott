import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  customerName: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  productName: { type: String, default: '', trim: true },
  quantity: { type: Number, default: 1, min: 1 },
  occasion: { type: String, default: '', trim: true },
  customization: { type: String, default: '', trim: true },
  budget: { type: String, default: '', trim: true },
  deliveryDate: { type: String, default: '', trim: true },
  city: { type: String, default: '', trim: true },
  message: { type: String, default: '', trim: true },
  inquiryType: {
    type: String,
    required: true,
    enum: ['order', 'custom', 'contact'],
  },
  createdAt: { type: Date, default: Date.now },
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);

export default Inquiry;
