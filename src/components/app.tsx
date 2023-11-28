import { useEffect, useState } from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { Container, Box } from "@mui/system";
import { styled } from "@mui/material/styles";

import type { RawData, Activity, AppInfo, Results } from "../shared.types";
import { Page } from "../shared.types";
import { parseData } from "../utils";

import { HomePage } from "./home";
import { QuizPage } from "./quiz";
import { ResultsPage } from "./results";
import { Home as HomeIcon } from "@mui/icons-material";

const CAEAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.primary.dark,
}));

export const App = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [appInfo, setAppInfo] = useState<AppInfo>({ name: "", heading: "" });
  const [currentActivity, setCurrentActivity] = useState<number>(-1);
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [results, setResults] = useState<Results>({ rounds: [] });

  useEffect(() => {
    fetch("https://cupa-frontend-test.s3.eu-west-1.amazonaws.com/payload.json")
      .then((res) => res.json())
      .then((data) => {
        const [parsedAppInfo, parsedActivities] = parseData(data as RawData);
        setAppInfo(parsedAppInfo);
        setActivities(parsedActivities);
      });
  }, []);

  return (
    <Container>
      <CAEAppBar elevation={0}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="home button"
            onClick={() => {
              setCurrentPage(Page.Home);
              setCurrentActivity(-1);
              setResults({ rounds: [] });
            }}
          >
            <HomeIcon />
          </IconButton>
          <Typography
            variant="h5"
            noWrap
            sx={{ flexGrow: 1, textAlign: "center", ml: -4 }}
          >
            CAE
          </Typography>
        </Toolbar>
      </CAEAppBar>
      <Box component="main">
        <Toolbar />
        {currentPage === Page.Home && (
          <HomePage
            appInfo={appInfo}
            activities={activities}
            setCurrentActivity={setCurrentActivity}
            setCurrentPage={setCurrentPage}
          />
        )}
        {currentPage === Page.Quiz && (
          <QuizPage
            activity={activities[currentActivity]}
            setCurrentPage={setCurrentPage}
            setResults={setResults}
          />
        )}
        {currentPage === Page.Results && (
          <ResultsPage
            results={results}
            setResults={setResults}
            setCurrentPage={setCurrentPage}
          />
        )}
      </Box>
    </Container>
  );
};
