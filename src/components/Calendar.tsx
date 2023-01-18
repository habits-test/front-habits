import { useState, useEffect, useRef } from "react";
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
  id: number;
  name: string;
  time: string | Dayjs | null;
  createdAt: Date;
  progress: HighlightedDays;
};

type HighlightedDays = {
  [year: string]: {
    [month: string]: number[];
  };
};

type CalendarProps = {
  habit: Habit;
  updateProgress: (id: number, data: object) => void;
};

const Calendar = ({ habit, updateProgress }: CalendarProps) => {
  const [value, setValue] = useState<Date>(new Date());
  const [highlightedDays, setHighlightedDays] = useState<HighlightedDays>(
    habit.progress
  );

  const isMounted = useRef(false);

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
      setHighlightedDays({
        ...highlightedDays,
        [year]: { [month]: [day.$d.getDate()] },
      });
      return;
    }

    if (!(month in highlightedDays[year])) {
      setHighlightedDays({
        ...highlightedDays,
        [year]: { ...highlightedDays[year], [month]: [day.$d.getDate()] },
      });
      return;
    }

    for (const y in highlightedDays) {
      for (const m in highlightedDays[y]) {
        if (year == y && month == m) {
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

  let startingDate = new Date(habit.createdAt);
  startingDate.setDate(startingDate.getDate() - 1);
  let minDate = new Date(habit.createdAt);

  useEffect(() => {
    if (isMounted.current) {
      updateProgress(habit.id, highlightedDays);
    } else {
      isMounted.current = true;
    }
  }, [highlightedDays]);

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
          minDate={minDate}
          disableFuture
          onChange={(day: Date | null) => toggleDay(day)}
          renderInput={(params) => {
            return <TextField {...params} />;
          }}
          renderDay={(day: any, _value: Date[], DayComponentProps: any) => {
            const isSelected = checkIfDayExisted(day);
            return (
              <Badge
                key={day.toString()}
                overlap="circular"
                badgeContent={
                  day.$d < new Date() &&
                  day.$d > startingDate &&
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
