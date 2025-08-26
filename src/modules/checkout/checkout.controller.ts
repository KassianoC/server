import { Controller, Post, Body } from '@nestjs/common';
import { CheckoutService } from './checkout.service';

@Controller('payment')
export class CheckoutController {
  constructor(private stripeService: CheckoutService) {}

  @Post('create-checkout-session')
  async createCheckoutSession(
    @Body() body: { amount: number; currency: string },
  ) {
    const { amount, currency } = body;
    const url = await this.stripeService.createCheckoutSession(
      amount,
      currency,
    );
    return { url };
  }
}
