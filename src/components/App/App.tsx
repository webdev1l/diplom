import React from "react";

import "./App.css";
import { Container, Grid, Paper } from "@material-ui/core";
import NewRequest from "../NewRequest/NewRequest";

const App: React.FC = () => {
  return (
    <div className="App">
      <Container>
        <Grid container spacing={1} justify="center">
          <Grid item xs={12} md={6}>
            <NewRequest />
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className="paper">
              <h2 className="paper__heading">Узнать статус заказа:</h2>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default App;
