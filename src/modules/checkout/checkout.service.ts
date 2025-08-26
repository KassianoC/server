import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class CheckoutService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-07-30.basil',
    });
  }

  async createCheckoutSession(amount: number, currency: string) {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: 'Produto de Teste',
            },
            unit_amount: amount * 100, // Valor em centavos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });
    return session.url;
  }
}
