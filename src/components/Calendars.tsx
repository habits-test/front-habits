import { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/Add";
import Calendar from "./Calendar";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Drawerr from "./ui/Drawerr";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import dayjs, { Dayjs } from "dayjs";

type Habit = {
  id?: number;
  name: string;
  time: string | Dayjs | null;
  createdAt?: Date;
  progress?: HighlightedDays;
};

type habitState = {
  name: string;
  time: string | Dayjs | null;
  showTime: string | Dayjs | null;
};

type CalendarsProps = {
  habits: Habit[];
  loading: boolean;
  createHabit: (data: Habit) => void;
  updateProgress: (id: number, data: object) => void;
};

type HighlightedDays = {
  [year: string]: {
    [month: string]: number[];
  };
};

const Calendars = ({
  habits,
  loading,
  createHabit,
  updateProgress,
}: CalendarsProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [value, setValue] = useState<habitState>({
    name: "",
    time: "",
    showTime: dayjs(),
  });

  const handleChange = (e: any) => {
    if (e.$L) {
      setValue({ ...value, time: `${e.$H}:${e.$m}`, showTime: e });
    } else {
      setValue({ ...value, name: e.target.value });
    }
  };

  const hadnleCreate = async () => {
    await createHabit({ name: value.name, time: value.time });
    setDrawerOpen(false);
  };

  const ButtonDrawer = () => {
    return (
      <div className="my-5">
        <Button variant="outlined" onClick={() => setDrawerOpen(true)}>
          <AddIcon />
          Add Habito
        </Button>
      </div>
    );
  };
  const BodyDrawer = () => {
    return (
      <div className="px-3 flex flex-col">
        <h1 className="my-5 text-center font-bold text-lg">Create Habito</h1>
        <Stack spacing={3}>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            name="name"
            value={value.name}
            onChange={handleChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopTimePicker
              label="Time"
              value={value.showTime}
              onChange={(e) => handleChange(e)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Stack>
        <Button
          disabled={value.name === "" || value.time === ""}
          sx={{
            mt: 4,
          }}
          variant="contained"
          onClick={hadnleCreate}
        >
          Create
        </Button>
      </div>
    );
  };

  const drawerProps = {
    drawerOpen,
    setDrawerOpen,
    ButtonDrawer,
    BodyDrawer,
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Drawerr {...drawerProps}></Drawerr>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress size="4rem" />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {habits.map((habit) => {
            return (
              <Grid key={habit.id} item xs={12} md={6} lg={4}>
                <Paper
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Calendar habit={habit} updateProgress={updateProgress} />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
};

export default Calendars;
