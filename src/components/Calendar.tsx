import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import Badge from "@mui/material/Badge";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

type Habit = {
  id?: number;
  name: string;
  time: string | Dayjs | null;
};

type CalendarProps = {
  habit: Habit;
};

const Calendar = ({ habit }: CalendarProps) => {
  const [value, setValue] = useState(new Date());
  const [highlightedDays, setHighlightedDays] = useState({
    "2022": {
      "0": [1, 2, 4, 5, 11],
      "1": [1],
      "10": [
        1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
        22,
      ],
      "11": [
        1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
        22,
      ],
    },
    "2023": { "0": [1, 2, 4, 5, 12] },
  });

  const checkIfDayExisted = (day: any) => {
    const year = day.$y;
    const month = day.$M;
    for (const h in highlightedDays) {
      if (h == year && month in highlightedDays[h]) {
        return highlightedDays[h][month].indexOf(day.$d.getDate()) >= 0;
      }
    }
  };

  const toggleDay = (day: any) => {
    const year = day.$y;
    const month = day.$M;
    if (!(year in highlightedDays)) {
      console.log("no year");
      setHighlightedDays({
        ...highlightedDays,
        [year]: { [month]: [day.$d.getDate()] },
      });
      return;
    }

    if (!(month in highlightedDays[year])) {
      console.log("no month");
      setHighlightedDays({
        ...highlightedDays,
        [year]: { ...highlightedDays[year], [month]: [day.$d.getDate()] },
      });

      return;
    }

    for (const y in highlightedDays) {
      for (const m in highlightedDays[y]) {
        if (year == y && month == m) {
          console.log("year and month");
          setHighlightedDays({
            ...highlightedDays,
            [year]: {
              ...highlightedDays[y],
              [month]: toggleElement(highlightedDays[y][m], day.$d.getDate()),
            },
          });
        }
      }
    }
  };

  const toggleElement = (arr: number[], val: number) =>
    arr.includes(val) ? arr.filter((el) => el !== val) : [...arr, val];

  let startingDate = new Date("2022-10-15");

  return (
    <>
      <h2 className="text-lg font-bold text-center p-2 bg-blue-500">
        {habit.name + " " + habit.time}
      </h2>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          openTo="day"
          value={value}
          minDate={startingDate}
          disableFuture
          onChange={(day: Date) => toggleDay(day)}
          renderInput={(params) => {
            return <TextField {...params} />;
          }}
          renderDay={(day: Date, _value: Date, DayComponentProps: any) => {
            console.log();
            const isSelected = checkIfDayExisted(day);
            return (
              <Badge
                key={day.toString()}
                overlap="circular"
                badgeContent={
                  day < new Date() &&
                  day >= startingDate &&
                  !DayComponentProps.outsideCurrentMonth ? (
                    isSelected ? (
                      <CheckIcon color="success" />
                    ) : (
                      <CloseIcon color="warning" />
                    )
                  ) : null
                }
              >
                <PickersDay {...DayComponentProps} />
              </Badge>
            );
          }}
        />
      </LocalizationProvider>
    </>
  );
};

export default Calendar;
