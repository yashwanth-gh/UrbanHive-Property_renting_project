import React, { useState, useMemo, useCallback } from 'react';
import Script from 'next/script';
import { TbCoin, TbInfoCircle } from "react-icons/tb";
import formatNumberToIndian from '@/utils/ConvertNumberToIndianSystem';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

const PropertyPayment = ({ property }) => {
  const [selectedPaymentMode, setSelectedPaymentMode] = useState('nightly');
  const [rate, setRate] = useState(property?.rates?.nightly);
  const [showTooltip, setShowTooltip] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  // Calculate charges with useMemo
  const { baseRate, tax, serviceFee, otherCharges } = useMemo(() => {
    const baseRate = rate * 0.80;
    const tax = rate * 0.10;
    const serviceFee = rate * 0.10;
    const otherCharges = tax + serviceFee;
    return { baseRate, tax, serviceFee, otherCharges };
  }, [rate]);

  // Optimize handlePaymentModeChange with useCallback
  const handlePaymentModeChange = useCallback((mode) => {
    setSelectedPaymentMode(mode);
    setRate(property?.rates[mode]);
  }, [property?.rates]);

  // Async function to create Order ID
  const createOrderId = useCallback(async () => {
    setLoading(true);
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: rate * 100, currency: 'INR' }),
    });
    const data = await response.json();
    setLoading(false);
    return data.orderId;
  }, [rate]);

  // Payment processing with useCallback
  const processPayment = useCallback(async (e) => {
    e.preventDefault();

    const user = session?.user;

    if (!user) {
      toast.error('⚠️ Please Login to Pay ⚠️');
      return;
    }
    const orderId = await createOrderId();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: rate * 100,
      currency: 'INR',
      name: 'Property Rental',
      description: 'Booking Property',
      order_id: orderId,
      handler: () => alert('Payment Successful'),
      prefill: { name: "User Name", email: "user@example.com" },
      theme: { color: '#3399cc' },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }, [rate, createOrderId]);

  return (
    <div className="max-w-lg mx-auto p-5 bg-white shadow-lg rounded-lg space-y-3 text-center">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <h3 className="text-center font-bold text-lg mb-3">Book Your Stay</h3>

      {/* Payment Mode Selection */}
      <div>
        <p className="text-sm mb-2">Select Rent type :</p>
        <div className="flex justify-between">
          {['nightly', 'weekly', 'monthly'].map((mode) => (
            <label key={mode} className="flex flex-col items-center cursor-pointer border p-2 border-gray-300 rounded-md shadow-md">
              <input
                type="radio"
                name="paymentMode"
                value={mode}
                checked={selectedPaymentMode === mode}
                onChange={() => handlePaymentModeChange(mode)}
                className="text-primary focus:ring-primary cursor-pointer"
              />
              <span className="capitalize text-gray-700 text-sm">{mode}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Display Rate and Other Charges */}
      <div className="space-y-1 mt-2 shadow-md p-1.5 rounded-md">
        <div className="flex justify-between items-center text-gray-800">
          <span className="text-sm">Base Rate:</span>
          <span className="text-sm font-medium">₹ {formatNumberToIndian(baseRate)}</span>
        </div>
        <div className="flex justify-between items-center text-gray-800 relative">
          <span className="text-sm flex items-center">
            Other Charges
            <TbInfoCircle
              className="ml-1 text-gray-500 cursor-pointer"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            />
          </span>
          <span className="text-sm font-medium">₹ {formatNumberToIndian(otherCharges)}</span>
          {showTooltip && (
            <div className="absolute left-3 bottom-5 bg-gray-200 text-left p-2 border rounded-md shadow-lg w-48 text-xs text-gray-700 z-10">
              <div className="flex justify-between">
                <span>Tax (10%):</span>
                <span>₹ {formatNumberToIndian(tax)}</span>
              </div>
              <div className="flex justify-between">
                <span>Service Fee (10%):</span>
                <span>₹ {formatNumberToIndian(serviceFee)}</span>
              </div>
            </div>
          )}
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-semibold text-lg">
          <span>Total:</span>
          <span>₹ {formatNumberToIndian(baseRate + otherCharges)}</span>
        </div>
      </div>

      {/* Rent Now Button */}
      <button
        onClick={processPayment}
        disabled={loading}
        className={`relative w-full px-3 py-2 rounded-md text-white font-semibold text-md 
          ${loading ? 'bg-gray-500' : 'bg-foreground hover:bg-gray-800'} overflow-hidden`}
      >
        <TbCoin className='inline mr-4 mb-0.5 text-sm' />
        {loading ? 'Processing...' : 'Rent Now'}
        <TbCoin className='inline ml-4 mb-0.5 text-sm' />
        <span className="absolute top-0 left-0 w-[300px] h-full bg-gradient-to-r from-transparent via-white/50 to-transparent 
              transform -skew-x-12 -translate-x-full animate-shine">
        </span>
      </button>
    </div>
  );
};

export default PropertyPayment;