import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { useState } from "react";

type Habit = {
  id?: number;
  name: string;
  time: string;
};

type CalendarProps = {
  habit: Habit;
};

const Calendar = ({ habit }: CalendarProps) => {
  const [value, setValue] = useState<Dayjs | null>(dayjs(new Date()));

  return (
    <>
      <h2 className="text-lg font-bold text-center p-2 bg-blue-500">
        {habit.name} : {habit.time}
      </h2>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          openTo="day"
          value={value}
          onChange={(e) => {
            setValue(dayjs(e?.$d));
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </>
  );
};

export default Calendar;
