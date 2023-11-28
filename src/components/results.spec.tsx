import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";

import type { Results } from "../shared.types";
import { Page } from "../shared.types";
import { theme } from "../theme";

import { ResultsPage } from "./results";

describe("ResultsPage", () => {
  const mockResults: Results = {
    rounds: [
      {
        questions: [true, false, true],
      },
      {
        questions: [false, true, false],
      },
    ],
  };

  it("renders results correctly", () => {
    render(
      <ThemeProvider theme={theme}>
        <ResultsPage
          results={mockResults}
          setResults={jest.fn()}
          setCurrentPage={jest.fn()}
        />
      </ThemeProvider>
    );

    expect(screen.getByText(/Results/i)).toBeInTheDocument();

    mockResults.rounds.forEach((round, index) => {
      expect(screen.getByText(`Round ${index + 1}`)).toBeInTheDocument();

      round.questions.forEach((question, questionIndex) => {
        expect(
          screen.getAllByText(`Q${questionIndex + 1}.`)[index]
        ).toBeInTheDocument();
      });
    });
    expect(screen.getAllByText("Correct").length).toBe(3);
    expect(screen.getAllByText("Incorrect").length).toBe(3);
  });

  it("navigates to Home on button click", () => {
    const setCurrentPage = jest.fn();
    const setResults = jest.fn();

    render(
      <ThemeProvider theme={theme}>
        <ResultsPage
          results={mockResults}
          setResults={setResults}
          setCurrentPage={setCurrentPage}
        />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: /Home/i }));
    expect(setCurrentPage).toHaveBeenCalledWith(Page.Home);
    expect(setResults).toHaveBeenCalledWith({ rounds: [] });
  });
});
