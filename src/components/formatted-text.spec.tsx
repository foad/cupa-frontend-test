import { render, screen } from "@testing-library/react";

import { FormattedText } from "./formatted-text";

describe("FormattedText", () => {
  it("renders text correctly", () => {
    render(<FormattedText>Test without format</FormattedText>);
    expect(screen.getByText("Test without format")).toBeInTheDocument();
  });

  it("renders bold segments for text within asterisks", () => {
    render(<FormattedText>Normal *Bold* Text</FormattedText>);
    expect(screen.getByText("Normal")).toBeInTheDocument();
    expect(screen.getByText("Bold")).toBeInTheDocument();
    expect(screen.getByText("Text")).toBeInTheDocument();

    const boldSegment = screen.getByText("Bold");
    expect(boldSegment).toHaveStyle({
      fontWeight: 700,
      fontSize: "1.3rem",
      textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
    });
  });

  it("renders multiple formatted segments correctly", () => {
    render(<FormattedText>*First* and *Second* bold segments</FormattedText>);
    expect(screen.getByText("First")).toBeInTheDocument();
    expect(screen.getByText("and")).toBeInTheDocument();
    expect(screen.getByText("Second")).toBeInTheDocument();
    expect(screen.getByText("bold segments")).toBeInTheDocument();

    const firstBold = screen.getByText("First");
    const secondBold = screen.getByText("Second");
    expect(firstBold).toHaveStyle({ fontWeight: 700 });
    expect(secondBold).toHaveStyle({ fontWeight: 700 });
  });
});
