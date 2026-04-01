import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// ─── Component Tests ────────────────────────────────────────────────
// Test React components with @testing-library/react.
// Use accessibility queries (getByRole, getByLabelText, getByText).

// Example component — replace with your actual import
function Counter({ initial = 0 }: { initial?: number }) {
  const [count, setCount] = React.useState(initial);
  return (
    <div>
      <span role="status">{count}</span>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

import React from "react";

describe("Counter", () => {
  it("renders with initial value", () => {
    render(<Counter initial={5} />);
    expect(screen.getByRole("status")).toHaveTextContent("5");
  });

  it("increments on button click", async () => {
    const user = userEvent.setup();
    render(<Counter />);

    await user.click(screen.getByRole("button", { name: "Increment" }));

    expect(screen.getByRole("status")).toHaveTextContent("1");
  });

  it("resets to zero", async () => {
    const user = userEvent.setup();
    render(<Counter initial={10} />);

    await user.click(screen.getByRole("button", { name: "Reset" }));

    expect(screen.getByRole("status")).toHaveTextContent("0");
  });
});
