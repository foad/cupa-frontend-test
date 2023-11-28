import { Fragment } from "react";
import { Box } from "@mui/system";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  ListItemIcon,
} from "@mui/material";
import {
  Check as CheckIcon,
  Clear as ClearIcon,
  Home as HomeIcon,
} from "@mui/icons-material";

import type { Results } from "../shared.types";
import { Page } from "../shared.types";
import { StyledButton } from "./styled-button";

type ResultsProps = {
  results: Results;
  setResults: (results: Results) => void;
  setCurrentPage: (page: Page) => void;
};

export const ResultsPage = ({
  results,
  setResults,
  setCurrentPage,
}: ResultsProps) => {
  return (
    <>
      <Box component="header" sx={{ py: 8 }}>
        <Typography variant="h2" component="h2" sx={{ mb: 2 }} align="center">
          Results
        </Typography>
      </Box>
      <Box component="section">
        <List>
          {results.rounds.map((result, index) => {
            return (
              <Fragment key={index}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" component="h6" align="center">
                  Round {index + 1}
                </Typography>
                <Divider sx={{ my: 2 }} />
                {result.questions.map((question, questionIndex) => (
                  <ListItem key={questionIndex}>
                    <ListItemText
                      primaryTypographyProps={{
                        fontSize: "1.5rem",
                      }}
                      primary={`Q${questionIndex + 1}.`}
                    />
                    <Typography
                      variant="h6"
                      component="h6"
                      sx={{ mr: 1 }}
                      color="text.secondary"
                    >
                      {question ? "Correct" : "Incorrect"}
                    </Typography>
                    <ListItemIcon>
                      {question ? (
                        <CheckIcon sx={{ color: "white" }} />
                      ) : (
                        <ClearIcon sx={{ color: "white" }} />
                      )}
                    </ListItemIcon>
                  </ListItem>
                ))}
                <Divider />
              </Fragment>
            );
          })}
        </List>
        <Box textAlign="center">
          <StyledButton
            sx={{ mt: 4 }}
            onClick={() => {
              setCurrentPage(Page.Home);
              setResults({ rounds: [] });
            }}
            startIcon={<HomeIcon />}
          >
            Home
          </StyledButton>
        </Box>
      </Box>
    </>
  );
};
