import { Typography } from "@mui/material";

export const FormattedText = ({ children }: { children: string }) => {
  const segments = children.split(/(\*[^*]+\*)/).filter(Boolean);

  return (
    <div>
      {segments.map((segment, index) =>
        segment.startsWith("*") && segment.endsWith("*") ? (
          <Typography
            component="span"
            key={index}
            sx={{
              fontSize: "1.3rem",
              fontWeight: "700",
              textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
            }}
          >
            {segment.slice(1, -1)}
          </Typography>
        ) : (
          <Typography component="span" key={index} sx={{ fontSize: "1.2rem" }}>
            {segment}
          </Typography>
        )
      )}
    </div>
  );
};
