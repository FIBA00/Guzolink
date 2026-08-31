import { describe, expect, it } from "vitest";
import { MockPaymentError, processMockPayment } from "./mockPaymentProvider";

describe("processMockPayment", () => {
  it("returns a provider-neutral successful handoff result", async () => {
    const result = await processMockPayment({ amount: 780, currency: "ETB", orderReference: "GL-PREVIEW-2049" });
    expect(result).toMatchObject({ provider: "LedgerPay Sandbox", status: "paid", amount: 780, currency: "ETB" });
    expect(result.transactionId).toBe("LP-GL-PREVIEW-2049-TEST");
  });
  it("rejects with a sandbox provider error when failure is selected", async () => {
    await expect(processMockPayment({ amount: 780, outcome: "failure" })).rejects.toBeInstanceOf(MockPaymentError);
  });
});
