import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { Box } from "@mui/system";

import type { Activity, AppInfo } from "../shared.types";
import { Page } from "../shared.types";

import { StyledButton } from "./styled-button";

type HomePageProps = {
  appInfo: AppInfo;
  activities: Activity[];
  setCurrentActivity: (activity: number) => void;
  setCurrentPage: (page: Page) => void;
};

export const HomePage = ({
  appInfo,
  activities,
  setCurrentActivity,
  setCurrentPage,
}: HomePageProps) => {
  return (
    <>
      <Box component="header" sx={{ py: 8 }}>
        <Typography variant="h2" component="h2" sx={{ mb: 2 }} align="center">
          {appInfo.name}
        </Typography>
        <Typography variant="h6" component="h6" align="center">
          {appInfo.heading}
        </Typography>
      </Box>
      <Box component="section">
        <List>
          {activities.map((activity) => {
            return (
              <ListItem key={activity.order} sx={{ justifyContent: "center" }}>
                <StyledButton
                  onClick={() => {
                    setCurrentActivity(activity.order - 1);
                    setCurrentPage(Page.Quiz);
                  }}
                >
                  <ListItemText
                    primaryTypographyProps={{
                      fontSize: "1.5rem",
                      textAlign: "center",
                    }}
                    primary={activity.activity_name}
                  />
                </StyledButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </>
  );
};
