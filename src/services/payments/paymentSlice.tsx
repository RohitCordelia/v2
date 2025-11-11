import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaymentApi } from './payment';

export interface PaymentInterface {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

const initialState: PaymentInterface = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
};

export const PaymentSlice = createSlice({
  name: 'Payment',
  initialState,
  reducers: {
    savePayment: (state: PaymentInterface, action: PayloadAction<PaymentInterface>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { savePayment } = PaymentSlice.actions;

export default PaymentSlice.reducer;
