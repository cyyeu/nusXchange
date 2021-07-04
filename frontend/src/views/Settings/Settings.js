import React from "react";
import VerticalTabs from "./components/VerticalTabs";
import { Grid } from "@material-ui/core";
import styled from "styled-components";

const Settings = () => {
  return (
    <CustomGrid container justify="center" alignItems="flex-start">
      <Grid item>
        <VerticalTabs />
      </Grid>
    </CustomGrid>
  );
};

const CustomGrid = styled(Grid)`
  margin: 100px auto 0 auto;
`;
export default Settings;
