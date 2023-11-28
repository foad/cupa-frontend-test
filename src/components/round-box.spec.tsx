import { render, act, screen } from "@testing-library/react";

import { RoundBox, ROUND_TIMEOUT } from "./round-box";

describe("RoundBox", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("displays the current round", () => {
    render(<RoundBox currentRound={1} setCurrentQuestion={jest.fn()} />);
    expect(screen.getByText(/Round 2/i)).toBeInTheDocument();
  });

  it("initially has 0% progress", () => {
    render(<RoundBox currentRound={1} setCurrentQuestion={jest.fn()} />);
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "0"
    );
  });

  it("increases progress over time", () => {
    render(<RoundBox currentRound={1} setCurrentQuestion={jest.fn()} />);
    act(() => {
      jest.advanceTimersByTime(ROUND_TIMEOUT / 5);
    });
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      String(10 * (ROUND_TIMEOUT / 500))
    );
  });
});
