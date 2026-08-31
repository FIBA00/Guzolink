/** Style: Market Ledger — the sandbox provider models a clear provider handoff with controllable test outcomes and no sensitive payment data. */
export class MockPaymentError extends Error { constructor(message = "The sandbox provider declined this transaction.") { super(message); this.name = "MockPaymentError"; } }
export function processMockPayment({ amount, currency = "ETB", orderReference, outcome = "success" }) {
  return new Promise((resolve, reject) => {
    globalThis.setTimeout(() => { if (outcome === "failure") { reject(new MockPaymentError()); return; } resolve({ provider: "LedgerPay Sandbox", status: "paid", amount, currency, transactionId: `LP-${orderReference || "CHECKOUT"}-TEST` }); }, 520);
  });
}
