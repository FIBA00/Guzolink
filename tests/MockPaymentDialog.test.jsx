/** @vitest-environment jsdom */
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import MockPaymentDialog from "../res/components/common/MockPaymentDialog";

describe("MockPaymentDialog", () => {
  afterEach(() => {
    vi.useRealTimers();
    cleanup();
  });
  it("completes the sandbox handoff and returns the provider result", async () => {
    vi.useFakeTimers();
    const onSuccess = vi.fn();
    render(
      <MockPaymentDialog
        open
        onClose={vi.fn()}
        amount={780}
        orderReference="GL-2049"
        onSuccess={onSuccess}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /pay.*780.*sandbox/i }));
    expect(screen.getByText("Verifying with provider…")).toBeTruthy();
    await act(async () => {
      await vi.advanceTimersByTimeAsync(520);
    });
    expect(screen.getByText("Payment approved.")).toBeTruthy();
    await act(async () => {
      await vi.advanceTimersByTimeAsync(420);
    });
    expect(onSuccess).toHaveBeenCalledWith(
      expect.objectContaining({
        provider: "LedgerPay Sandbox",
        status: "paid",
        transactionId: "LP-GL-2049-TEST",
      })
    );
  });
  it("renders a failed outcome without calling the order success callback", async () => {
    vi.useFakeTimers();
    const onSuccess = vi.fn();
    const onFailure = vi.fn();
    render(
      <MockPaymentDialog
        open
        onClose={vi.fn()}
        amount={780}
        orderReference="GL-2049"
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: "Simulate failure" }));
    fireEvent.click(
      screen.getByRole("button", { name: "Simulate failed payment" })
    );
    await act(async () => {
      await vi.advanceTimersByTimeAsync(520);
    });
    expect(screen.getByText("Payment failed.")).toBeTruthy();
    expect(onFailure).toHaveBeenCalledTimes(1);
    expect(onSuccess).not.toHaveBeenCalled();
  });
});
