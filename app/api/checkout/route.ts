import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { resend } from '@/lib/resend';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customer, items, subtotal, logisticsFee, grandTotal } = body;

    const orderNumber = `DTO-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

    // 1. Optional Database Write to Supabase if configured
    if (
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder')
    ) {
      try {
        const { data: orderData, error: orderError } = await supabase
          .from('orders')
          .insert({
            order_number: orderNumber,
            customer_name: customer.fullName,
            customer_phone: customer.phone,
            customer_email: customer.email || 'guest@doutareagro.com',
            shipping_address_line: customer.addressLine || 'Farm Gate Pickup',
            shipping_city: customer.city || 'Ayakoromo',
            shipping_state: customer.state || 'Delta State',
            shipping_method: customer.deliveryMethod,
            subtotal_amount: subtotal,
            shipping_fee: logisticsFee,
            total_amount: grandTotal,
            status: 'pending_payment',
            payment_status: 'unpaid',
            notes: customer.notes || '',
          })
          .select()
          .single();

        if (!orderError && orderData && items.length > 0) {
          const orderItemsPayload = items.map((i: any) => ({
            order_id: orderData.id,
            product_title: i.title,
            variant_title: i.variantTitle,
            sku: i.sku,
            unit_price: i.unitPrice,
            quantity: i.quantity,
            total_price: i.totalPrice,
          }));

          await supabase.from('order_items').insert(orderItemsPayload);
        }
      } catch (dbErr) {
        console.warn('Supabase write skipped or failed:', dbErr);
      }
    }

    // 2. Optional Resend Email Dispatch
    if (
      customer.email &&
      process.env.RESEND_API_KEY &&
      !process.env.RESEND_API_KEY.includes('placeholder')
    ) {
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || 'orders@doutareagro.com',
          to: customer.email,
          subject: `Order Confirmation - ${orderNumber} | Doutare Agro Farm`,
          html: `
            <h2>Thank You For Your Order!</h2>
            <p>Dear ${customer.fullName},</p>
            <p>Your order <strong>${orderNumber}</strong> has been received by Doutare Agro Farm Limited.</p>
            <p><strong>Total Amount:</strong> ₦${grandTotal.toLocaleString()}</p>
            <p><strong>Delivery Method:</strong> ${customer.deliveryMethod.replace(/_/g, ' ')}</p>
            <hr />
            <p>Please transfer to our corporate account and send payment receipt to WhatsApp +234 807 355 3976 for rapid dispatch.</p>
          `,
        });
      } catch (emailErr) {
        console.warn('Resend email dispatch skipped or failed:', emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      orderNumber,
      message: 'Order recorded successfully',
    });
  } catch (error: any) {
    console.error('Checkout API error:', error);
    return NextResponse.json(
      { success: false, message: error?.message || 'Server error' },
      { status: 500 }
    );
  }
}

