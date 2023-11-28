import { Box, Divider, Typography } from "@mui/material";

import type { Question } from "../shared.types";

import { FormattedText } from "./formatted-text";
import { StyledButton } from "./styled-button";

type QuestionBoxProps = {
  questions: Question[];
  currentQuestion: number;
  handleButton: (isCorrect: boolean) => () => void;
};

export const QuestionBox = ({
  questions,
  currentQuestion,
  handleButton,
}: QuestionBoxProps) => {
  return (
    <>
      <Typography variant="h3" component="h3" sx={{ py: 4 }}>
        Q{currentQuestion + 1}.
      </Typography>
      <Divider sx={{ my: 4 }} />
      <FormattedText>{questions[currentQuestion].stimulus}</FormattedText>
      <Divider sx={{ my: 4 }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: { xs: "center", sm: "space-between" },
          alignItems: "center",
        }}
      >
        <StyledButton onClick={handleButton(true)}>CORRECT</StyledButton>
        <StyledButton onClick={handleButton(false)}>INCORRECT</StyledButton>
      </Box>
    </>
  );
};
