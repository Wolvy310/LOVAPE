interface OrderRequestedEmailPayload {
  orderRef: string;
  customerEmail: string;
  totalCents: number;
  itemCount: number;
  requestId: string;
}

interface EmailProvider {
  sendOrderRequested(payload: OrderRequestedEmailPayload): Promise<void>;
}

class ConsoleEmailProvider implements EmailProvider {
  async sendOrderRequested(payload: OrderRequestedEmailPayload): Promise<void> {
    process.stdout.write(
      `[email:console] order.requested ${JSON.stringify({
        orderRef: payload.orderRef,
        customerEmail: payload.customerEmail,
        totalCents: payload.totalCents,
        itemCount: payload.itemCount,
        requestId: payload.requestId
      })}\n`
    );
  }
}

class DisabledEmailProvider implements EmailProvider {
  async sendOrderRequested(): Promise<void> {
    return;
  }
}

function resolveEmailProvider(): EmailProvider {
  const provider = (process.env.EMAIL_PROVIDER ?? "console").toLowerCase();
  if (provider === "console") return new ConsoleEmailProvider();
  return new DisabledEmailProvider();
}

export async function sendOrderRequestedEmail(payload: OrderRequestedEmailPayload): Promise<void> {
  const provider = resolveEmailProvider();
  await provider.sendOrderRequested(payload);
}

