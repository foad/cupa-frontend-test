import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";

import { theme } from "../theme";
import { mockQuestions } from "../mock-data";

import { QuestionBox } from "./question-box";

describe("QuestionBox", () => {
  it("renders the correct question based on currentQuestion prop", () => {
    render(
      <ThemeProvider theme={theme}>
        <QuestionBox
          questions={mockQuestions}
          currentQuestion={0}
          handleButton={jest.fn()}
        />
      </ThemeProvider>
    );
    expect(screen.getByText("Q1.")).toBeInTheDocument();
    expect(
      screen.getByText(
        (_, element) => element?.textContent === "Example question 1"
      )
    ).toBeInTheDocument();
  });

  it("calls handleButton with true when CORRECT button is clicked", () => {
    const handleButtonClick = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <QuestionBox
          questions={mockQuestions}
          currentQuestion={0}
          handleButton={handleButtonClick}
        />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByText("CORRECT"));
    expect(handleButtonClick).toHaveBeenCalledWith(true);
  });

  it("calls handleButton with false when INCORRECT button is clicked", () => {
    const handleButtonClick = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <QuestionBox
          questions={mockQuestions}
          currentQuestion={0}
          handleButton={handleButtonClick}
        />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByText("INCORRECT"));
    expect(handleButtonClick).toHaveBeenCalledWith(false);
  });

  it("displays the correct stimulus for a different question", () => {
    render(
      <ThemeProvider theme={theme}>
        <QuestionBox
          questions={mockQuestions}
          currentQuestion={1}
          handleButton={jest.fn()}
        />
      </ThemeProvider>
    );
    expect(screen.getByText("Q2.")).toBeInTheDocument();
    expect(
      screen.getByText(
        (_, element) => element?.textContent === "Example question 2"
      )
    ).toBeInTheDocument();
  });
});
