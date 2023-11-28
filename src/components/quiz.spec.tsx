import { render, screen, act, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";

import { Page } from "../shared.types";
import { mockActivities } from "../mock-data";
import { theme } from "../theme";

import { QuizPage } from "./quiz";

describe("QuizPage", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders the activity name", () => {
    render(
      <ThemeProvider theme={theme}>
        <QuizPage
          activity={mockActivities[0]}
          setCurrentPage={jest.fn()}
          setResults={jest.fn()}
        />
      </ThemeProvider>
    );
    expect(screen.getByText("ACTIVITY 1")).toBeInTheDocument();
  });

  it("renders RoundBox for multiple rounds when on round page", () => {
    render(
      <ThemeProvider theme={theme}>
        <QuizPage
          activity={mockActivities[0]}
          setCurrentPage={jest.fn()}
          setResults={jest.fn()}
        />
      </ThemeProvider>
    );
    expect(screen.getByText("Round 1")).toBeInTheDocument();
  });

  it("renders QuestionBox for single round activities", () => {
    const singleRoundActivity = {
      ...mockActivities[0],
      rounds: [mockActivities[0].rounds[0]],
    };

    render(
      <ThemeProvider theme={theme}>
        <QuizPage
          activity={singleRoundActivity}
          setCurrentPage={jest.fn()}
          setResults={jest.fn()}
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

  it("navigates to results page after last question", () => {
    const singleRoundActivity = {
      ...mockActivities[0],
      rounds: [mockActivities[0].rounds[0]],
    };

    const setCurrentPage = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <QuizPage
          activity={singleRoundActivity}
          setCurrentPage={setCurrentPage}
          setResults={jest.fn()}
        />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText("CORRECT"));
    fireEvent.click(screen.getByText("INCORRECT"));
    fireEvent.click(screen.getByText("CORRECT"));
    fireEvent.click(screen.getByText("INCORRECT"));

    expect(setCurrentPage).toHaveBeenCalledWith(Page.Results);
  });
});
