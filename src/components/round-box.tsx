import { useEffect, useState } from "react";
import { LinearProgress, Typography } from "@mui/material";

type RoundBoxProps = {
  currentRound: number;
  setCurrentQuestion: (question: number) => void;
};

export const ROUND_TIMEOUT = 1000;

export const RoundBox = ({
  currentRound,
  setCurrentQuestion,
}: RoundBoxProps) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const roundInterval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 10;
        if (newProgress >= 100) {
          clearInterval(roundInterval);
        }
        return newProgress;
      });
    }, ROUND_TIMEOUT / 10);

    return () => {
      clearInterval(roundInterval);
    };
  });

  useEffect(() => {
    if (progress >= 100) {
      setCurrentQuestion(0);
    }
  }, [progress, setCurrentQuestion]);

  return (
    <>
      <Typography variant="h1" component="h1" sx={{ pt: 4, pb: 8 }}>
        Round {currentRound + 1}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={progress}
        color="secondary"
      />
    </>
  );
};
