import React, { useState } from "react";
import { Button, Paper, Snackbar, TextField } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import axios from "axios";

import "./CheckRequest.css";

const CheckRequest: React.FC = () => {
  interface IServerResponse {
    data: IServerData;
  }

  interface IServerData {
    stage: string;
    boxesReady: number;
    boxes: number;
    bottlesReady: number;
    bottles: number;
    company: string;
  }

  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formState.length === 0) {
      setSnackbarState({
        open: true,
        text: "Номер заявки не может быть пустым",
      });
      return;
    }

    // const response = await axios.get(`localhost:8081/order/${formState}`);
    try {
      const response = await axios.request<IServerData>({
        url: "/test.json",
        transformResponse: (r: IServerResponse) => r.data,
      });

      setDialogState({
        open: true,
        data: JSON.parse(response.request.response),
      });
    } catch (e) {
      setSnackbarState({
        open: true,
        text: e.message,
      });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (isNaN(Number(e.target.value))) {
      return;
    }
    setFormState(e.target.value);
  };

  const handleClose = () => {
    setDialogState((prevState) => {
      return {
        ...prevState,
        open: false,
      };
    });
  };

  interface ISnackBar {
    open: boolean;
    text?: string;
  }

  const [snackbarState, setSnackbarState] = useState<ISnackBar>({
    open: false,
  });

  const [formState, setFormState] = useState<string>("");

  interface IDialogState {
    open: boolean;
    data?: IServerData;
  }

  const [dialogState, setDialogState] = useState<IDialogState>({
    open: true,
  });

  return (
    <Paper className="paper">
      <h2 className="paper__heading">Узнать статус заказа:</h2>
      <form className="paper__form" onSubmit={(e) => handleSubmit(e)}>
        <TextField
          variant="outlined"
          label="Номер заявки"
          value={formState}
          onChange={(e) => handleChange(e)}
        />
        <Button color="primary" type="submit">
          Отправить
        </Button>
      </form>
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={3000}
        onClose={() => setSnackbarState({ open: false, text: "" })}
      >
        <Alert
          severity="error"
          onClose={() => setSnackbarState({ open: false, text: "" })}
        >
          {snackbarState.text}
        </Alert>
      </Snackbar>
      <Dialog open={dialogState.open} onClose={handleClose} className="dialog">
        <DialogTitle>Информация по заказу №21</DialogTitle>
        <div className="dialog__content">
          <span>Заказчик: {dialogState.data?.company}</span>
          <span>Cтатус: {dialogState.data?.stage}</span>
          <span>
            Готово бутылок:{" "}
            {dialogState.data?.bottlesReady + "/" + dialogState.data?.bottles}
          </span>
          <span>
            Готово ящиков:{" "}
            {dialogState.data?.boxesReady + "/" + dialogState.data?.boxes}
          </span>
        </div>
      </Dialog>
    </Paper>
  );
};

export default CheckRequest;
