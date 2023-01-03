import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { useState } from "react";

const Calendar = () => {
  const [value, setValue] = useState(dayjs("2022-12-08"));

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          openTo="day"
          value={value}
          onChange={(e) => {
            setValue(dayjs(e.$d));
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      {value.format("YYYY-MM-DD")}
    </>
  );
};

export default Calendar;
