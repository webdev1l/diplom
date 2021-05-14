import React, { FormEvent, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Paper,
  Select,
  Snackbar,
  TextField,
} from "@material-ui/core";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import axios from "axios";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface INewRequest {
  company: string;
  volume: number | string;
  count: string;
}

interface ISnackBar {
  open: boolean;
  text?: string;
}

const volumes = [0.5, 1.0, 1.5];

const NewRequest: React.FC = () => {
  const [formState, setFormState] = useState<INewRequest>({
    company: "",
    volume: "0.5",
    count: "",
  });

  const [snackbarState, setSnackbarState] = useState<ISnackBar>({
    open: false,
  });

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof formState;
    setFormState({
      ...formState,
      [name]: event.target.value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formState.company.length < 4) {
      setSnackbarState({
        open: true,
        text: "Имя компании должно содержать более трех символов",
      });
      return;
    }
    if (isNaN(Number(formState.count)) || Number(formState.count) === 0) {
      setSnackbarState({
        open: true,
        text: "Неверно задано количество",
      });
      return;
    }
    try {
      console.log(
        JSON.stringify({
          ...formState,
          count: Number(formState.count),
          volume: Number(formState.volume),
        })
      );
      const response = await axios.post(
        "localhost:8081/order",
        JSON.stringify({
          ...formState,
          count: Number(formState.count),
          volume: Number(formState.volume),
        })
      );
    } catch (e) {
      setSnackbarState({
        open: true,
        text: e.message,
      });
    }
  };

  return (
    <Paper className="paper">
      <h2 className="paper__heading">Добавить новую заявку:</h2>
      <form className="paper__form" onSubmit={handleSubmit}>
        <TextField
          label="Заказчик"
          variant="outlined"
          value={formState?.company}
          inputProps={{
            name: "company",
          }}
          onChange={handleChange}
        />
        <FormControl variant="outlined">
          <InputLabel htmlFor="new-request-volume">Объем</InputLabel>
          <Select
            native
            label="Объем"
            value={formState?.volume}
            inputProps={{
              name: "volume",
              id: "new-request-volume",
            }}
            onChange={handleChange}
          >
            {volumes.map((volume, index) => (
              <option value={volume} key={index}>
                {volume}
              </option>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Количество"
          variant="outlined"
          value={formState?.count}
          inputProps={{
            name: "count",
          }}
          onChange={handleChange}
        />
        <Button color="primary" type="submit">
          Добавить
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
    </Paper>
  );
};

export default NewRequest;
