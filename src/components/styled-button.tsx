import { Button } from "@mui/material";
import { styled } from "@mui/system";

export const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "white",
  color: theme.palette.primary.main,
  width: 240,
  fontSize: "1.2rem",
  fontWeight: 700,
  "&:hover": {
    backgroundColor: "white",
  },
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  height: 80,
}));
