import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";

import { Page } from "../shared.types";
import { theme } from "../theme";
import { mockActivities, mockAppInfo } from "../mock-data";

import { HomePage } from "./home";

describe("HomePage", () => {
  it("displays the app name and heading", () => {
    render(
      <ThemeProvider theme={theme}>
        <HomePage
          appInfo={mockAppInfo}
          activities={[]}
          setCurrentActivity={jest.fn()}
          setCurrentPage={jest.fn()}
        />
      </ThemeProvider>
    );
    expect(screen.getByText(mockAppInfo.name)).toBeInTheDocument();
    expect(screen.getByText(mockAppInfo.heading)).toBeInTheDocument();
  });

  it("renders a list of activities", () => {
    render(
      <ThemeProvider theme={theme}>
        <HomePage
          appInfo={mockAppInfo}
          activities={mockActivities}
          setCurrentActivity={jest.fn()}
          setCurrentPage={jest.fn()}
        />
      </ThemeProvider>
    );
    expect(screen.getByText("Activity 1")).toBeInTheDocument();
    expect(screen.getByText("Activity 2")).toBeInTheDocument();
  });

  it("calls setCurrentActivity and setCurrentPage when an activity is clicked", () => {
    const setCurrentActivity = jest.fn();
    const setCurrentPage = jest.fn();

    render(
      <ThemeProvider theme={theme}>
        <HomePage
          appInfo={mockAppInfo}
          activities={mockActivities}
          setCurrentActivity={setCurrentActivity}
          setCurrentPage={setCurrentPage}
        />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText("Activity 1"));
    expect(setCurrentActivity).toHaveBeenCalledWith(0);
    expect(setCurrentPage).toHaveBeenCalledWith(Page.Quiz);
  });
});
