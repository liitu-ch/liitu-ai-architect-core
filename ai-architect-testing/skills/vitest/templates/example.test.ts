import { describe, it, expect } from "vitest";

// ─── Domain Logic Tests ─────────────────────────────────────────────
// Test pure functions and business rules in isolation.

interface OrderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
}

function calculateTotal(items: OrderItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
}

describe("calculateTotal", () => {
  it("returns 0 for an empty list", () => {
    expect(calculateTotal([])).toBe(0);
  });

  it("sums up item totals correctly", () => {
    const items: OrderItem[] = [
      { productId: "A", quantity: 2, unitPrice: 10 },
      { productId: "B", quantity: 1, unitPrice: 25 },
    ];
    expect(calculateTotal(items)).toBe(45);
  });

  it("handles fractional prices", () => {
    const items: OrderItem[] = [
      { productId: "C", quantity: 3, unitPrice: 9.99 },
    ];
    expect(calculateTotal(items)).toBeCloseTo(29.97);
  });
});
