import React, { useState } from "react";
import { Breadcrumbs, Typography } from "@mui/material";
import { Box } from "@mui/system";

import type { Activity, Results } from "../shared.types";
import { Page } from "../shared.types";

import { QuestionBox } from "./question-box";
import { RoundBox } from "./round-box";

type QuizPageProps = {
  activity: Activity;
  setCurrentPage: (page: Page) => void;
  setResults: React.Dispatch<React.SetStateAction<Results>>;
};

export const QuizPage = ({
  activity,
  setCurrentPage,
  setResults,
}: QuizPageProps) => {
  const hasMultipleRounds = activity.rounds.length > 1;
  const [currentRound, setCurrentRound] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<number>(
    hasMultipleRounds ? -1 : 0
  );
  const isRoundPage = hasMultipleRounds && currentQuestion === -1;

  const questions = activity.rounds[currentRound].questions;

  const updateResults = (isCorrect: boolean) => {
    setResults((prevResults: Results) => {
      const newResults = { ...prevResults };
      if (!newResults.rounds[currentRound]) {
        newResults.rounds[currentRound] = { questions: [] };
      }
      newResults.rounds[currentRound].questions.push(
        isCorrect === questions[currentQuestion].is_correct
      );
      return newResults;
    });
  };

  const updateQuestion = () => {
    const isFinalQuestion = currentQuestion === questions.length - 1;
    if (hasMultipleRounds) {
      if (isFinalQuestion) {
        if (currentRound === activity.rounds.length - 1) {
          return setCurrentPage(Page.Results);
        } else {
          setCurrentRound(currentRound + 1);
          return setCurrentQuestion(-1);
        }
      }
    }
    if (isFinalQuestion) {
      return setCurrentPage(Page.Results);
    }
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleButton = (isCorrect: boolean) => () => {
    updateResults(isCorrect);
    updateQuestion();
  };

  return (
    <>
      <Box component="header" sx={{ py: 2 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 2 }}>
          <Typography variant="h6" component="h6" color="text.secondary">
            {activity.activity_name?.toUpperCase()}
          </Typography>
          {!isRoundPage && hasMultipleRounds && (
            <Typography variant="h6" component="h6" color="text.secondary">
              ROUND {currentRound + 1}
            </Typography>
          )}
        </Breadcrumbs>
      </Box>
      <Box component="section">
        {isRoundPage ? (
          <RoundBox
            currentRound={currentRound}
            setCurrentQuestion={setCurrentQuestion}
          />
        ) : (
          <QuestionBox
            questions={questions}
            currentQuestion={currentQuestion}
            handleButton={handleButton}
          />
        )}
      </Box>
    </>
  );
};
