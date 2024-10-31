import Razorpay from 'razorpay';
import { NextRequest, NextResponse } from 'next/server';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
  const { amount, currency } = await request.json();

  const options = {
    amount: amount,
    currency: currency,
    receipt: 'receipt_id',
  };

  const order = await razorpay.orders.create(options);
  return NextResponse.json({ orderId: order.id });
}



// import Razorpay from 'razorpay';
// import { NextResponse } from 'next/server';

// const razorpay = new Razorpay({
//   key_id: process.env.KEY_ID, // Typically environment variables are uppercase
//   key_secret: process.env.KEY_SECRET,
// });

// export async function POST(request) {
//   try {
//     const { amount, currency } = await request.json();

//     const options = {
//       amount: amount * 100, // Razorpay accepts amount in paise, so multiply by 100 if your amount is in rupees
//       currency: currency || 'INR', // Set default currency to INR if not provided
//       receipt: `rcp_${Date.now()}`, // Unique receipt ID for each order
//     };

//     const order = await razorpay.orders.create(options);

//     return NextResponse.json({ orderId: order.id, amount: order.amount, currency: order.currency }, { status: 200 });
//   } catch (error) {
//     console.error("Error creating Razorpay order:", error);
//     return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
//   }
// }
