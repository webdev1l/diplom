import React from "react";

import "./App.css";
import { Container, Grid, Paper } from "@material-ui/core";
import NewRequest from "../NewRequest/NewRequest";
import CheckRequest from "../CheckRequest/CheckRequest";

const App: React.FC = () => {
  return (
    <div className="App">
      <Container>
        <Grid container spacing={1} justify="center">
          <Grid item xs={12} md={6}>
            <NewRequest />
          </Grid>
          <Grid item xs={12} md={6}>
            <CheckRequest />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default App;
